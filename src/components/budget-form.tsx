"use client";

import { setBudget }
from "@/src/actions/set-budget";

export default function BudgetForm(
{
 tripId
}:{tripId:string}
){

 async function submit(
 formData:FormData
 ){

 await setBudget(

 tripId,

 Number(
 formData.get(
 "limit"
 ))

 );

 }

 return(

<form
action={submit}

className="
border
p-5
rounded-xl">

<input

type="number"

name="limit"

placeholder=
"Trip Budget"

className="
border
p-2"
/>

<button>

Save

</button>

</form>

);

}