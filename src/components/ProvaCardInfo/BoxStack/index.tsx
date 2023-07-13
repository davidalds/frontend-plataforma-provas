import { Box, Heading } from '@chakra-ui/react'
import { IBoxStack } from './interfaces'

const BoxStack = ({ heading, children }: IBoxStack) => {
  return (
    <Box>
      <Heading size="xs" color={'mainBlue.700'} textTransform={'uppercase'}>
        {heading}
      </Heading>
      <Box pt={2}>{children}</Box>
    </Box>
  )
}

export default BoxStack
