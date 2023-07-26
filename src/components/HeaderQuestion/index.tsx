import React from 'react'
import { HStack, Text } from '@chakra-ui/react'
import { IPropsQuestionHeader } from './interfaces/questionHeader'
import Timer from 'components/Timer'

const QuestionHeader = ({
  provaTitle,
  timer,
  forceEndProva,
}: IPropsQuestionHeader) => {
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
      {timer && <Timer timer={timer} forceEndProva={forceEndProva} />}
    </HStack>
  )
}

export default React.memo(QuestionHeader)
