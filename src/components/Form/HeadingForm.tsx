import { Heading } from '@chakra-ui/react'
import { IPropsHeadingForm } from './interfaces'

const HeadingForm = ({ size = 'md', children }: IPropsHeadingForm) => {
  return (
    <Heading size={size} color={'mainBlue.700'}>
      {children}
    </Heading>
  )
}

export default HeadingForm
