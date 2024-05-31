'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './eventcard';

export default function EventList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('date'); // Default sort by date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event');
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const filterUpcomingEvents = (events) => {
    const now = new Date();
    return events.filter(event => new Date(event.date) > now);
  };

  const sortEvents = (events) => {
    return events.sort((a, b) => {
      if (sortCriteria === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortCriteria === 'city') {
        return a.city.localeCompare(b.city);
      }
      return 0;
    });
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div className='flex items-center justify-center text-2xl'>Loading...</div>;
  }

  const upcomingEvents = filterUpcomingEvents(data);
  const sortedEvents = sortEvents(upcomingEvents);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sortera efter:</label>
        <select className='text-black font-semibold' id="sort" value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
          <option value="date">Tidpunkt</option>
          <option value="city">Plats</option>
        </select>
      </div>
      <div>
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className='text-2xl'>Inga kommande evenemang</div>
        )}
      </div>
    </div>
  );
}
