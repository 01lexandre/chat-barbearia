import Redis from "ioredis";

const redis = new Redis("rediss://default:AVNS_2quGsE82rY0rewkjm8t@naweby-db-session-do-user-9743412-0.b.db.ondigitalocean.com:25061");


const API_URL = 'https://wpp.treeunfe.com.br'
export default async function handler(req, res) {

  const data = JSON.parse(req.body)
  let token = null

  console.log(data.session)
  redis.get(data.session, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('aquiii', JSON.parse(result).token); // Prints "value"
      token = JSON.parse(result).token
    }
  });


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

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

  fetch(API_URL+'/api/'+data.session+'/send-message', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  res.status(200).json({ re: req.body})
}
