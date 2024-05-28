'use client';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const getEventById = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/event/${eventId}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch event', error);
    throw error;
  }
}

function DetailPage() {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null); 
  const url = usePathname();

  const parts = url.split("/");
  const eventId = parts[parts.length - 1];
  console.log(eventId)

  useEffect(() => {
    const fetchEvent = async () => {
      try { 
        const event = await getEventById(eventId);
        setEvent(event);
      } catch (error) {
        setError('Failed to fetch event details');
      }
    };

    fetchEvent();
  }, [eventId]); 

  if (error) { 
    return <div>{error}</div>; 
  }

  if (!event) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <div>
        <img src={event.imageUrl} alt={event.title} />
      </div>
      
      <p>{event.title}</p>
      {/* Add more event details here as needed */}
    </div>
  );
}

export default DetailPage;
