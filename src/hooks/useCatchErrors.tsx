import { isAxiosError } from 'axios'
import { useToastHook } from './useToast'

const useCatchErrors = () => {
  const toast = useToastHook()

  const handleToast = (errorMsg: string) => {
    toast({
      status: 'error',
      title: errorMsg,
    })
  }

  const handleErrors = (error: unknown, noCatchMessageError?: string) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 403) {
        handleToast(error.response.data.errors.msg)
      } else if (error.response?.status === 404) {
        handleToast(error.response.data.errors.msg)
      } else if (error.response?.status === 401) {
        handleToast(error.response.data.errors.msg)
      } else {
        handleToast(
          noCatchMessageError ? noCatchMessageError : 'Ocorreu um erro'
        )
      }
    } else {
      handleToast(noCatchMessageError ? noCatchMessageError : 'Ocorreu um erro')
    }
  }

  return { handleErrors }
}

export default useCatchErrors
