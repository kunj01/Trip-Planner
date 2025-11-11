import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaSearch, FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaParking, FaUtensils, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'

function Hotels() {
  const [searchParams, setSearchParams] = useState({
    city: '',
    hotel: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  })

  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      city: 'New York',
      rating: 4.7,
      price: 299,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      description: 'Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Parking'],
      address: '123 Broadway, New York, NY 10001',
      distance: '0.5 miles from city center'
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      city: 'Miami',
      rating: 4.8,
      price: 349,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fHww&w=1000&q=80',
      description: 'Beachfront resort with private balconies and direct access to the pristine Miami beaches.',
      amenities: ['Free WiFi', 'Swimming Pool', 'Beach Access', 'Restaurant', 'Bar', 'Spa'],
      address: '456 Ocean Drive, Miami, FL 33139',
      distance: 'Beachfront'
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      city: 'Denver',
      rating: 4.5,
      price: 199,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhvdGVsfGVufDB8fDB8fHww&w=1000&q=80',
      description: 'Cozy mountain retreat with rustic charm and breathtaking views of the Rocky Mountains.',
      amenities: ['Free WiFi', 'Fireplace', 'Restaurant', 'Hiking Trails', 'Parking'],
      address: '789 Mountain Road, Denver, CO 80202',
      distance: '3 miles from downtown'
    },
    {
      id: 4,
      name: 'Historic Inn',
      city: 'Boston',
      rating: 4.6,
      price: 249,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      description: 'Charming historic inn with elegant rooms and a prime location near Boston Common.',
      amenities: ['Free WiFi', 'Restaurant', 'Bar', 'Concierge', 'Parking'],
      address: '101 Heritage Street, Boston, MA 02108',
      distance: '0.3 miles from Boston Common'
    },
    {
      id: 5,
      name: 'Golden Gate Hotel',
      city: 'San Francisco',
      rating: 4.4,
      price: 279,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww&w=1000&q=80',
      description: 'Modern hotel with panoramic views of the Golden Gate Bridge and San Francisco Bay.',
      amenities: ['Free WiFi', 'Restaurant', 'Fitness Center', 'Rooftop Bar', 'Parking'],
      address: '202 Bay View Road, San Francisco, CA 94123',
      distance: '1.2 miles from Golden Gate Bridge'
    },
    {
      id: 6,
      name: 'Desert Oasis Resort',
      city: 'Phoenix',
      rating: 4.9,
      price: 329,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      description: 'Luxurious desert resort with multiple pools, spa services, and stunning desert landscapes.',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Restaurant', 'Golf Course', 'Parking'],
      address: '303 Desert Road, Phoenix, AZ 85001',
      distance: '5 miles from downtown'
    }
  ])

  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: 500
  })
  const [ratingFilter, setRatingFilter] = useState(0)
  const [amenityFilters, setAmenityFilters] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would fetch hotel data from an API
    console.log('Searching for hotels with params:', searchParams)
  }

  const handleAmenityFilter = (amenity) => {
    setAmenityFilters(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(item => item !== amenity)
      } else {
        return [...prev, amenity]
      }
    })
  }

  const filteredHotels = hotels.filter(hotel => {
    // Apply price filter
    if (hotel.price < priceFilter.min || hotel.price > priceFilter.max) return false
    
    // Apply rating filter
    if (hotel.rating < ratingFilter) return false
    
    // Apply amenity filters
    if (amenityFilters.length > 0) {
      const hotelAmenities = hotel.amenities.map(a => a.toLowerCase())
      const hasAllAmenities = amenityFilters.every(filter => 
        hotelAmenities.some(amenity => amenity.toLowerCase().includes(filter.toLowerCase()))
      )
      if (!hasAllAmenities) return false
    }
    
    // Apply search query filters
    if (searchParams.city && !hotel.city.toLowerCase().includes(searchParams.city.toLowerCase())) return false
    if (searchParams.hotel && !hotel.name.toLowerCase().includes(searchParams.hotel.toLowerCase())) return false
    
    return true
  })

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />)
      }
    }
    return <div className="flex">{stars}</div>
  }

  const amenityIcons = {
    'wifi': <FaWifi />,
    'swimming': <FaSwimmingPool />,
    'parking': <FaParking />,
    'restaurant': <FaUtensils />
  }

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes('wifi')) return amenityIcons.wifi
    if (amenityLower.includes('pool') || amenityLower.includes('swimming')) return amenityIcons.swimming
    if (amenityLower.includes('parking')) return amenityIcons.parking
    if (amenityLower.includes('restaurant')) return amenityIcons.restaurant
    return null
  }

  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-2">Find the Perfect Hotel</h1>
      <p className="text-gray-600 mb-8">Discover comfortable stays for your next adventure</p>
      
      {/* Search Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={searchParams.city}
                onChange={handleInputChange}
                placeholder="Where are you going?"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
              />
            </div>
            
            {/* Hotel Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Hotel Name (Optional)</label>
              <input
                type="text"
                name="hotel"
                value={searchParams.hotel}
                onChange={handleInputChange}
                placeholder="Search by hotel name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
              />
            </div>
            
            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Check-in Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="checkIn"
                  value={searchParams.checkIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Check-out Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="checkOut"
                  value={searchParams.checkOut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Guests */}
            <div>
              <label className="block text-sm font-medium mb-2">Guests</label>
              <div className="relative">
                <input
                  type="number"
                  name="guests"
                  value={searchParams.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
                />
                <FaUserFriends className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Rooms */}
            <div>
              <label className="block text-sm font-medium mb-2">Rooms</label>
              <input
                type="number"
                name="rooms"
                value={searchParams.rooms}
                onChange={handleInputChange}
                min="1"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button type="submit" className="bg-[#f56551] hover:bg-[#e04f3d] px-8">
              <FaSearch className="mr-2" /> Search Hotels
            </Button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price Range (per night)</label>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceFilter.min}</span>
                <span className="text-sm text-gray-600">${priceFilter.max}</span>
              </div>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceFilter.min}
                  onChange={(e) => setPriceFilter(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceFilter.max}
                  onChange={(e) => setPriceFilter(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Minimum Rating</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                  className="w-full mr-4"
                />
                <span className="font-medium">{ratingFilter}</span>
              </div>
            </div>
            
            {/* Amenities Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Amenities</label>
              <div className="space-y-2">
                {['WiFi', 'Swimming Pool', 'Parking', 'Restaurant', 'Spa', 'Fitness Center'].map(amenity => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={amenityFilters.includes(amenity)}
                      onChange={() => handleAmenityFilter(amenity)}
                      className="mr-2"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hotel Listings */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Available Hotels ({filteredHotels.length})</h2>
          {filteredHotels.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredHotels.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{hotel.name}</h3>
                        <div className="flex items-center mb-2">
                          {renderStars(hotel.rating)}
                          <span className="ml-2 text-sm text-gray-600">{hotel.rating}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-1 text-[#f56551]" />
                          <span>{hotel.address}</span>
                        </div>
                        <p className="text-sm text-[#f56551]">{hotel.distance}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm text-gray-600">Price per night</p>
                        <p className="font-bold text-2xl text-[#f56551]">${hotel.price}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity, index) => {
                        const icon = getAmenityIcon(amenity)
                        return (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-full">
                            {icon && <span className="mr-1">{icon}</span>}
                            {amenity}
                          </span>
                        )
                      })}
                      {hotel.amenities.length > 4 && (
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-full">
                          +{hotel.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-[#f56551] hover:bg-[#e04f3d]"
                        onClick={() => window.open('https://www.booking.com', '_blank')}
                      >
                        View Deal
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hotels