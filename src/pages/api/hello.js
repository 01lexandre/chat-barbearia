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
    // "message": JSON.stringify(message),
    "buttonText": "CLIQUE AQUI",
    "description": "Hello World",
    "sections": [
      {
        "title": "Section 1",
        "rows": [
          {
            "rowId": "my_custom_id",
            "title": "Test 1",
            "description": "Description 1"
          },
          {
            "rowId": "2",
            "title": "Test 2",
            "description": "Description 2"
          }
        ]
      }
    ],
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



  // B


  if (firstWord === '/bot') {
    await sendMesage(token.token, data.session, data.from,'Ola qual seu nome?')
  }

  res.status(200).json({ re: req.body})
}
