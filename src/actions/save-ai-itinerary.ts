"use server";

import { prisma } from "@/src/lib/prisma";

import { revalidatePath }
from "next/cache";

type AIActivity = {

 day:number;

 title:string;

 location:string;

 description:string;

};

export async function
saveAIItinerary(

tripId:string,

activities:
AIActivity[]

){

 const trip=
 await prisma.trip
 .findUnique({

 where:{
   id:tripId
 }

 });

 if(!trip)
 throw new Error(
 "Trip not found"
 );

 const startDate=
 new Date(
 trip.startDate
 );

 const activityData=
 activities.map(
 item=>{

 const dayOffset=
 item.day-1;

 const activityDate=
 new Date(
 startDate
 );

 activityDate
 .setDate(

 activityDate
 .getDate()

 +dayOffset

 );

 const endDate=
 new Date(
 activityDate
 );

 endDate
 .setHours(

 activityDate
 .getHours()

 +2

 );

 return{

 tripId,

 title:
 item.title,

 location:
 item.location,

 description:
 item.description,

 startTime:
 activityDate,

 endTime:
 endDate,

 createdById:
 trip.creatorId

 };

 });

 await prisma
 .activity
 .createMany({

 data:
 activityData

 });

 revalidatePath(
 `/trip/${tripId}`
 );

}