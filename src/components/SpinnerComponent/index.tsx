import { Spinner, VStack } from '@chakra-ui/react'

const SpinnerComponent = () => {
  return (
    <VStack p={4}>
      <Spinner
        speed="0.65s"
        size={'lg'}
        color="mainBlue.600"
        thickness={'4px'}
      />
    </VStack>
  )
}

export default SpinnerComponent
