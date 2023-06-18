import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { AiOutlineMinus } from 'react-icons/ai'
import { IPropsCandidatoCard } from './types/canditatoCard'

const CandidatoCard = ({
  username,
  email,
  deslinkUser,
}: IPropsCandidatoCard) => {
  return (
    <HStack
      justifyContent={'space-between'}
      boxShadow={'lg'}
      p={2}
      rounded={'md'}
    >
      <Flex alignItems={'center'}>
        <Avatar size={'sm'} />
        <Box ml={3}>
          <Text fontWeight={'bold'}>{username}</Text>
          <Text>{email}</Text>
        </Box>
      </Flex>
      <IconButton
        onClick={deslinkUser}
        aria-label="desvincular"
        colorScheme={'orange'}
        size={'sm'}
        icon={<Icon as={AiOutlineMinus} />}
        title="Desvincular"
      />
    </HStack>
  )
}

export default CandidatoCard
