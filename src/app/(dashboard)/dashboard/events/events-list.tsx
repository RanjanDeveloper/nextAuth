import React from "react";
import { getEventsById } from "@/data/events";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
type Props = {};

export default async function EventsList({}: Props) {

  revalidatePath("/dashboard/events");
  const user = await currentUser();
  const events = await getEventsById(user?.id!);
  return (
    <>
      {events?.length !== 0 ? (
        events?.map(event => (
          <Link  href={`/dashboard/events/${event.id}`}>
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
