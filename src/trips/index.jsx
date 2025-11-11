import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaPlus, FaShare, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Trips() {
  const [trips, setTrips] = useState({
    completed: [],
    ongoing: [],
    bucketlist: []
  })

  // Simulate fetching trips from an API or database
  useEffect(() => {
    // In a real app, this would be an API call
    const mockTrips = {
      completed: [
        {
          id: 'c1',
          title: 'Paris Adventure',
          destination: 'Paris, France',
          startDate: '2023-05-10',
          endDate: '2023-05-17',
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame'],
          rating: 4.8
        },
        {
          id: 'c2',
          title: 'Tokyo Exploration',
          destination: 'Tokyo, Japan',
          startDate: '2023-02-15',
          endDate: '2023-02-25',
          image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          highlights: ['Shibuya Crossing', 'Tokyo Tower', 'Senso-ji Temple'],
          rating: 4.9
        }
      ],
      ongoing: [
        {
          id: 'o1',
          title: 'New York City Trip',
          destination: 'New York, USA',
          startDate: '2023-08-01',
          endDate: '2023-08-10',
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
          progress: 60,
          upcomingActivity: 'Visit Central Park'
        }
      ],
      bucketlist: [
        {
          id: 'b1',
          title: 'Santorini Getaway',
          destination: 'Santorini, Greece',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pfGVufDB8fDB8fHww&w=1000&q=80',
          notes: 'Visit the white buildings and blue domes'
        },
        {
          id: 'b2',
          title: 'Safari Adventure',
          destination: 'Serengeti, Tanzania',
          image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FmYXJpfGVufDB8fDB8fHww&w=1000&q=80',
          notes: 'See the Big Five animals'
        },
        {
          id: 'b3',
          title: 'Northern Lights',
          destination: 'Tromsø, Norway',
          image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm9ydGhlcm4lMjBsaWdodHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          notes: 'Best time to visit is between September and March'
        }
      ]
    }
    
    setTrips(mockTrips)
  }, [])

  const handleShareTrip = (tripId) => {
    // In a real app, this would generate a shareable link
    console.log(`Sharing trip ${tripId}`)
    alert(`Trip shared! (In a real app, this would generate a shareable link)`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Trips</h1>
          <p className="text-gray-600">Manage and explore your travel experiences</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/create-trip">
            <Button className="bg-[#f56551] hover:bg-[#e04f3d]">
              <FaPlus className="mr-2" /> Create New Trip
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="completed" className="text-base">
            Completed ({trips.completed.length})
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="text-base">
            Ongoing ({trips.ongoing.length})
          </TabsTrigger>
          <TabsTrigger value="bucketlist" className="text-base">
            Bucketlist ({trips.bucketlist.length})
          </TabsTrigger>
        </TabsList>
        
        {/* Completed Trips */}
        <TabsContent value="completed">
          {trips.completed.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">You don't have any completed trips yet.</p>
              <p className="text-gray-500">Once you complete a trip, it will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.completed.map(trip => (
                <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <button 
                      onClick={() => handleShareTrip(trip.id)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                      title="Share trip"
                    >
                      <FaShare className="text-[#f56551]" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{trip.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-1 text-[#f56551]" />
                      <span>{trip.destination}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <FaCalendarAlt className="mr-1 text-[#f56551]" />
                      <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {trip.highlights.map((highlight, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-400 font-bold mr-1">{trip.rating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(trip.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <Link to={`/view-trip/${trip.id}`}>
                        <Button variant="outline" className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Ongoing Trips */}
        <TabsContent value="ongoing">
          {trips.ongoing.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">You don't have any ongoing trips.</p>
              <p className="text-gray-500">When you start a trip, it will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.ongoing.map(trip => (
                <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Progress</span>
                        <span className="text-white font-medium">{trip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                        <div 
                          className="bg-[#f56551] h-2 rounded-full" 
                          style={{ width: `${trip.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{trip.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-1 text-[#f56551]" />
                      <span>{trip.destination}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <FaCalendarAlt className="mr-1 text-[#f56551]" />
                      <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Up Next:</p>
                      <p className="text-sm text-gray-600">{trip.upcomingActivity}</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link to={`/view-trip/${trip.id}`}>
                        <Button className="bg-[#f56551] hover:bg-[#e04f3d]">
                          Continue Trip
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Bucketlist Trips */}
        <TabsContent value="bucketlist">
          {trips.bucketlist.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Your bucketlist is empty.</p>
              <p className="text-gray-500">Add destinations you'd like to visit in the future.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.bucketlist.map(trip => (
                <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{trip.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FaMapMarkerAlt className="mr-1 text-[#f56551]" />
                      <span>{trip.destination}</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{trip.notes}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        className="border-[#f56551] text-[#f56551] hover:bg-[#f56551] hover:text-white"
                        onClick={() => console.log(`Planning trip to ${trip.destination}`)}
                      >
                        Plan This Trip
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => console.log(`Removing ${trip.id} from bucketlist`)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Trips