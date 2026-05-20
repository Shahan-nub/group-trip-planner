import Link from "next/link";

import { UserButton }
from "@clerk/nextjs";

export default function Navbar(){

 return(

<nav className="sticky top-0 backdrop-blur-2xl bg-transparent z-50 border-b border-glass-border">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

<div className="flex gap-8 items-center">

<Link href="/dashboard">

<h1 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

🌍 TripPlanner

</h1>

</Link>

<Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">

Dashboard

</Link>

</div>

<div className="flex items-center gap-6">

<UserButton/>

</div>

</div>

</nav>

);

}