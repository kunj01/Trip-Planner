import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaSearch, FaStar, FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaUtensils } from 'react-icons/fa'

function Restaurants() {
  const [searchParams, setSearchParams] = useState({
    restaurant: '',
    city: ''
  })

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'The Gourmet Kitchen',
      cuisine: 'Contemporary',
      rating: 4.8,
      priceRange: '$$$',
      address: '123 Culinary Ave, New York, NY',
      phone: '+1 (212) 555-1234',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      description: 'An upscale dining experience with innovative dishes crafted from locally-sourced ingredients.'
    },
    {
      id: 2,
      name: 'Pasta Paradise',
      cuisine: 'Italian',
      rating: 4.5,
      priceRange: '$$',
      address: '456 Noodle St, Chicago, IL',
      phone: '+1 (312) 555-6789',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      description: 'Authentic Italian cuisine featuring homemade pasta and traditional recipes passed down through generations.'
    },
    {
      id: 3,
      name: 'Sushi Sensation',
      cuisine: 'Japanese',
      rating: 4.7,
      priceRange: '$$$',
      address: '789 Ocean Dr, San Francisco, CA',
      phone: '+1 (415) 555-9012',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1c2hpJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      description: 'Premium sushi and Japanese specialties prepared by master chefs using the freshest seafood available.'
    },
    {
      id: 4,
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.3,
      priceRange: '$',
      address: '101 Salsa Lane, Austin, TX',
      phone: '+1 (512) 555-3456',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3MlMjByZXN0YXVyYW50fGVufDB8fDB8fHww&w=1000&q=80',
      description: 'Vibrant Mexican eatery serving authentic tacos, fresh guacamole, and signature margaritas in a festive atmosphere.'
    },
    {
      id: 5,
      name: 'Curry House',
      cuisine: 'Indian',
      rating: 4.6,
      priceRange: '$$',
      address: '202 Spice Road, Seattle, WA',
      phone: '+1 (206) 555-7890',
      image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      description: 'Aromatic Indian cuisine featuring a variety of regional specialties, from creamy curries to tandoori classics.'
    },
    {
      id: 6,
      name: 'Le Petit Bistro',
      cuisine: 'French',
      rating: 4.9,
      priceRange: '$$$$',
      address: '303 Champagne Blvd, New Orleans, LA',
      phone: '+1 (504) 555-0123',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZyZW5jaCUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      description: 'Elegant French dining with exquisite presentation and a carefully curated wine list in a romantic setting.'
    }
  ])

  const [cuisineFilter, setCuisineFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [ratingFilter, setRatingFilter] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // In a real app, this would fetch restaurant data from an API
    console.log('Searching for restaurants with params:', searchParams)
  }

  const cuisines = ['All', 'Contemporary', 'Italian', 'Japanese', 'Mexican', 'Indian', 'French']
  const priceRanges = ['All', '$', '$$', '$$$', '$$$$']

  const filteredRestaurants = restaurants.filter(restaurant => {
    // Apply cuisine filter
    if (cuisineFilter !== 'All' && restaurant.cuisine !== cuisineFilter) return false
    
    // Apply price filter
    if (priceFilter !== 'All' && restaurant.priceRange !== priceFilter) return false
    
    // Apply rating filter
    if (restaurant.rating < ratingFilter) return false
    
    // Apply search query filters
    if (searchParams.restaurant && !restaurant.name.toLowerCase().includes(searchParams.restaurant.toLowerCase())) return false
    if (searchParams.city && !restaurant.address.toLowerCase().includes(searchParams.city.toLowerCase())) return false
    
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

  return (
    <div className="px-4 md:px-10 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-2">Find the Best Restaurants</h1>
      <p className="text-gray-600 mb-8">Discover top-rated dining experiences in your city</p>
      
      {/* Search Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Restaurant Name</label>
              <input
                type="text"
                name="restaurant"
                value={searchParams.restaurant}
                onChange={handleInputChange}
                placeholder="Search by restaurant name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
              />
            </div>
            
            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={searchParams.city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button type="submit" className="bg-[#f56551] hover:bg-[#e04f3d] px-8">
              <FaSearch className="mr-2" /> Search Restaurants
            </Button>
          </div>
        </form>
      </div>
      
      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Cuisine Type</label>
            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551] focus:border-transparent"
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
          
          {/* Rating Filter */}
          <div>
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
        </div>
      </div>
      
      {/* Restaurant Listings */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Restaurants ({filteredRestaurants.length})</h2>
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">{restaurant.cuisine}</span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    {renderStars(restaurant.rating)}
                    <span className="ml-2 text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-[#f56551]" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="mr-2 text-[#f56551]" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2 text-[#f56551]" />
                      <span>{restaurant.priceRange}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-[#f56551] hover:bg-[#e04f3d]"
                      onClick={() => window.open('https://www.opentable.com', '_blank')}
                    >
                      <FaUtensils className="mr-2" /> Reserve a Table
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurants