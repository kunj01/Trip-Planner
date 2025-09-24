import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path:'/create-trip',
  element: <CreateTrip />
},
{
  path: '/view-trip/:tripId',
  element: <Viewtrip />
},
{
  path: '/my-trips',
  element: <MyTrips />
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Guard against missing env vars to avoid runtime crash/blank screen */}
    {(() => {
      const googleClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
      if (!googleClientId) {
        return (
          <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Configuration required</h2>
            <p style={{ marginTop: 8 }}>Missing environment variables. Create a .env file and set:</p>
            <ul style={{ marginTop: 8, lineHeight: 1.8 }}>
              <li>VITE_GOOGLE_AUTH_CLIENT_ID</li>
              <li>VITE_GOOGLE_GEMINI_AI_API_KEY</li>
              <li>VITE_GOOGLE_PLACE_API_KEY</li>
            </ul>
            <p style={{ marginTop: 8 }}>After setting values, restart the dev server.</p>
          </div>
        );
      }
      return (
        <GoogleOAuthProvider clientId={googleClientId}>
          <Header />
          <Toaster/>
          <RouterProvider router={router}/>
        </GoogleOAuthProvider>
      );
    })()}
  </React.StrictMode>,
)
