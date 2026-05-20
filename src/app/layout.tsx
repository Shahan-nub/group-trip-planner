import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Group trip planner app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}