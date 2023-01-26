// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {sendMessage} from "@/lib/api";
import axios from "axios";

const API_URL = 'https://wpp.treeunfe.com.br'
export default async function handler(req, res) {

  // sendMessage({msg: JSON.stringify(req.body)})

  // http://localhost:21465/api/{session}/check-connection-session
  // const sto = storage.getStorage(this, 'authw')
  const config = {
    headers: {
      'Authorization': 'Bearer $2b$10$VJWa6KLdCgdP6J8_2HIueuh3ljZSHuUJ3DS2Dp1c5lKOajQIbs2bu',
      // 'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.post(API_URL+'/api/nw-pedro0lexandre/send-message', {
    "phone": "5544920023965",
    // "phone": "5544998071332",
    "message": response.mgs,
    "isGroup": false
  }, config).then((x) => {return x})
  return data.data


  res.status(200).json({ re: 'data.data '})
}
