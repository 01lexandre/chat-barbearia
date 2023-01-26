import Redis from "ioredis";

const redis = new Redis("rediss://default:AVNS_2quGsE82rY0rewkjm8t@naweby-db-session-do-user-9743412-0.b.db.ondigitalocean.com:25061");



export default async function handler(req, res) {
  console.log('salvo', JSON.parse(req.body).session)
  // console.log(redis)
  redis.set(JSON.parse(req.body).session, req.body);
  // //
  // //
  // redis.get("mykey", (err, result) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(result); // Prints "value"
  //   }
  // });
  res.status(200).json(true)
}
