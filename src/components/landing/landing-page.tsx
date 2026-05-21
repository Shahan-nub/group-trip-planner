import Hero from "./hero";
import Features from "./features";
import TechStack from "./tech-stack";

export default function LandingPage() {
  return (
    <div
      className="
min-h-screen

bg-black

text-white"
    >
      <Hero />

      <Features />

      <TechStack />

      <footer
        className="
py-10

text-center

text-zinc-500"
      >
        Built for modern group travel.
      </footer>
    </div>
  );
}
