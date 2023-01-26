
import axios from 'axios';
import storage from "@/lib/sto";


// const API_URL = 'http://104.248.235.230'
const API_URL = 'https://wpp.treeunfe.com.br'
const TOKEN = "Bd6I4b5mfjBnjpVQ74Y3";
const SECRETKEY = "8v9ESy1Hik5TjT9lOqRGhLmNAWtl";


const headers = {
  // 'Content-Language': 'pt-BR',
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Headers' : 'Content-Type,Authorization,true'
}


export async function postInitialGetToken(form) {
  const data = await axios.post(API_URL+'/api/nw-'+form+'/'+SECRETKEY+'/generate-token', form, {headers}).then((x) => {return x})
  return data.data
}

export async function getCheckSession(form) {
  // http://localhost:21465/api/{session}/check-connection-session
  const sto = storage.getStorage(this, 'authw')
  const config = {
    headers: {
      'Authorization': 'Bearer ' + sto.token,
      'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.get(API_URL+'/api/'+sto.session+'/check-connection-session', config).then((x) => {return x})
  return data.data
}

export async function getStartSession(response) {
  // http://localhost:21465/api/{session}/check-connection-session
  storage.setStorage(this, 'authw', response)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + response.token,
      'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.post(API_URL+'/api/'+response.session+'/start-session', {webhook: 'https://next-chatbot-barbearia.vercel.app/api/hello'}, config).then((x) => {return x})
  return data.data
}
export async function getCloseSession() {
  // http://localhost:21465/api/{session}/check-connection-session
  const sto = storage.getStorage(this, 'authw')
  const config = {
    headers: {
      'Authorization': 'Bearer ' + sto.token,
      'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.post(API_URL+'/api/'+sto.session+'/close-session', {}, config).then((x) => {return x})
  return data.data
}


export async function sendMessage(mgs) {
  // http://localhost:21465/api/{session}/check-connection-session
  // const sto = storage.getStorage(this, 'authw')
  const config = {
    headers: {
      'Authorization': 'Bearer $2b$10$PNTMtbLp5Kqf5mXHUVRT5OcGd_0lDnYVgoQrKXiwTgYgk9hJ7EN9e',
      // 'Content-Language': 'pt-BR'
    }
  };
  const data = await axios.post(API_URL+'/api/nw-barbearia/send-message', {
    "phone": "5544920023965",
    // "phone": "5544998071332",
    "message": mgs,
    "isGroup": false
  }, config).then((x) => {return x})
  return data.data
}
