import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../img';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 shadow-md bg-white">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Travel Advisor" className="h-8" />
      </Link>
      <div className="flex items-center space-x-8">
        <Link to="/hotels" className="flex items-center text-gray-800 hover:text-blue-600 font-medium">
          <span className="material-icons mr-1">hotel</span>
          Hotels
        </Link>
        <Link to="/restaurants" className="flex items-center text-gray-800 hover:text-blue-600 font-medium">
          <span className="material-icons mr-1">restaurant</span>
          Restaurants
        </Link>
        <Link to="/attractions" className="flex items-center text-gray-800 hover:text-blue-600 font-medium">
          <span className="material-icons mr-1">confirmation_number</span>
          Attractions
        </Link>
        <Link to="/itinerary" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-semibold shadow transition-colors">
          <span className="material-icons mr-1">event_note</span>
          Itinerary Generator
        </Link>
        <Link to="/map" className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 font-semibold transition-colors">
          <span className="material-icons mr-1">map</span>
          Map View
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;