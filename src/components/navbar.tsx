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
glass
z-50
border-0
shadow-lg">

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
text-2xl
bg-gradient-to-r
from-blue-500
to-cyan-500
bg-clip-text
text-transparent
hover:opacity-80">

🌍 TripPlanner

</h1>

</Link>

<Link
href="/dashboard"
className="
text-foreground
opacity-70
hover:opacity-100
font-medium
text-sm">

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