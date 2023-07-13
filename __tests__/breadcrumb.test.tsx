import { screen, render } from '@testing-library/react'
import BreadCrumb from 'components/Breadcrumb'
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'

describe('<Breadcrumb />', () => {
  test('test links amount', async () => {
    const links = [
      {
        path: '/page2',
        pageName: 'Page 2',
      },
      {
        path: '/page3',
        pageName: 'Page 3',
      },
      {
        path: '/page4',
        pageName: 'Page 4',
      },
    ]

    const { debug } = render(<BreadCrumb links={[...links]} />)

    const linksDOM = screen.getAllByRole('link')

    expect(linksDOM).toHaveLength(4)
  })
})
