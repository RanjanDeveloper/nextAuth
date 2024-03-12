"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {v4 as uuid} from 'uuid';
import { Button } from "@/components/ui/button"

type Props = {};
type sidebarItem = {
  label:string,
  href:string
}
const sidebarItems : sidebarItem[] = [

  {label:'Dashboard',href:'/dashboard'},

]
export default function Sidebar({}: Props) {
  const path = usePathname();
  return (
    <div className="w-[300px] border-r min-h-screen px-3 py-5">
      <ul className="flex flex-col text-md font-medium space-y-2">
        {
          sidebarItems.map((item)=>(
            <li key={uuid()}
          className={cn("px-3 py-1 rounded-md  hover:text-blue-600", {
            "text-blue-600 bg-slate-100": path === item.href,
          })}
        >
          <Link className={cn("hover:text-blue-600 inline-block w-full", { "text-blue-600": path === item.href })} href={item.href}>
            {item.label} 
          </Link>
        </li>
          ))
        }
      </ul>
     
     <Button asChild>
        <Link href="/auth/login">Signin</Link>
      </Button>
     
    </div>
  );
}
