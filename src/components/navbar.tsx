import Link from "next/link";

import { UserButton }
from "@clerk/nextjs";

export default function Navbar(){

 return(

<nav
className="
border-b
sticky
top-0
bg-transparent backdrop-blur-2xl
z-50">

<div
className="
max-w-7xl
mx-auto

px-6
py-4

flex

justify-between

items-center">

<div
className="
flex
gap-8
items-center">

<Link
href="/dashboard">

<h1
className="
font-bold
text-xl">

🌍 TripPlanner

</h1>

</Link>

<Link
href="/dashboard">

Dashboard

</Link>

</div>

<div
className="
flex
items-center
gap-4">

<UserButton/>

</div>

</div>

</nav>

);

}