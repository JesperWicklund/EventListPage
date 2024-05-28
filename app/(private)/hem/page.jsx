import React from "react";
import Eventlist from "@/app/components/event-list";

function EventPage() {





  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-4xl font-semibold ">Event List:</h1>
      <div className="w-4/5">
        <Eventlist></Eventlist>
      </div>
    </div>
  );
}

export default EventPage;
