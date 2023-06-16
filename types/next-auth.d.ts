import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    accessToken: string
  }

  interface AdapterUser {
    accessToken: string
  }

  interface Session {
    user: {
      uuid: string
      username: string
      accessToken: string
      user_type: number
    }
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string
  }
}
