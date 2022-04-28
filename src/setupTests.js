// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import fetch from 'cross-fetch'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { user, sasuke } from './fixtures/characterData'

global.fetch = fetch

// 🚨 Create your server
// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(
  rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) =>
    res(ctx.json([user]))
  )
)
// 🚨 Listen for server start
beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
})

// 🚨 Close server when complete
afterAll(() => server.close())

// 🚨 Use the server to change the response for this test
