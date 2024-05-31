'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './eventcard';

export default function EventList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('dateAsc'); // Default sort by date ascending
  const [filterCity, setFilterCity] = useState(''); // Default to no city filter
  const [filterMonth, setFilterMonth] = useState(''); // Default to no month filter

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
      if (sortCriteria === 'dateAsc') {
        return new Date(a.date) - new Date(b.date); // Ascending order
      } else if (sortCriteria === 'dateDesc') {
        return new Date(b.date) - new Date(a.date); // Descending order
      } else if (sortCriteria === 'city') {
        return a.city.localeCompare(b.city);
      }
      return 0;
    });
  };

  const filterEventsByCity = (events) => {
    if (!filterCity) return events; // If no filter is set, return all events
    return events.filter(event => event.city.toLowerCase().startsWith(filterCity.toLowerCase()));
  };

  const filterEventsByMonth = (events) => {
    if (!filterMonth) return events; // If no month filter is set, return all events
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === parseInt(filterMonth);
    });
  };

  if (error) {
    return <div className="text-red-600">Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center text-2xl">Loading...</div>;
  }

  const upcomingEvents = filterUpcomingEvents(data);
  const filteredByCity = filterEventsByCity(upcomingEvents);
  const filteredByMonth = filterEventsByMonth(filteredByCity);
  const sortedEvents = sortEvents(filteredByMonth);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="sort" className="block mb-2 font-semibold">Sortera efter:</label>
        <select
          className="text-black block w-full px-4 py-2 mb-4 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="dateAsc">Tidpunkt (närmast)</option>
          <option value="dateDesc">Tidpunkt (längst fram)</option>
          <option value="city">Stad (A-Ö)</option>
        </select>
      </div>
      <div className="mb-4 w-full max-w-md ">
        <label htmlFor="city" className="block mb-2 font-semibold">Filtrera efter stad:</label>
        <input
          type="text"
          id="city"
          className="text-black block w-full px-4 py-2 mb-4 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          placeholder="Skriv stadens namn"
        />
      </div>
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="month" className="block mb-2 font-semibold">Filtrera efter månad:</label>
        <select
          className="text-black block w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Alla månader</option>
          <option value="0">Januari</option>
          <option value="1">Februari</option>
          <option value="2">Mars</option>
          <option value="3">April</option>
          <option value="4">Maj</option>
          <option value="5">Juni</option>
          <option value="6">Juli</option>
          <option value="7">Augusti</option>
          <option value="8">September</option>
          <option value="9">Oktober</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
      <div className="w-full max-w-md">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="text-2xl">Inga kommande evenemang</div>
        )}
      </div>
    </div>
  );
}
