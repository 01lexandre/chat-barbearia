import Head from 'next/head'
import Image from 'next/image'
import {Box, Button, Flex, Input, useToast} from "@chakra-ui/react";
import {getCheckSession, getCloseSession, getStartSession, postInitialGetToken} from "@/lib/api";
import {useEffect, useState} from "react";
import storage from "@/lib/sto";
import Status from "@/components/Status";

export default function Home() {

  const toast = useToast()
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
        const response = await postInitialGetToken(value);
        console.log(JSON.stringify(response))
        const requestOptions = {
          method: 'POST',
          headers: {},
          body: JSON.stringify(response),
          redirect: 'follow'
        };
        fetch('/api/db', requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));


        await startConecct(response)

      } catch(error) {
        // Consider implementing your own error handling logic here
        console.error(error);
      }
  }

  const exitWPP = async () => {
    try {
      const response = await getCloseSession();

      const responseSession = await getCheckSession();
      if (responseSession.status) {
        setIsConnect(responseSession.status)
      } else {
        setIsConnect(false)
        await storage.setStorage(this, 'authw', {})
      }
      console.log(response)
      toast({
        title: `!${response.message}`,
        status: 'success',
        isClosable: true,
      })
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  useEffect(() => {
    const token = storage.getStorage(this, 'authw')
    console.log(token)
    if (token?.session) {
      async function fetchData() {
        // You can await here
        const response = await getCheckSession();
        console.log(response)
        if (response.status) {
          setIsConnect(response.status)

        } else {
          setIsConnect(false)
          await storage.setStorage(this, 'authw', {})
        }

        // ...
      }
      fetchData();
    } else {
      setIsConnect(false)
    }





  }, [])

  return (
    <>
      <Head>
        <title>Chat Barbearia</title>
      </Head>
      <Flex w={'100%'} h={'100vh'}  justifyContent={'center'} alignItems={'center'}>
        {isConnect ? (
          <Flex justifyContent={'center'} maxW={500} flexDirection={"column"} textAlign={'center'}>
            <Status status={isConnect } />

            <Button mt={5} mb={5} onClick={exitWPP}>Desativar</Button>
          </Flex>
        ) : (
          <Flex justifyContent={'center'} maxW={500} flexDirection={"column"} textAlign={'center'}>
            <Status status={isConnect } />
            <Box as={'small'} color={'white'}>Informe um slug para iniciar</Box>
            <Input placeholder='Seu nome' value={value} color={'white'}
                   onChange={e => { setValue(e.currentTarget.value); }}/>
            <Button mt={5} mb={5} onClick={initWPP}>Ativar</Button>
            {qrcode && (
              <Image  src={qrcode}
                      alt={'QRCODE'}
                      width={350}
                      height={350}
                      priority
              />
            )}
          </Flex>
        )}
      </Flex>
    </>
  )

}
