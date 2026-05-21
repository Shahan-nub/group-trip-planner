import { redis } from "@/src/lib/redis";

export async function getDestinationImages(destination: string) {
  const cacheKey = `destination:${destination}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return cached as string[];
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=8&query=${encodeURIComponent(destination + " travel")}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    },
  );

  const data = await res.json();

  const images = data.results.map((img: any) => img.urls.regular);

  await redis.set(
    cacheKey,

    images,

    {
      ex: 60 * 60 * 24 * 7,
    },
  );

  return images;
}
