'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './eventcard';

export default function EventList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/api/event');
      setData(response.data);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div className='flex items-center justify-center text-2xl'>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center  ">
      <div className=''>
        {data.map(event => (
          <div key={event.id}>
            <EventCard  event={event}></EventCard>
          </div>
        ))}
      </div>
    </div>
  );
}
