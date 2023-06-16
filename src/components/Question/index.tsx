import React from 'react'
import {
  Box,
  VStack,
  Divider,
  RadioGroup,
  Radio,
  Text,
  Badge,
  Spacer,
  HStack,
} from '@chakra-ui/react'
import { IPropsQuestion } from './interfaces/question'
import { useState } from 'react'

const Question = ({
  ind,
  idQuestion,
  title,
  peso,
  options,
  addOption,
}: IPropsQuestion) => {
  const [optionValue, setOptionValue] = useState<string>('0')

  const handleOptionChange = (optionParam: string) => {
    if (optionParam) {
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
            Marque a alternativa correta
          </Text>
        </Box>
        <RadioGroup onChange={handleOptionChange} value={optionValue}>
          <VStack align={'baseline'}>
            {options.map(({ option_id, option_title, option_letter }) => (
              <Radio
                colorScheme={'green'}
                size={'lg'}
                key={option_id}
                value={`${option_id}`}
              >
                <Text fontWeight={'bold'} mr={1} display={'inline-block'}>
                  {option_letter + ')'}
                </Text>
                <Text display={'inline-block'}>{option_title}</Text>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </VStack>
    </>
  )
}

export default Question
