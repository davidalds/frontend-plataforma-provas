import { ReactNode } from 'react'
import AuthContext from './authContext'
import jwtDecode from 'jwt-decode'
import { getSession } from 'next-auth/react'

type tokenType = {
  uuid: string
  username: string
  user_type: number
  exp: number
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = async () => {
    const session = await getSession()
    if (session) {
      const accessToken = decodedToken(session.accessToken)
      if (accessToken.exp * 1000 >= Date.now()) {
        return true
      }
      return false
    }
    return false
  }

  const decodedToken = (token: string): tokenType => {
    const decoded: tokenType = jwtDecode(token)
    return decoded
  }

  const value = {
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
