import Redis from "ioredis";

const redis = new Redis("rediss://default:AVNS_2quGsE82rY0rewkjm8t@naweby-db-session-do-user-9743412-0.b.db.ondigitalocean.com:25061");

const API_URL = 'https://wpp.treeunfe.com.br'



async function sendMesage(token, session, numero, message) {

  console.log('send ', token, session, message)


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  const raw = JSON.stringify({
    // "phone": "5544920023965",
    "phone": numero.split('@')[0],
    // "phone": "5544998071332",
    "message": JSON.stringify(message),
    "isGroup": false
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  //
  // fetch(API_URL+'/api/'+data.session+'/send-message', requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));


  // const response = await fetch(API_URL+'/api/'+session+'/send-list-message', requestOptions)
  const response = await fetch(API_URL+'/api/'+session+'/send-message', requestOptions)
  const data = await response.json()
  console.log('sendMesage', data)
}


async function sendAlllistMesage(token, session, raw) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  //
  // fetch(API_URL+'/api/'+data.session+'/send-message', requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));


  const response = await fetch(API_URL+'/api/'+session+'/send-list-message', requestOptions)
  // const response = await fetch(API_URL+'/api/'+session+'/send-message', requestOptions)
  const data = await response.json()
  console.log('sendMesage', data)
}

export default async function handler(req, res) {

  // const data = JSON.parse(req.body)
  const data = req.body
  let token = null

  console.error('session', data.session)

  await redis.get(data.session, async (err, result) => {
    if (err) {
      console.error('error', err);
    } else {
      console.log('aquiii', result); // Prints "value"
      // token = JSON.parse(result).token
      token = JSON.parse(result)
    }
  });
  console.error('token', token.token)

  let firstWord = data.body.substring(0, data.body.indexOf(" "))





  // redis.set(data.from, {ETAPA: AGENDAMENTO_HORA })


  // if (firstWord === '/bot') {
  //   await sendMesage(token.token, data.session, data.from,'Ola qual seu nome?')
  // }
  await startFluxo(data, token.token)
  res.status(200).json({ re: req.body})
}

const isDEV = true

const INICIO = 'inicio'
const SERVICOS = 'SERVICOS'
const AGENDAMENTO_DIA = 'AGENDAMENTO_DIA'
const AGENDAMENTO_HORA = 'AGENDAMENTO_HORA'
const RECONHECIMENTO = 'RECONHECIMENTO'
const FINALIZAR = 'FINALIZAR'


function diaMes (date) {
  let day = date.getDate();
  if(day < 10) {day = "0"+day;}
  let month = date.getMonth() + 1;
  if(month < 10) {month = "0"+month;}
  const dateFormat = day + "/" + month;
  return dateFormat
}

async function startFluxo (data, token) {
  let dbFluxo = {
    status: INICIO
  }

  await redis.get('NW_'+data.from).then((result) => {
    if (JSON.parse(result) === null ){
      dbFluxo = {
        status: INICIO
      }
    } else {
      dbFluxo = JSON.parse(result)
    }

  });

  console.log('START FLUXO from ===>', data.from, 'status ==> ', dbFluxo)

  let firstWord = data.body.substring(0, data.body.indexOf(" "))

  if (firstWord === '/del') {
    redis.set('NW_'+data.from, JSON.stringify({status: INICIO }))
    await sendMesage(token,
      data.session,
      data.from,
      'Zerado o BOT'
    )
  }
  if (dbFluxo.status === INICIO) {
    if (firstWord === '/bot') {

      await sendMesage(token,
        data.session,
        data.from,
        'Olá! Bem-vindo à *ZAPBarberShop*. Estamos prontos para atender suas necessidades de corte de cabelo e barba, desde cortes clássicos até os mais modernos. Temos uma equipe de barbeiros experientes prontos para fazer você se sentir e parecer incrível. Agende hoje e venha experimentar a qualidade do nosso atendimento e dos nossos serviços.'
      )

      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        "buttonText": "Ver opções",
        "description": "Como posso ajudar você hoje? ",
        "sections": [
          {
            "title": "Serviços",
            "rows": [
              {
                "rowId": "opcao_1",
                "title": (isDEV ? '/bot ' : '')+"Cortar o Cabelo",
              },
              {
                "rowId": "opcao_2",
                "title": (isDEV ? '/bot ' : '')+"Cortar a Barba",
              }
            ]
          }
        ],
        "isGroup": false
      });
      await sendAlllistMesage(token, data.session, raw)
      redis.set('NW_'+data.from, JSON.stringify({status: SERVICOS }))
    }
  } else if (dbFluxo.status === SERVICOS) {
    if (firstWord === '/bot') {
      // 'Ótimo! Temos vários estilos de corte de cabelo disponíveis, desde cortes clássicos até os mais modernos.'
      await sendMesage(token,
        data.session,
        data.from,
        'Ótimo! ' + data.body
      )

      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate()+1);

      const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
      // console.log(tomorrow);

      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        "buttonText": "Ver opções",
        "description": "Veja as opções de dias que tenho disponiveis? ",
        "sections": [
          {
            "title": "Dias",
            "rows": [
              {
                "rowId": "opcao_1",
                "title": (isDEV ? '/bot ' : '')+semana[today.getDate()+1] + ' - '+ diaMes(tomorrow),
              },
              {
                "rowId": "opcao_1",
                "title": (isDEV ? '/bot ' : '')+semana[today.getDate()+2] + ' - '+ diaMes(tomorrow.setDate(today.getDate()+2)),
              },
            ]
          }
        ],
        "isGroup": false
      });
      await sendAlllistMesage(token, data.session, raw)

      redis.set('NW_'+data.from, JSON.stringify({status: AGENDAMENTO_DIA, opcao: data.body}))
    }
  }

  console.log('aquiiiiiiiiii', dbFluxo)
}
