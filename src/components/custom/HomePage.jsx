import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { FaPlus, FaRobot, FaMapMarkerAlt, FaHotel, FaUtensils, FaPlane } from 'react-icons/fa'

function HomePage() {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      name: 'Paris, France',
      image: '/asset/1.png',
      description: 'Explore the city of lights',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Bali, Indonesia',
      image: '/asset/2.png',
      description: 'Tropical paradise with beautiful beaches',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      image: '/asset/3.png',
      description: 'Experience the blend of tradition and technology',
      rating: 4.9
    },
    {
      id: 4,
      name: 'New York, USA',
      image: '/asset/4.png',
      description: 'The city that never sleeps',
      rating: 4.6
    }
  ]);

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Weekend Getaway',
      image: '/asset/5.png',
      description: '3 days of relaxation',
      price: '$299'
    },
    {
      id: 2,
      name: 'Adventure Week',
      image: '/asset/6.png',
      description: '7 days of thrilling activities',
      price: '$899'
    },
    {
      id: 3,
      name: 'Cultural Experience',
      image: '/asset/7.png',
      description: '5 days immersed in local culture',
      price: '$599'
    }
  ]);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Where to next?</h1>
        <p className="text-lg mb-6">Discover new destinations and create unforgettable memories</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/create-trip">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2">
              <FaPlus /> Start a New Trip
            </Button>
          </Link>
          <Link to="/create-trip">
            <Button variant="outline" className="bg-white/20 border-white text-white hover:bg-white hover:text-blue-600 flex items-center gap-2">
              <FaRobot /> Create Trip with AI
            </Button>
          </Link>
        </div>
      </div>

      {/* Trip Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/discover">
            <div className="bg-orange-100 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer">
              <FaMapMarkerAlt className="text-3xl text-orange-500 mb-3" />
              <h3 className="font-medium">Destinations</h3>
              <p className="text-sm text-gray-600 mt-1">Explore places</p>
            </div>
          </Link>
          <Link to="/hotels">
            <div className="bg-blue-100 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer">
              <FaHotel className="text-3xl text-blue-500 mb-3" />
              <h3 className="font-medium">Hotels</h3>
              <p className="text-sm text-gray-600 mt-1">Find accommodations</p>
            </div>
          </Link>
          <Link to="/restaurants">
            <div className="bg-green-100 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer">
              <FaUtensils className="text-3xl text-green-500 mb-3" />
              <h3 className="font-medium">Restaurants</h3>
              <p className="text-sm text-gray-600 mt-1">Discover dining</p>
            </div>
          </Link>
          <Link to="/flights">
            <div className="bg-purple-100 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer">
              <FaPlane className="text-3xl text-purple-500 mb-3" />
              <h3 className="font-medium">Flights</h3>
              <p className="text-sm text-gray-600 mt-1">Book tickets</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Destinations</h2>
          <Link to="/discover" className="text-[#f56551] hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestions.map(place => (
          <div key={place.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
            <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{place.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    ★ {place.rating}
                  </span>
                  <Button variant="outline" size="sm" className="text-[#f56551] border-[#f56551] hover:bg-[#f56551] hover:text-white">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Packages */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recommended Packages</h2>
          <Link to="/discover" className="text-[#f56551] hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md font-medium">
                    {pkg.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                <Button className="w-full bg-[#f56551] hover:bg-[#e04f3d]">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Trips Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Trips</h2>
          <Link to="/my-trips" className="text-[#f56551] hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trip cards will be dynamically loaded here */}
          <div className="border border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[#f56551] transition-all cursor-pointer">
            <FaPlus className="text-3xl text-gray-400 mb-3" />
            <h3 className="font-medium text-gray-600">Create New Trip</h3>
            <p className="text-sm text-gray-500 mt-2">Start planning your next adventure</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage