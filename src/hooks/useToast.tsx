import { useToast } from '@chakra-ui/react'

const useToastHook = () => {
  const toast = useToast({
    position: 'top',
    duration: 4000,
    isClosable: true,
  })

  return toast
}

export { useToastHook }
