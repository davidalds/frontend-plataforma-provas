import { rest } from 'msw'

const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200))
  }),
]

export default handlers
