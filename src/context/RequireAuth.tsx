import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import useAuth from './useAuth'

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      if (await auth.isAuthenticated()) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        router.replace('/auth/login')
      }
    })()
  }, [router, auth])

  return isAuthenticated ? <>{children}</> : <></>
}

export default RequireAuth
