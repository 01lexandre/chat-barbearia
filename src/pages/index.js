import Head from 'next/head'
import Image from 'next/image'
import {Box, Button, Input} from "@chakra-ui/react";
import {getCheckSession, getStartSession, postInitialGetToken} from "@/lib/api";
import {useEffect, useState} from "react";
import storage from "@/lib/sto";

export default function Home() {

  const [isConnect, setIsConnect] = useState(false)
  const [value, setValue] = useState('');
  const [qrcode, setQrcode] = useState(null);

  const startConecct = async (response) => {
    try {
      const responseSession = await getStartSession(response);
      console.log(responseSession)
      setQrcode(responseSession.qrcode)

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  const initWPP = async () => {
      try {
        console.log(value)
        const response = await postInitialGetToken(value);
        console.log(response)
        await startConecct(response)

      } catch(error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
  }
  useEffect(() => {
    const token = storage.getStorage(this, 'authw')
    console.log(token)
    if (token) {
      async function fetchData() {
        // You can await here
        const response = await getCheckSession();
        console.log(response)
        setIsConnect(response.status)
        // ...
      }
      fetchData();
    } else {
      setIsConnect(false)
    }

  }, [])

  if (isConnect) {
    return <Box>Conectado</Box>
  } else {
    return (
      <>
        <Head>
          <title>Chat Barbearia</title>
        </Head>
        <Input placeholder='Seu nome' value={value}
               onChange={e => { setValue(e.currentTarget.value); }}/>
        <Button onClick={initWPP}>Ativar</Button>
        {qrcode && (
          <Image src={qrcode}
                 alt={'QRCODE'}
                 width={350}
                 height={350}
                 priority
          />
        )}
      </>
    )
  }

}
