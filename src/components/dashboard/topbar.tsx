import React from "react";
import UserButton from "@/components/dashboard/user-button";

type Props = {};

export default function Topbar({}: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 border-b bg-white z-20">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="size-6 text-3xl font-bold">@</div>
       <UserButton />
      </div>
    </div>
  );
}
