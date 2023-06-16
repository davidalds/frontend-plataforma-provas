import { Heading } from '@chakra-ui/react'
import { IPropsHeadingForm } from './interfaces'

const HeadingForm = ({ size = 'md' }: IPropsHeadingForm) => {
  return <Heading size={size} color={'mainBlue.600'}></Heading>
}

export default HeadingForm
