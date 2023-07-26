import Header from './Header'
import { IProps } from './Header/interfaces/layout'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

const Layout = ({ title, hiddenHeader, children }: IProps) => {
  return (
    <>
      <Head>
        <title>
          {title ? 'Plataforma Provas - ' + title : 'Plataforma Provas'}
        </title>
        <meta
          name="description"
          content="Uma plataforma que permite a criação e aplicação de provas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!hiddenHeader && <Header />}
      <Box minH={'100vh'}>{children}</Box>
    </>
  )
}

export default Layout
