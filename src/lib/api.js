
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
  const rota = 'https://chat-barbearia.vercel.app/api/hello'
  const data = await axios.post(API_URL+'/api/'+response.session+'/start-session', {webhook: rota}, config).then((x) => {return x})
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


export async function sendMessage(response) {
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
}
