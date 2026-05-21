export default function Features() {
  const items = [
    "AI Itinerary",

    "Expense Split",

    "Budget Dashboard",

    "Analytics",

    "Redis Cache",

    "Destination Gallery",
  ];

  return (
    <section
      className="
max-w-7xl

mx-auto

grid

grid-cols-3

gap-8

px-8

pb-24"
    >
      {items.map((item) => (
        <div
          key={item}
          className="
bg-zinc-900

border

border-zinc-800

rounded-3xl

p-8"
        >
          <h3
            className="
text-2xl
font-bold"
          >
            {item}
          </h3>

          <p
            className="
text-zinc-400

mt-3"
          >
            Smart group planning.
          </p>
        </div>
      ))}
    </section>
  );
}
