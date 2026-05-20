"use client";

import { markSettled }
from "@/src/actions/mark-settled";

type Props = {
  tripId: string;

  senderId: string;

  receiverId: string;

  amount: number;
};

export default function
SettleButton(
{
 tripId,
 senderId,
 receiverId,
 amount
}:Props){

 async function handleClick(){

   await markSettled({
      tripId,
      senderId,
      receiverId,
      amount
   });

   alert(
    "Settlement recorded"
   );
 }

 return(
   <button
   onClick={handleClick}

   className="
   bg-green-600
   text-white
   px-4
   py-2
   rounded"
   >
      Mark Paid
   </button>
 );
}