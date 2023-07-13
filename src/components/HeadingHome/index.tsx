import { HStack, Heading } from '@chakra-ui/react'
import { IPropsHeadingHome } from './types'

const HeadingHome = ({ headingText, children }: IPropsHeadingHome) => {
  return (
    <HStack p={4} w={'100%'} spacing={'auto'}>
      <Heading size={'lg'} color={'mainBlue.600'} fontWeight={'medium'}>
        {headingText}
      </Heading>
      {children}
    </HStack>
  )
}

export default HeadingHome
