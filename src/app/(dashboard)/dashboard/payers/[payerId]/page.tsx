"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPayerDetails } from "@/data/payers";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
type Props = {
  params: {
    payerId: string;
  };
};

type Details = {
    name:string,
    city:string,
    totalAmount:number,
    events:[
        {
            title:string
            amount:string
        }
    ]
}
export default function PayerDetailsPage({ params }: Props) {
  const [details, setDetails] = useState<any>([]);
  const searchParams = useSearchParams();
  const city = searchParams.get("city")?.toLowerCase()!;
  const name = searchParams.get("name")?.toLowerCase()!;
  if (!city || !name) return <FormError message="Something went wrong!" />;
  useEffect(() => {
    const detailss = async () => {
      const data = await getPayerDetails(name, city);
      setDetails(data);
    };
    detailss();
  }, []);
  console.log("data", { details });
  console.log([details.events]);
  return (
    <>
      {details.map((detail: Details, index: number) => (
        <div key={`${index}_${detail.name}`} className="max-w-[500px]">
          <div className="flex space-x-2 justify-between">
            <div className="flex space-x-4 text-md">
              <span >Name</span>
              <span className="font-semibold">{detail.name}</span>
            </div>
            <div className="flex space-x-4 text-md">
              <span >City</span>
              <span className="font-semibold">{detail.city}</span>
            </div>
            <div className="flex space-x-4 text-md">
              <span >Total Amount</span>
              <span className="font-semibold">{detail.totalAmount}</span>
            </div>
          </div>
          <div className="mt-10">
            <div className="rounded-md border">
              <Table>
                <TableCaption className="mb-2">Here's a list of events for which the payer has paid the amount.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.events.map((event, index) => (
                    <TableRow key={`${event.title}_${index}`}>
                      <TableCell>{event.title}</TableCell>
                      <TableCell className="text-right">{event.amount || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
