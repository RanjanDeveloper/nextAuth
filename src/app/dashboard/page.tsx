
import React from "react";
import { Suspense } from "react";
import Userdetails from "../../components/dashboard/Userdetails";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      {/* <Buttons /> */}
      <h1>Nohjdhfgjfg</h1>
 
      <Suspense fallback={'Loading....'}>
         <Userdetails />
      </Suspense>
     
    
    </div>
  );
}
