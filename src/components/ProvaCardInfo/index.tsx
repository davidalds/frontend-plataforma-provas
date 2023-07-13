import { Box, Stack, StackDivider } from '@chakra-ui/react'
import BaseCard from 'components/Card'
import { IProvaCardInfo } from './interfaces'

const ProvaCardInfo = ({ cardTitle, children, button }: IProvaCardInfo) => {
  return (
    <BaseCard cardTitle={cardTitle}>
      <Stack divider={<StackDivider />} spacing={2}>
        {children}
      </Stack>
      {button ? <Box mt={4}>{button}</Box> : <></>}
    </BaseCard>
  )
}

export default ProvaCardInfo
