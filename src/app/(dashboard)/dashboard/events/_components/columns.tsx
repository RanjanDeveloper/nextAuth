"use client";

import { ColumnDef } from "@tanstack/react-table";
import MoreActions from "./more-actions";
import DataTableColumnHeader from "./data-table-column-header";
import { EventsEnum } from "@/drizzle/schemas/schema";
import { format } from "date-fns";
import Link from "next/link";

export type Events = {
  id: string;
  title: string;
  eventType: EventsEnum;
  dateTime: Date;
  location: string;
};

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
    cell: ({ row }) => {
      const eventId = row.original.id;
      const eventTitle: any = row.getValue("title");
      return (
        <Link  href={`/dashboard/events/${eventId}`}>
        <span className="text-blue-500">{eventTitle}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Event" />;
    },
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      return format(row.getValue("dateTime"), "PPP");
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Location" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MoreActions row={row} />,
  },
];
