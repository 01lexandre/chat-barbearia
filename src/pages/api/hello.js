// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {sendMessage} from "@/lib/api";

export default function handler(req, res) {
  sendMessage()
  res.status(200).json({ re: req.body })
}
