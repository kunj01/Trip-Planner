import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { app, db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [interests, setInterests] = useState({
    nature: false,
    history: false,
    food: false,
    adventure: false,
    culture: false,
    relaxation: false,
    shopping: false,
    nightlife: false
  });
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [activityLevel, setActivityLevel] = useState([50]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true)
      return;
    }

    // Validate required fields
    if (!formData?.location?.label || !formData?.noOfDays || !formData?.budget || !formData.traveler) {
      toast('Please fill in all required fields: Destination, Number of Days, Budget, and Travel Group');
      return;
    }

    // Validate number of days is a positive number
    if (formData.noOfDays <= 0) {
      toast('Please enter a valid number of days');
      return;
    }

    try {
      setLoading(true);
      
      // Get selected interests
      const selectedInterests = Object.keys(interests).filter(key => interests[key]).join(', ');
      
      // Create enhanced prompt with additional information
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays) + 
        `\n\nAdditional preferences:\n- Interests: ${selectedInterests || 'No specific interests'}\n- Activity level: ${activityLevel[0] < 33 ? 'Relaxed' : activityLevel[0] < 66 ? 'Moderate' : 'Active'}\n- Additional notes: ${additionalNotes || 'None'}`

      console.log('Generating trip plan...');
      
      // Set a timeout for the AI request
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 60000)
      );
      
      // Race between the AI request and timeout
      console.log('Sending prompt:', FINAL_PROMPT);
      
      try {
        const result = await Promise.race([
          chatSession.sendMessage(FINAL_PROMPT),
          timeoutPromise
        ]);

        console.log('Raw AI Response:', result);
        const responseText = await result.response.text();
        console.log('Response Text:', responseText);

        let validJsonContent;
        let parsedJson;

        // First try parsing the response directly as JSON
        try {
          parsedJson = JSON.parse(responseText);
          if (parsedJson.hotel_options && parsedJson.itinerary) {
            console.log('Direct JSON parsing successful');
            validJsonContent = responseText;
          }
        } catch (e) {
          console.log('Direct JSON parsing failed, trying to extract from markdown');
          // Extract JSON content between ```json and ``` markers
          const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
          console.log('JSON Match:', jsonMatch);
          
          if (jsonMatch) {
            const jsonContent = jsonMatch[1].trim();
            console.log('Extracted JSON content:', jsonContent);
            
            try {
              parsedJson = JSON.parse(jsonContent);
              if (parsedJson.hotel_options && parsedJson.itinerary) {
                validJsonContent = jsonContent;
              } else {
                throw new Error('Missing required sections');
              }
            } catch (e) {
              throw new Error('Invalid JSON in markdown: ' + e.message);
            }
          } else {
            throw new Error('No JSON content found in response');
          }
        }

        if (validJsonContent) {
          console.log('Valid JSON found:', parsedJson);
          await SaveAiTrip(validJsonContent);
        } else {
          throw new Error('No valid trip plan data found in response');
        }
      } catch (error) {
        console.error('Invalid JSON response:', error);
        toast.error('Failed to generate trip plan: ' + (error.message || 'Invalid data format'));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error generating trip:', error);
      toast.error(error.message === 'Request timeout' 
        ? 'Request timed out. Please try again.'
        : 'Failed to generate trip plan. Please try again.');
      setLoading(false);
    }
  }

  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error('User not found');
      }

      const docId = Date.now().toString();
      
      // Clean the JSON response and parse it to validate
      const cleanTripData = TripData.replace(/```json\n|\n```/g, '');
      const parsedTripData = JSON.parse(cleanTripData);
      
      // Add a new document in collection "AITrips"
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: {
          ...formData,
          interests: Object.keys(interests).filter(key => interests[key]),
          activityLevel: activityLevel[0],
          additionalNotes
        },
        tripData: parsedTripData,
        userEmail: user?.email,
        id: docId
      });
      
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip plan. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) },
              placeholder: "Enter a destination...",
              isClearable: true,
              className: "w-full",
              styles: {
                control: (provided) => ({
                  ...provided,
                  borderColor: '#e2e8f0',
                  '&:hover': {
                    borderColor: '#cbd5e1'
                  }
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999
                })
              }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.4'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>


        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What are your interests for this trip?</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-5'>
          <div className='flex items-center space-x-2'>
            <Checkbox id="nature" checked={interests.nature} onCheckedChange={(checked) => setInterests({...interests, nature: checked})} />
            <Label htmlFor="nature">Nature & Outdoors</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="history" checked={interests.history} onCheckedChange={(checked) => setInterests({...interests, history: checked})} />
            <Label htmlFor="history">History & Museums</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="food" checked={interests.food} onCheckedChange={(checked) => setInterests({...interests, food: checked})} />
            <Label htmlFor="food">Food & Cuisine</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="adventure" checked={interests.adventure} onCheckedChange={(checked) => setInterests({...interests, adventure: checked})} />
            <Label htmlFor="adventure">Adventure & Sports</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="culture" checked={interests.culture} onCheckedChange={(checked) => setInterests({...interests, culture: checked})} />
            <Label htmlFor="culture">Culture & Arts</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="relaxation" checked={interests.relaxation} onCheckedChange={(checked) => setInterests({...interests, relaxation: checked})} />
            <Label htmlFor="relaxation">Relaxation & Wellness</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="shopping" checked={interests.shopping} onCheckedChange={(checked) => setInterests({...interests, shopping: checked})} />
            <Label htmlFor="shopping">Shopping</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id="nightlife" checked={interests.nightlife} onCheckedChange={(checked) => setInterests({...interests, nightlife: checked})} />
            <Label htmlFor="nightlife">Nightlife & Entertainment</Label>
          </div>
        </div>
      </div>
      
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How active do you want your trip to be?</h2>
        <div className='px-2'>
          <div className='flex justify-between text-sm text-gray-500 mb-2'>
            <span>Relaxed</span>
            <span>Moderate</span>
            <span>Very Active</span>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            value={activityLevel}
            onValueChange={setActivityLevel}
          />
        </div>
      </div>
      
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Any additional notes or preferences?</h2>
        <Textarea 
          placeholder="E.g., dietary restrictions, accessibility needs, specific places you want to visit..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={onGenerateTrip} className="bg-[#f56551] hover:bg-[#e04f3d]">
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate AI Trip Plan'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" width="100px" className='items-center' />
              <h2 className='font-bold text-lg'>Sign In to check out your travel plan</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreateTrip