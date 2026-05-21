export default function TechStack() {
  const stack = [
    ["AI", "Gemini"],

    ["Cache", "Redis"],

    ["DB", "Neon"],

    ["Auth", "Clerk"],
  ];

  return (
    <section
      className="
border-y

border-zinc-800"
    >
      <div
        className="
max-w-6xl

mx-auto

grid

grid-cols-4

py-16"
      >
        {stack.map((item) => (
          <div
            key={item[0]}
            className="
text-center"
          >
            <h2
              className="
text-4xl
font-bold"
            >
              {item[0]}
            </h2>

            <p
              className="
text-zinc-500"
            >
              {item[1]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
