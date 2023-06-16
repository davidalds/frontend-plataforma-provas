import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from '@chakra-ui/react'
import { IPropsBaseCard } from './interfaces/baseCard'
import Link from 'next/link'

const BaseCard = ({
  cardTitle,
  children,
  cardButtonLink,
  cardButtonTitle,
}: IPropsBaseCard) => {
  return (
    <Card>
      <CardHeader>
        <Heading size={'md'} color={'mainBlue.700'} textTransform={'uppercase'}>
          {cardTitle}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter>
        {cardButtonLink && cardButtonTitle ? (
          <Button
            as={Link}
            href={cardButtonLink}
            colorScheme={'blue'}
            variant={'outline'}
          >
            {cardButtonTitle}
          </Button>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  )
}

export default BaseCard
