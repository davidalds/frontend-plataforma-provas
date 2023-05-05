import { createContext } from 'react'

export type authContextType = {
  isAuthenticated: () => Promise<boolean>
}

const AuthContext = createContext<authContextType>(null!)

export default AuthContext
