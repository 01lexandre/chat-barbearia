// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {sendMessage} from "@/lib/api";

export default async function handler(req, res) {

  await sendMessage({msg: JSON.stringify(req.body)})
  res.status(200).json({ re: req.body })
}
