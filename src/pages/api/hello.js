// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {sendMessage} from "@/lib/api";
import axios from "axios";

const API_URL = 'https://wpp.treeunfe.com.br'
export default async function handler(req, res) {

  // await sendMessage({msg: JSON.stringify(req.body)})
  // //
  // const config = {
  //   headers: {
  //     'Authorization': 'Bearer $2b$10$Jza0bjWgnhO_8fi1KmG.B.lhh7xae2LDGUiRHv8XKJkv.o0qBKlNm',
  //     // 'Content-Language': 'pt-BR'
  //   }
  // };
  // const data = await axios.post(API_URL+'/api/nw-alexandre/send-message', {
  //   "phone": "5544920023965",
  //   // "phone": "5544998071332",
  //   "message": JSON.stringify(req.body),
  //   "isGroup": false
  // }, config).then((x) => {return x})


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer $2b$10$Jza0bjWgnhO_8fi1KmG.B.lhh7xae2LDGUiRHv8XKJkv.o0qBKlNm");

  const raw = JSON.stringify({
    "phone": "5544920023965",
    // "phone": "5544998071332",
    "message": JSON.stringify(req.body),
    "isGroup": false
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(API_URL+'/api/nw-alexandre/send-message', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  res.status(200).json({ re: req.body})
}
