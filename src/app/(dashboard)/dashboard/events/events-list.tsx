import React from "react";
import { getCurrentUserEvents } from "@/data/events";
import { currentUser } from "@/lib/auth";

import Link from "next/link";

type Props = {};


export default async function EventsList({}: Props) {

  // const user = await currentUser();
  const events = await getCurrentUserEvents();
  return (
    <>
      {events?.length !== 0 ? (
        events?.map(event => (
          <Link href={`/dashboard/events/${event.id}`}>
            <h1>{event.title}</h1>
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <h1>No Events found</h1>
        </div>
      )}
    </>
  );
}
