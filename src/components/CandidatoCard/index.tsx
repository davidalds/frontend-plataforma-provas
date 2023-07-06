import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { IPropsCandidatoCard } from './types/canditatoCard'

const UserCard = ({ username, email, action }: IPropsCandidatoCard) => {
  return (
    <HStack
      justifyContent={action ? 'space-between' : 'flex-start'}
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
      {action}
    </HStack>
  )
}

export default UserCard
