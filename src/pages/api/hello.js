import Redis from "ioredis";
import moment from "moment";
import 'moment/locale/pt-br'
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

async function sendButton(token, session, raw) {

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


  const response = await fetch(API_URL+'/api/'+session+'/send-buttons', requestOptions)
  // const response = await fetch(API_URL+'/api/'+session+'/send-message', requestOptions)
  const data = await response.json()
  console.log('sendMesage', data)
}
async function sendStecker(token, session, raw) {

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


  const response = await fetch(API_URL+'/api/'+session+'/send-sticker', requestOptions)
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


async function getRegis(from) {
  return await redis.get('NW_'+from).then((result) => {
    if (JSON.parse(result) === null ){
      return {
        status: INICIO
      }
    } else {
      return JSON.parse(result)
    }
  });
}

async function startFluxo (data, token) {
  moment.locale('pt-br');
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
        `
          Ol??! Seja bem-vindo ?? ZAPBarberShop. Estamos prontos para atender suas necessidades de corte de cabelo e barba, desde cortes cl??ssicos at?? os mais modernos.
          Temos uma equipe de barbeiros experientes prontos para fazer voc?? se sentir e parecer incr??vel. Agende hoje e venha experimentar a qualidade do nosso atendimento
          e dos nossos servi??os.
        `
      )

      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        "buttonText": "Ver op????es",
        "description": "Com qual tipo de servi??o podemos te ajudar hoje?",
        "sections": [
          {
            "title": "Servi??os",
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
      // '??timo! Temos v??rios estilos de corte de cabelo dispon??veis, desde cortes cl??ssicos at?? os mais modernos.'
      await sendMesage(token,
        data.session,
        data.from,
        'Perfeito! ' + data.body
      )
      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        "message": "Selecione a data que desejar",
        "options": {
          "useTemplateButtons": "true",
          "buttons": [
            {
              "id": "1",
              "text": (isDEV ? '/bot ' : '')+moment().add(1, 'days').format('dddd') + ' - '+ moment().add(1, 'days').format('DD/MM/YYYY')
            },
            {
              "id": "2",
              "text": (isDEV ? '/bot ' : '')+moment().add(2, 'days').format('dddd') + ' - '+ moment().add(2, 'days').format('DD/MM/YYYY')
            },
            {
              "id": "3",
              "text": (isDEV ? '/bot ' : '')+moment().add(3, 'days').format('dddd') + ' - '+ moment().add(3, 'days').format('DD/MM/YYYY')
            },
            {
              "id": "4",
              "text": (isDEV ? '/bot ' : '')+moment().add(4, 'days').format('dddd') + ' - '+ moment().add(4, 'days').format('DD/MM/YYYY')
            },
            {
              "id": "5",
              "text": (isDEV ? '/bot ' : '')+moment().add(5, 'days').format('dddd') + ' - '+ moment().add(5, 'days').format('DD/MM/YYYY')
            },
          ],
          "title": "Para este servi??o n??s temos hor??rios dispon??veis nos seguintes dias",
        },
        "isGroup": false
      });
      await sendButton(token, data.session, raw)

      redis.set('NW_'+data.from, JSON.stringify({status: AGENDAMENTO_DIA, opcao: data.body}))
    }
  } else if (dbFluxo.status === AGENDAMENTO_DIA) {
    const dia = data.body.split(' - ')[1]
    const diaForm = dia.split('/')[2] + '-' + dia.split('/')[1] + '-' + dia.split('/')[0]


    const raw = JSON.stringify({
      "phone": data.from.split('@')[0],
      "buttonText": "Ver op????es",
      "description": "Estes s??o os hor??rios ???? que tenho dispon??vel para "+dia+ ' ' + moment(diaForm).format('dddd').replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()),
      "sections": [
        {
          "title": "Horas",
          "rows": [
            {
              "rowId": "opcao_1",
              "title": (isDEV ? '/bot ' : '')+' 9:00',
            },
            {
              "rowId": "opcao_2",
              "title": (isDEV ? '/bot ' : '')+' 10:00',
            },
            {
              "rowId": "opcao_3",
              "title": (isDEV ? '/bot ' : '')+' 11:00',
            },
            {
              "rowId": "opcao_3",
              "title": (isDEV ? '/bot ' : '')+' 14:00',
            },
            {
              "rowId": "opcao_3",
              "title": (isDEV ? '/bot ' : '')+' 15:00',
            },
            {
              "rowId": "opcao_3",
              "title": (isDEV ? '/bot ' : '')+' 16:00',
            },
          ]
        }
      ],
      "isGroup": false
    });
    await sendAlllistMesage(token, data.session, raw)

    const storageRegis = await getRegis(data.from)
    storageRegis.status = AGENDAMENTO_HORA
    storageRegis.dia = data.body

    redis.set('NW_'+data.from, JSON.stringify(storageRegis))
  } else if (dbFluxo.status === AGENDAMENTO_HORA) {

    const storageRegis = await getRegis(data.from)

    await sendMesage(token,
      data.session,
      data.from,
      '*Maravilha* ??????? agora precisamos que voc?? nos informe o seu *NOME COMPLETO* para finalizarmos o agendamento ????'
    )

    storageRegis.status = RECONHECIMENTO
    storageRegis.hora = data.body

    redis.set('NW_'+data.from, JSON.stringify(storageRegis))
  } else if (dbFluxo.status === RECONHECIMENTO) {

    const storageRegis = await getRegis(data.from)

    const raw = JSON.stringify({
      "phone": data.from.split('@')[0],
      "message": " "+ data.body,
      "options": {
        "useTemplateButtons": "true",
        "buttons": [
          {
            "id": "1",
            "text": (isDEV ? '/bot ' : '') + 'Sim'
          },
          {
            "id": "2",
            "text": (isDEV ? '/bot ' : '') + 'N??o'
          },
        ],
        "title": 'Show '+data.body+'. Seu servi??o '+storageRegis.opcao+' est?? marcado para '+ storageRegis.dia +' ??s ' + storageRegis.hora + '. Tudo certo?',
      },
      "isGroup": false
    });
    await sendButton(token, data.session, raw)

    storageRegis.status = FINALIZAR
    storageRegis.nome = data.body

    redis.set('NW_'+data.from, JSON.stringify(storageRegis))
  } else if (dbFluxo.status === FINALIZAR) {

    let storageRegis = await getRegis(data.from)
    if (data.body === (isDEV ? '/bot ' : '') + 'Sim') {

      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        'path': 'https://cdn.nawe.by/images/zabarbershop.png',
        "isGroup": false
      });
      await sendStecker(token, data.session, raw)


      await sendMesage(token,
        data.session,
        data.from,
        'Magn??fico ent??o. Estaremos te aguardando ansiosamente no dia e hor??rio marcado.'
      )
      storageRegis = {status: INICIO}
      redis.set('NW_'+data.from, JSON.stringify(storageRegis))
      //

    } else {
      await sendMesage(token,
        data.session,
        data.from,
        'Tudo certo vamos come??ar novamente.'
      )

      const raw = JSON.stringify({
        "phone": data.from.split('@')[0],
        "buttonText": "Ver op????es",
        "description": "Como posso ajudar voc?? hoje? ",
        "sections": [
          {
            "title": "Servi??os",
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
      storageRegis = {status: SERVICOS}
      redis.set('NW_'+data.from, JSON.stringify(storageRegis))
    }
  }

  console.log('aquiiiiiiiiii', dbFluxo)
}
