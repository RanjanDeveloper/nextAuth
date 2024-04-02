
import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import EventsList from "./events-list";



type Props = {};
export const dynamic = 'force-dynamic'
export const revalidate = 0
export default function EventsPage({}: Props) {
 
  return (
    <div className="space-y-5  ">
    <EventsList />
    <Button size="sm" asChild> 
        <Link href="/dashboard/events/addevent">
          <Plus className="size-4 mr-2" />Add Event
        </Link>
    </Button>
    </div>
  );
}
