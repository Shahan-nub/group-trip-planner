"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateItinerary(
  destination: string,

  days: number,

  budget: number,

  tripType: string,
) {
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
