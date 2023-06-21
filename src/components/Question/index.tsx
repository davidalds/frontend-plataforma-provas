import React from 'react'
import {
  Box,
  VStack,
  Divider,
  RadioGroup,
  Text,
  Badge,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import { IPropsQuestion } from './interfaces/question'
import { useState } from 'react'
import OptionRadio from 'components/OptionRadioQuestion'

const Question = ({
  ind,
  idQuestion,
  title,
  peso,
  options,
  addOption,
  isFeedback = false,
  markedOptionId = 0,
}: IPropsQuestion) => {
  const [optionValue, setOptionValue] = useState<string>('0')

  const handleOptionChange = (optionParam: string) => {
    if (optionParam && addOption) {
      setOptionValue(optionParam)
      const option = {
        option_question_id: idQuestion,
        option_id: parseInt(optionParam),
      }
      addOption(option)
    }
  }

  return (
    <>
      <VStack py={2} align={'baseline'} w={'50em'}>
        <VStack py={2} align={'baseline'} w={'100%'}>
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Badge
              colorScheme={'blue'}
              p={2}
              fontSize={'sm'}
              borderRadius={'md'}
            >
              Questão {ind}
            </Badge>
            <Badge p={2} fontSize={'sm'} borderRadius={'md'}>
              {peso}
            </Badge>
          </HStack>
          <Spacer />
          <Text fontSize={'xl'}>{title}</Text>
        </VStack>
        <Divider />
        <Box py={2}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {isFeedback ? 'Resposta correta' : 'Marque a alternativa correta'}
          </Text>
        </Box>
        {!isFeedback ? (
          <RadioGroup onChange={handleOptionChange} value={optionValue}>
            <VStack align={'baseline'}>
              {options.map(({ option_id, option_title, option_letter }) => (
                <OptionRadio
                  key={option_id}
                  option_id={option_id}
                  option_title={option_title}
                  option_letter={option_letter}
                />
              ))}
            </VStack>
          </RadioGroup>
        ) : (
          <VStack align={'baseline'}>
            {options.map(
              ({ option_id, option_title, option_letter, iscorrect }) => (
                <OptionRadio
                  key={option_id}
                  option_id={option_id}
                  option_title={option_title}
                  option_letter={option_letter}
                  checked={iscorrect}
                  userMarkedOption={markedOptionId === option_id}
                  isReadOnly
                />
              )
            )}
          </VStack>
        )}
      </VStack>
    </>
  )
}

export default Question
