"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableColumnHeader from "./data-table-column-header";
import { EventsEnum } from "@/drizzle/schemas/schema";
import { format } from "date-fns";
import Link from "next/link";

export type Payers = {
  id: string;
  name: string;
  location: string;
  events: [];
  amount:number;

};
// export type Events = {
//   eventsData:Event;
//   payersCount:number;
//   amount:number;
// };

export const columns: ColumnDef<Payers>[] = [
  {
  
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    // cell: ({ row }) => {
    //   const payerId = row.original.id;
    //   const name: any = row.original.name;
    //   return (
    //     <Link  href={`/dashboard/payers/${payerId}`}>
    //     <span className="text-blue-500">{name}</span>
    //     </Link>
    //   );
    // },
  },
  {
    
    accessorKey: "events",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Events" />;
    },
    cell:({row})=>{
      return row.original.events.length
    }
  },
 
  {
    accessorKey: "location",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Location" />;
    },
  },
  {
    id:"amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />;
    },
    cell:({row}) => {
      return row.original.amount ?? 0;
    },
  },
  

 
];
