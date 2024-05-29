'use client';

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";

const cancelBooking = async (eventId, email) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/avbookning`, {
      data: { email, eventId },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to cancel booking", error);
    throw error;
  }
};

function MyPage() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const attendeeEmail = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event`, {
          params: {
            attendeeEmail: attendeeEmail,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [attendeeEmail]);

  const handleBooking = async (eventId) => {
    if (eventId) {
      try {
        await cancelBooking(eventId, attendeeEmail);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId
              ? { ...event, attendees: event.attendees.filter((email) => email !== attendeeEmail) }
              : event
          )
        );
        setMessage("Booking cancelled successfully");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Failed to cancel booking");
      }
    } return
  };

  const filterEvents = events.filter((event) =>
    event.attendees.includes(attendeeEmail)
  );

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-4xl font-bold">Bokade Event</h1>
      {message && <p className="text-red-500">{message}</p>}
      <div className="flex flex-col gap-4">
        {filterEvents.map((event) => (
          <div className="flex gap-2 border" key={event.id}>
            <div>
              <div className="w-48 h-36">
                <img className="w-48 h-36" src={event.imageUrl} alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-between p-2">
              <p>{event.title}</p>
              <p>{event.city}</p>
              <p>
                {event.date} | {event.time}
              </p>
            </div>
            <div className="flex-grow flex items-end mb-2 gap-x-2">
              <Unicons.UilTicket />
              <p>
                {event.attendees.length} / {event.seats}
              </p>
            </div>
            <div className="flex-grow flex items-end justify-end px-4 py-2">
              <button
                className="bg-slate-800 p-2 rounded-sm hover:bg-slate-700"
                onClick={() => handleBooking(event.id, true)}
              >
                Avboka
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPage;
