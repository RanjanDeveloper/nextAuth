
import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import EventsList from "./events-list";
import { getCurrentUserEvents } from "@/data/events";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import AddEvent from "./_components/add-event";



type Props = {};
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default async function EventsPage({}: Props) {
 const events:any = await getCurrentUserEvents();
  return (
    // <div className="space-y-5  ">
    // <EventsList />
    // <Button size="sm" asChild> 
    //     <Link href="/dashboard/events/addevent">
    //       <Plus className="size-4 mr-2" />Add Event
    //     </Link>
    // </Button>
    // </div>
    <>
    <div className="space-y-3">
        <div className="flex justify-end">
        <AddEvent />
        </div>

        <DataTable columns={columns} data={events ?? []} />
      </div>
  </>
  );
}
