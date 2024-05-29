'use client'


import { useUser } from "@clerk/nextjs";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyPage() {

 const [events, setEvents] = useState([]);
 const { user } = useUser()
 const attendeeEmail = user?.primaryEmailAddress?.emailAddress || ''
 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event`, {
          params: {
            attendeeEmail: attendeeEmail
          }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [attendeeEmail]);

  const filterEvents = events.filter(event => event.attendees.includes(attendeeEmail))

  return (
    <div>
      <h1>Bokade Event</h1>
      <ul>
        {filterEvents.map(event => (
          <li key={event.id}>{event.title} - {event.attendees}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage