import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { BiExit } from 'react-icons/bi'
import Logo from '../../../assets/logo.png'
import Image from 'next/image'

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
        <Link href={'/'}>
          <Image
            src={Logo}
            alt="Logo Plataforma Provas"
            width={200}
            height={200}
          />
        </Link>
      </Box>
      <HStack spacing={3}>
        <HStack bg={'mainBlue.50'} rounded={'md'} p={1}>
          <Avatar size={'sm'} />
          <Text fontSize={'md'} fontWeight={'bold'}>
            Perfil{' '}
            {`${session?.user.user_type === 1 ? 'criador' : 'participante'}`}
          </Text>
        </HStack>
        <IconButton
          bg={'mainBlue.50'}
          aria-label="logout"
          icon={<Icon as={BiExit} />}
          onClick={() => signOut()}
          title="Logout"
        />
      </HStack>
    </Flex>
  )
}

export default Header
