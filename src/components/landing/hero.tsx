import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-32">
      <div
        className="
      absolute
      top-20
      left-1/2
      -translate-x-1/2

      w-[700px]
      h-[700px]

      bg-blue-500/10

      blur-[120px]
      rounded-full
      "
      />

      <div
        className="
      max-w-7xl
      mx-auto
      px-8
      text-center"
      >
        <div
          className="
        inline-flex

        px-4
        py-2

        rounded-full

        border

        border-zinc-800

        bg-zinc-900

        mb-8"
        >
          AI Powered Trip Planning
        </div>

        <h1
          className="
        text-7xl

        font-bold

        leading-tight"
        >
          Plan Trips
          <br />
          Split Expenses
          <br />
          <span
            className="
          text-zinc-500"
          >
            Generate AI Itineraries
          </span>
        </h1>

        <p
          className="
        text-zinc-400

        max-w-3xl

        mx-auto

        mt-8

        text-xl"
        >
          Collaborative travel platform with AI itinerary generation, expense
          settlement, budget tracking, analytics and destination discovery.
        </p>

        <div
          className="
        mt-10

        flex

        justify-center

        gap-5"
        >
          <Link
            href="/dashboard" className="z-50 
            bg-white

            text-black

            px-8

            py-4

            rounded-2xl"
          >
            Start Planning
          </Link>
        </div>
      </div>
    </section>
  );
}
