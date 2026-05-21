import { redis } from "@/src/lib/redis";

export async function getPlaceImage(place: string) {
  const cacheKey = `image:${place}`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("IMAGE CACHE HIT");

    return cached as string;
  }

  console.log("IMAGE CACHE MISS");

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=1&query=${encodeURIComponent(place)}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    const data = await res.json();

    const image = data?.results?.[0]?.urls?.regular ?? null;

    if (image) {
      await redis.set(
        cacheKey,

        image,

        {
          ex: 60 * 60 * 24 * 7,
        },
      );
    }
    console.log("Image fetched successfully")
    return image;
  } catch {
    return null;
  }
}
