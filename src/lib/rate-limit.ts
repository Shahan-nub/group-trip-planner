import { redis }
from "@/src/lib/redis";

export async function
checkRateLimit(

key:string,

limit:number,

windowSec:number

){

const now=
Date.now();

const bucket=
Math.floor(
now/
(windowSec*1000)
);

const redisKey=
`rate:${key}:${bucket}`;

const count=
await redis.incr(
redisKey
);

if(count===1){

await redis.expire(

redisKey,

windowSec

);

}

return{

success:
count<=limit,

remaining:
Math.max(
0,
limit-count
),

count

};

}