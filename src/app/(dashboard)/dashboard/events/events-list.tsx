import React from "react";
import { getEventsById } from "@/data/events";
import { currentUser } from "@/lib/auth";

import Link from "next/link";
import { revalidatePath } from "next/cache";
type Props = {};

const dynamic = 'force-dynamic'
export default async function EventsList({}: Props) {
  
  const user = await currentUser();
  const events = await getEventsById(user?.id!);
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
