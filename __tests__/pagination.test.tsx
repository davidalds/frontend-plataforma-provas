import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Pagination from 'components/Pagination'

describe('<Pagination />', () => {
  beforeAll(() => {
    expect(
      <Pagination
        totalDataElements={100}
        limitPerPage={10}
        totalShowedButtonsInPagination={5}
        offsetFc={jest.fn()}
      />
    ).toMatchSnapshot()
  })

  test('test showed buttons', async () => {
    const { debug } = render(
      <Pagination
        totalDataElements={100}
        limitPerPage={10}
        totalShowedButtonsInPagination={5}
        offsetFc={jest.fn()}
      />
    )

    const buttons = screen.getAllByRole('button', { name: /\d/ })

    expect(buttons).toHaveLength(5)
  })

  test('test disabled buttons', async () => {
    const { debug } = render(
      <Pagination
        totalDataElements={10}
        limitPerPage={10}
        totalShowedButtonsInPagination={1}
        offsetFc={jest.fn()}
      />
    )

    const beginBtn = screen.getByRole('button', { name: /Início/i })
    const endBtn = screen.getByRole('button', { name: /Final/i })
    const prevBtn = screen.getByLabelText('anterior')
    const nextBtn = screen.getByLabelText('próximo')

    expect(beginBtn).toBeDisabled()
    expect(endBtn).toBeDisabled()
    expect(prevBtn).toBeDisabled()
    expect(nextBtn).toBeDisabled()
  })

  test('test ellipsis', async () => {
    const { debug } = render(
      <Pagination
        totalDataElements={30}
        limitPerPage={10}
        totalShowedButtonsInPagination={1}
        offsetFc={jest.fn()}
      />
    )

    expect(screen.getAllByText('...')).toHaveLength(1)

    const nextBtn = screen.getByLabelText('próximo')

    await userEvent.click(nextBtn)

    expect(screen.getAllByText('...')).toHaveLength(2)
  })

  test('test begin and end button', async () => {
    const { debug } = render(
      <Pagination
        totalDataElements={100}
        limitPerPage={10}
        totalShowedButtonsInPagination={5}
        offsetFc={jest.fn()}
      />
    )

    const beginBtn = screen.getByRole('button', { name: /Início/i })
    const endBtn = screen.getByRole('button', { name: /Final/i })

    expect(
      screen.getAllByRole('button', { name: /\d/ }).pop()
    ).toHaveTextContent('5')

    await userEvent.click(endBtn)

    expect(
      screen.getAllByRole('button', { name: /\d/ }).pop()
    ).toHaveTextContent('10')

    await userEvent.click(beginBtn)

    expect(
      screen.getAllByRole('button', { name: /\d/ }).shift()
    ).toHaveTextContent('1')
  })

  test('test number of buttons bigger than available pages', async () => {
    const { debug } = render(
      <Pagination
        totalDataElements={100}
        limitPerPage={10}
        totalShowedButtonsInPagination={12}
        offsetFc={jest.fn()}
      />
    )

    expect(screen.getByRole('group').children).toHaveLength(10)
  })
})
