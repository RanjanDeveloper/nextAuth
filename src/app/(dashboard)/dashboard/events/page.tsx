
import React from "react";

import { getCurrentUserEvents } from "@/data/events";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import AddEvent from "./_components/add-event";



type Props = {};

export default async function EventsPage({}: Props) {
  
 const events:any = await getCurrentUserEvents();
 
  return (
    <div className="space-y-3">
        <div className="flex justify-end">
        <AddEvent />
        </div>

        <DataTable columns={columns} data={events ?? []} />
      </div>
  );
}
