// pages/_app.js
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

import { mode} from "@chakra-ui/theme-tools"


const theme = extendTheme({
  styles: {
    global: (props) => ({
      blockquote: {
        marginBottom: '1.2rem'
      },
      body: {
        bg: mode("linear-gradient(\n" +
          "      to bottom,\n" +
          "      transparent,\n" +
          "      rgb(26, 26, 42)\n" +
          "    )\n" +
          "    rgb(0, 0, 0)", "gray.800")(props),
        // color: mode('#fff', "gray.100")(props)
      },
    }),
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
