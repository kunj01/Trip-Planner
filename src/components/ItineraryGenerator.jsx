import React, { useState } from 'react';

const ItineraryGenerator = () => {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: 'moderate', // default value
    travelGroup: 'solo',
    interests: [],
    activityLevel: 'moderate',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission and AI trip plan generation
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tell us your travel preferences 🏖️ 🌴</h1>
      <p className="text-gray-600 mb-8">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Destination */}
        <div>
          <label className="block text-xl font-semibold mb-2">What is destination of choice?</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter a destination..."
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xl font-semibold mb-2">How many days are you planning your trip?</label>
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleInputChange}
            placeholder="Ex.4"
            className="w-full p-3 border rounded-lg"
            min="1"
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xl font-semibold mb-2">What is Your Budget?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['cheap', 'moderate', 'luxury'].map((budget) => (
              <div
                key={budget}
                onClick={() => handleInputChange({ target: { name: 'budget', value: budget } })}
                className={\`cursor-pointer p-4 border rounded-lg \${
                  formData.budget === budget ? 'border-blue-500 bg-blue-50' : ''
                }\`}
              >
                <div className="flex items-center justify-center mb-2">
                  {budget === 'cheap' && <span className="text-2xl">💰</span>}
                  {budget === 'moderate' && <span className="text-2xl">💵</span>}
                  {budget === 'luxury' && <span className="text-2xl">💎</span>}
                </div>
                <h3 className="text-center capitalize font-semibold">{budget}</h3>
                <p className="text-center text-sm text-gray-500">
                  {budget === 'cheap' && 'Stay conscious of costs'}
                  {budget === 'moderate' && 'Keep cost on the average side'}
                  {budget === 'luxury' && "Don't worry about cost"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Group */}
        <div>
          <label className="block text-xl font-semibold mb-2">Who do you plan on traveling with on your next adventure?</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 'solo', label: 'Just Me', icon: '✈️', desc: 'A sole traveler in exploration' },
              { id: 'couple', label: 'A Couple', icon: '🥂', desc: 'Two travelers in tandem' },
              { id: 'family', label: 'Family', icon: '🏠', desc: 'A group of fun loving adventurers' },
              { id: 'friends', label: 'Friends', icon: '⛵', desc: 'A bunch of thrill-seekers' }
            ].map((group) => (
              <div
                key={group.id}
                onClick={() => handleInputChange({ target: { name: 'travelGroup', value: group.id } })}
                className={\`cursor-pointer p-4 border rounded-lg \${
                  formData.travelGroup === group.id ? 'border-blue-500 bg-blue-50' : ''
                }\`}
              >
                <div className="text-center mb-2">
                  <span className="text-2xl">{group.icon}</span>
                </div>
                <h3 className="text-center font-semibold">{group.label}</h3>
                <p className="text-center text-sm text-gray-500">{group.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-xl font-semibold mb-2">What are your interests for this trip?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Nature & Outdoors',
              'History & Museums',
              'Food & Cuisine',
              'Adventure & Sports',
              'Culture & Arts',
              'Relaxation & Wellness',
              'Shopping',
              'Nightlife & Entertainment'
            ].map((interest) => (
              <div
                key={interest}
                onClick={() => handleInterestChange(interest)}
                className={\`cursor-pointer p-3 border rounded-lg \${
                  formData.interests.includes(interest) ? 'border-blue-500 bg-blue-50' : ''
                }\`}
              >
                <p className="text-center">{interest}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-xl font-semibold mb-2">How active do you want your trip to be?</label>
          <input
            type="range"
            name="activityLevel"
            min="1"
            max="3"
            step="1"
            value={formData.activityLevel === 'relaxed' ? 1 : formData.activityLevel === 'moderate' ? 2 : 3}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange({
                target: {
                  name: 'activityLevel',
                  value: value === '1' ? 'relaxed' : value === '2' ? 'moderate' : 'very-active'
                }
              });
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Relaxed</span>
            <span>Moderate</span>
            <span>Very Active</span>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-xl font-semibold mb-2">Any additional notes or preferences?</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            placeholder="E.g., dietary restrictions, accessibility needs, specific places you want to visit..."
            className="w-full p-3 border rounded-lg h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Generate AI Trip Plan
        </button>
      </form>
    </div>
  );
};

export default ItineraryGenerator;