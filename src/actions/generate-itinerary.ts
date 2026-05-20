"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";

import { checkRateLimit } from "@/src/lib/rate-limit";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateItinerary(
  destination: string,

  days: number,

  budget: number,

  tripType: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const allowed = await checkRateLimit(
    userId,

    5, // max requests

    60, // per minute
  );

  if (!allowed.success) {
    throw new Error("Rate limit exceeded. Try later.");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `

Generate a
${days}
day trip plan for

${destination}

Budget:

₹${budget}

Trip type:

${tripType}

Return ONLY valid JSON:

[
{
"day":1,

"title":"",

"location":"",

"description":""
}
]

No markdown.

`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return JSON.parse(text);
}
