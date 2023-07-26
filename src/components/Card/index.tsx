import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
} from '@chakra-ui/react'
import { IPropsBaseCard } from './interfaces/baseCard'
import Link from 'next/link'

// <Button
//   as={Link}
//   href={cardButtonLink}
//   colorScheme={'blue'}
//   variant={'outline'}
//   leftIcon={cardButtonIcon && <Icon as={cardButtonIcon} />}
// >
//   {cardButtonTitle}
// </Button>

const BaseCard = ({ cardTitle, children, buttons }: IPropsBaseCard) => {
  return (
    <Card>
      <CardHeader>
        <Heading size={'md'} color={'mainBlue.700'} textTransform={'uppercase'}>
          {cardTitle}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter justifyContent={'flex-end'}>{buttons}</CardFooter>
    </Card>
  )
}

export default BaseCard
