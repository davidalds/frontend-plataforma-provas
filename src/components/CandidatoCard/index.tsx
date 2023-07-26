import { Avatar, Badge, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { IPropsCandidatoCard } from './types/canditatoCard'

const UserCard = ({ username, email, action, done }: IPropsCandidatoCard) => {
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
          <HStack>
            <Text fontWeight={'bold'}>{username}</Text>
            {done !== undefined && (
              <Badge colorScheme={done ? 'green' : 'gray'} variant={'outline'}>
                {done ? 'Respondeu' : 'Não respondeu'}
              </Badge>
            )}
          </HStack>
          <Text>{email}</Text>
        </Box>
      </Flex>
      {action}
    </HStack>
  )
}

export default UserCard
