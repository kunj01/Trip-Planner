import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import {
  Home,
  MapView,
  RestaurantsList,
  HotelsList,
  AttractionsList,
  SearchResult,
  ItineraryPage
} from './pages';

const App = () => {
  return (
    <Router>
      <div className="bg-[#f5f5f5]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/hotels" element={<HotelsList />} />
          <Route path="/attractions" element={<AttractionsList />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;