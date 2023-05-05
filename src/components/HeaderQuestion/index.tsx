import { HStack, Text } from '@chakra-ui/react'
import { IPropsQuestionHeader } from './interfaces/questionHeader'

const QuestionHeader = ({ provaTitle }: IPropsQuestionHeader) => {
  return (
    <HStack
      bgColor={'mainBlue.100'}
      justifyContent={'space-between'}
      p={4}
      w={'100%'}
      mb={2}
    >
      <Text fontSize={'lg'} fontWeight={'bold'} color={'mainBlue.700'}>
        {provaTitle}
      </Text>
      <Text>Tempo de prova</Text>
    </HStack>
  )
}

export default QuestionHeader
