import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from 'pages/auth/login'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'
import server from '../mocks/server'

jest.mock('next/router', () => require('next-router-mock'))

// Testar logar sem informar dados aos campos

describe('<LoginPage />', () => {
  afterAll(() => {
    expect(render(<LoginPage />)).toMatchSnapshot()
  })

  beforeEach(() => {
    render(<LoginPage />)
  })

  test('login without pass data to the form', async () => {
    const btnLogin = screen.getByRole('button', { name: /Entrar/i })
    expect(btnLogin).toBeInTheDocument()

    // ACT
    await userEvent.click(btnLogin)

    const emailInput = screen.getByLabelText('E-mail:')
    const passwordInput = screen.getByLabelText('Senha:')

    expect(emailInput).toHaveAttribute('aria-invalid')
    expect(passwordInput).toHaveAttribute('aria-invalid')

    const messageErrors = screen.getAllByText('Campo obrigatório')

    expect(messageErrors).toHaveLength(2)
  })

  test('test login inputs', async () => {
    const btnLogin = screen.getByRole('button', { name: /Entrar/i })
    expect(btnLogin).toBeInTheDocument()

    const emailInput = screen.getByLabelText('E-mail:')
    const passwordInput = screen.getByLabelText('Senha:')

    fireEvent.change(emailInput, { target: { value: 'user@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass1234' } })

    expect(emailInput).toHaveValue('user@gmail.com')
    expect(passwordInput).toHaveValue('pass1234')
  })
})
