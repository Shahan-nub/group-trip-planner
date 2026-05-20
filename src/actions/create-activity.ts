"use server";

import { prisma }
from "@/src/lib/prisma";

import {
CreateActivitySchema,
CreateActivityInput
}
from
"@/src/lib/validations/activity";

import {
currentUserDb
}
from
"@/src/lib/current-user";

import {
revalidatePath
}
from
"next/cache";

export async function
createActivity(values : CreateActivityInput){

 const user=
 await currentUserDb();

 if(!user)
 throw new Error(
 "Unauthorized"
 );

 const validated=
 CreateActivitySchema
 .safeParse(
 values
 );

 if(
 !validated.success
 ){
   throw new Error(
   "Invalid fields"
   );
 }

 const {
 tripId,
 title,
 description,
 location,
 startTime,
 endTime
 }=
 validated.data;

 await prisma
 .activity
 .create({

 data:{
    tripId,

    title,

    description,

    location,

    startTime:
    new Date(
      startTime
    ),

    endTime:
    new Date(
      endTime
    ),

    createdById:
    user.id
 }

 });

 revalidatePath(
 `/trip/${tripId}`
 );

}