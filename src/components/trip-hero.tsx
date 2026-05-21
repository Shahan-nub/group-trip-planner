"use client";

import { useEffect, useState } from "react";

export default function TripHero({
  images,

  title,

  destination,
}: any) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full relative h-96 rounded-3xl overflow-hidden mb-10">
      <img src={images[index]} className=" w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-10 left-10 text-white">
        <h1
          className="
text-5xl
font-bold"
        >
          {title}
        </h1>

        <p
          className="
text-xl"
        >
          📍
          {destination}
        </p>
      </div>
    </div>
  );
}
