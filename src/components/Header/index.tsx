import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const Header = () => {
  return (
    <Flex bgColor={'mainBlue.500'} p={4} justifyContent={'space-between'}>
      <Box>
        <Heading size={'lg'} color={'white'}>
          <Link href={'/'}>Plataforma Provas</Link>
        </Heading>
      </Box>
      <Box>
        <Button onClick={() => signOut()}>Sair</Button>
      </Box>
    </Flex>
  )
}

export default Header
