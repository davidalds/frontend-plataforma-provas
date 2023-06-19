import { Radio, Text } from '@chakra-ui/react'
import { IPropsOptionRadio } from './types/optionRadioQuestion'

const OptionRadio = ({
  option_id,
  option_letter,
  option_title,
  isReadOnly = false,
  checked = false,
}: IPropsOptionRadio) => {
  return (
    <Radio
      colorScheme={'green'}
      size={'lg'}
      value={`${option_id}`}
      isReadOnly={isReadOnly}
      defaultChecked={checked}
    >
      <Text fontWeight={'bold'} mr={1} display={'inline-block'}>
        {option_letter + ')'}
      </Text>
      <Text display={'inline-block'}>{option_title}</Text>
    </Radio>
  )
}

export default OptionRadio
