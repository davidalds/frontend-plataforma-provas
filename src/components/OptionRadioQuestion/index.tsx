import { HStack, Radio, Text } from '@chakra-ui/react'
import { IPropsOptionRadio } from './types/optionRadioQuestion'

const OptionRadio = ({
  option_id,
  option_letter,
  option_title,
  isReadOnly = false,
  checked = false,
  userMarkedOption = false,
}: IPropsOptionRadio) => {
  return (
    <Radio
      colorScheme={'green'}
      size={'lg'}
      value={`${option_id}`}
      isReadOnly={isReadOnly}
      defaultChecked={checked}
    >
      <HStack
        px={1}
        bgColor={
          checked
            ? 'green.500'
            : checked !== userMarkedOption
            ? 'red.500'
            : 'none'
        }
        color={
          checked ? 'white' : checked !== userMarkedOption ? 'white' : 'none'
        }
        rounded={'md'}
      >
        <Text fontWeight={'bold'} mr={1}>
          {option_letter + ')'}
        </Text>
        <Text>{option_title}</Text>
        {userMarkedOption && <Text>- Sua resposta</Text>}
      </HStack>
    </Radio>
  )
}

export default OptionRadio
