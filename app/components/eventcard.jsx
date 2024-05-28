import Link from "next/link";
import React from "react";
import * as Unicons from "@iconscout/react-unicons";

export default function EventCard({ event }) {
  const isFull = event.attendees.length === event.seats;

  return (
    <div className="border flex items-center justify-between mb-2 p-2">
      <div className="w-[150px] w- h-[125px] ">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-[150px] w- h-[125px]"
        />
      </div>
      <div className="flex ml-4 justify-between gap-12 p-2">
        <div className="flex flex-col justify-between gap-y-2">
          <div>
            <p>{event.title}</p>
            <div>
              <p>{event.date}</p>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 ml-2">
              <Unicons.UilTicket></Unicons.UilTicket>
              <p>
                {event.attendees.length}/{event.seats}{" "}
              </p>
            </div>
            <div>
              <p>
                {isFull && (
                  <span className=" text-red-800 ml-2">Fullbokat</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div>
            <p>{event.city}</p>
          </div>
          <div>
            <Link
              href={`/hem/${event.id}`}
              className="border px-2 rounded-md hover:bg-slate-800"
            >
              Läs mer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
