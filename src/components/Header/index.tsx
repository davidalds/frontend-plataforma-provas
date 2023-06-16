import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <Flex
      bgColor={'mainBlue.500'}
      p={4}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Heading size={'lg'} color={'white'}>
          <Link href={'/'}>Plataforma Provas</Link>
        </Heading>
      </Box>
      <HStack spacing={3}>
        <HStack bg={'mainBlue.50'} rounded={'md'} p={1}>
          <Avatar size={'sm'} />
          <Text fontSize={'md'} fontWeight={'bold'}>
            Perfil{' '}
            {`${session?.user.user_type === 1 ? 'criador' : 'participante'}`}
          </Text>
        </HStack>
        <Button onClick={() => signOut()}>Sair</Button>
      </HStack>
    </Flex>
  )
}

export default Header
