import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { IPropsFormInput } from './interfaces'

const WrapFormInput = ({
  label,
  errors,
  isReadOnly = false,
  children,
}: IPropsFormInput) => {
  return (
    <FormControl isInvalid={!!errors} isReadOnly={isReadOnly}>
      {label ? (
        <FormLabel color={'mainBlue.600'} fontWeight={'bold'}>
          {label}
        </FormLabel>
      ) : (
        <></>
      )}
      {children}
      {errors ? <FormErrorMessage>{errors.message}</FormErrorMessage> : <></>}
    </FormControl>
  )
}

export default WrapFormInput
