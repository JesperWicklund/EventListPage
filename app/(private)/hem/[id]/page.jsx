'use client'
import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { usePathname } from "next/navigation";

const getEventById = async (eventId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/event/${eventId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch event", error);
    throw error;
  }
};

const bookEvent = async (eventId, email) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/booking`, {
      email,
      eventId,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to book event", error);
    throw error;
  }
};

function DetailPage() {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false); 
  const { user } = useUser();
  const url = usePathname();
  const parts = url.split("/");
  const eventId = parts[parts.length - 1];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventById(eventId);
        setEvent(event);
        // Check if the user has already booked the event
        setIsBooked(event.attendees.includes(user.primaryEmailAddress.emailAddress));
      } catch (error) {
        setError("Failed to fetch event details");
      }
    };

    fetchEvent();
  }, [eventId, user]);

  const handleBooking = async () => {
    if (event.attendees.length < event.seats && !isBooked) {
      try {
        await bookEvent(eventId, user.primaryEmailAddress.emailAddress);
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendees: [
            ...prevEvent.attendees,
            user.primaryEmailAddress.emailAddress,
          ],
        }));
        setMessage('Gå till "Min Sida"');
        setIsBooked(true); // Set isBooked to true after successful booking
      } catch (error) {
        setMessage("Failed to book event. Please try again.");
      }
    } else if (isBooked) {
      setMessage("You have already booked this event.");
    } else {
      setMessage("The event is full.");
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div className="mt-2 max-w-96 p-4">
        <div className="flex flex-col">
          <div>
            <img className="w-full" src={event?.imageUrl} alt={event?.title} />
          </div>
          <div className="mt-2">
            <div>
              <h1 className="text-4xl font-bold">{event?.title}</h1>
            </div>
            <div>
              <p className="text-2xl">{event?.city}</p>
            </div>
            <div className="py-2">
              <p>
                {event?.date} | {event?.time}
              </p>
            </div>
            <div>
              <p className="">{event?.description}</p>
            </div>
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center gap-4">
                <Unicons.UilTicket />
                <p>
                  {event?.attendees.length} / {event?.seats}
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleBooking}
                  className={`bg-slate-800 p-2 rounded-sm hover:bg-slate-700 ${isBooked ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={isBooked}
                >
                  {isBooked ? "Bokad" : "Boka Nu"}
                </button>
                <p className="text-sm">{isBooked ? 'Gå till min sida för att avboka' : ''}</p>
              </div>
            </div>
            {message && (
              <div className={`mt-4 ${message.startsWith("Failed") ? "text-red-500" : "text-green-500"}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
