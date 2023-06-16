import { SimpleGrid } from '@chakra-ui/react'
import { IPropsWrapInputs } from './interfaces'

const WrapInputs = ({ cols, children }: IPropsWrapInputs) => {
  return (
    <SimpleGrid w={'100%'} columns={cols} spacing={4}>
      {children}
    </SimpleGrid>
  )
}

export default WrapInputs
