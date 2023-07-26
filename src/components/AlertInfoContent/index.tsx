import { Alert, AlertIcon } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const AlertInfoContent = ({ children }: IProps) => {
  return (
    <Alert status={'warning'} variant={'left-accent'}>
      <AlertIcon />
      {children}
    </Alert>
  )
}

export default AlertInfoContent
