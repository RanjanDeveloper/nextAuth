"use client";

import { ColumnDef } from "@tanstack/react-table";
import MoreActions from "./more-actions";
import DataTableColumnHeader from "./data-table-column-header";
import { EventsEnum } from "@/drizzle/schemas/schema";
import { format } from "date-fns";
import Link from "next/link";

export type Event = {
  id: string;
  title: string;
  eventType: EventsEnum;
  dateTime: Date;
  location: string;

};
export type Events = {
  eventsData:Event;
  payersCount:number;
  amount:number;
};

export const columns: ColumnDef<Events>[] = [
  {
    id: "title",
    accessorKey: "eventsData.title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      const eventId = row.original.eventsData.id;
      const eventTitle: any = row.original.eventsData.title;
      return (
        <Link href={`/dashboard/events/${eventId}`}>
          <span className="text-blue-500">{eventTitle}</span>
        </Link>
      );
    },
  },
  {
    id: "eventType",
    accessorKey: "eventsData.eventType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Event" />;
    },
  },
  {
    id: "dateTime",
    accessorKey: "eventsData.dateTime",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return format(row.original.eventsData.dateTime, "PPP");
    },
  },
  {
    id: "location",
    accessorKey: "eventsData.location",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Location" />;
    },
  },
  {
    id: "amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => {
      return row.original.amount ?? 0;
    },
    accessorFn: d => Number(d.amount)
  },
  {
    id: "payers",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Payers" />;
    },
    cell: ({ row }) => {
      return row.original.payersCount;
    },
    accessorFn: d => Number(d.payersCount),
  },
  {
    id: "actions",
    cell: ({ row }) => <MoreActions row={row} />,
  },
];
