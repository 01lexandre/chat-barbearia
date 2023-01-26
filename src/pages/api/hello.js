// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {sendMessage} from "@/lib/api";
import axios from "axios";

const API_URL = 'https://wpp.treeunfe.com.br'
export default async function handler(req, res) {

  // // sendMessage({msg: JSON.stringify(req.body)})
  //
  // http://localhost:21465/api/{session}/check-connection-session
  // const sto = storage.getStorage(this, 'authw')
  const config = {
    headers: {
      'Authorization': 'Bearer $2b$10$t2djQWpPRsEHy2JgHxQB.uvZxp2FNaX5Fgj2vcc_twV_GS.nURu3a',
      // 'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.post(API_URL+'/api/nw-alkexandre/send-message', {
    "phone": "5544920023965",
    // "phone": "5544998071332",
    "message": JSON.stringify(req.body),
    "isGroup": false
  }, config).then((x) => {return x})

  res.status(200).json({ re: req.body})
}
