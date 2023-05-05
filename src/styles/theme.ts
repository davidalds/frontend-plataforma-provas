import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const colors = {
  mainBlue: {
    50: '#d9fdff',
    100: '#adf1ff',
    200: '#7fe7fb',
    300: '#50dcf8',
    400: '#24d2f5',
    500: '#0ab9db',
    600: '#0090ab',
    700: '#00677c',
    800: '#003f4c',
    900: '#00171c',
  },
}

const theme = extendTheme({ config, colors })

export default theme
