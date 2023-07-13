import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwtDecode from 'jwt-decode'
import api from '../../../services'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'Insira seu e-mail',
        },
        password: {
          label: 'Senha',
          type: 'password',
          placeholder: 'Insira sua senha',
        },
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post('login', {
            email: credentials?.email,
            password: credentials?.password,
          })

          if (data) {
            return data.user
          }

          return null
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = jwtDecode(token.accessToken)
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  secret: process.env.SECRETKEY,
}

export default NextAuth(authOptions)
