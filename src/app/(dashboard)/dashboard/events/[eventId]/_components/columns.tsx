"use client"

import { ColumnDef } from "@tanstack/react-table"
import MoreActions from "./more-actions";
import DataTableColumnHeader from "./data-table-column-header";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export type Payers = {
  id: string
  name: string 
  city: string
  amount:number
}

export const columns: ColumnDef<Payers>[] = [
  {
    accessorKey: "name",
    header: ({column})=> {
      return(
       <DataTableColumnHeader column={column} title="Name"/>
      )
    } 
  },
  {
    accessorKey: "city",
    header: ({column})=> {
      return(
        <DataTableColumnHeader column={column} title="City"/>
      )
    } 
  },
  {
    accessorKey: "amount",
    header: ({column})=> {
      return(
        <DataTableColumnHeader column={column} title="Amount"/>
      )
    } 
  },
  {
    id:'actions',
    cell:({row}) => <MoreActions row={row}/>,
  
  }
]
