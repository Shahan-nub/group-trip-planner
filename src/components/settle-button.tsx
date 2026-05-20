"use client";

import { markSettled }
from "@/src/actions/mark-settled";
import toast from "react-hot-toast";

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

   toast.success(
    "Settlement recorded"
   );
 }

 return(
   <button
     onClick={handleClick}
     className="glass-sm rounded-xl px-4 py-2 font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition duration-200 transform hover:scale-105\"
   >
      Mark Paid
   </button>
 );
}