// When in doubt check the docs!
// 🚨🚨 https://mswjs.io/docs/ 🚨🚨

import { screen, render } from '@testing-library/react'
// 🚨
// import rest
// import setupServer
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import App from './App'

const user = {
  id: 1,
  created_at: '2021-12-13T00:17:29+00:00',
  // 🚨 Add a name here
  name: 'Vonta',
  avatar: 'https://thumbs.gfycat.com/NiceRequiredGrunion-size_restricted.gif',
  header: 'https://static.wikia.nocookie.net/naruto/images/5/50/Team_Kakashi.png',
  likes: ['React', 'Anime', 'Traveling', 'Living', 'Tower Defense Games', 'Card Games'],
  motto: 'Res Non Verba',
  color: 'crimson',
}

// 🚨 Create your server
const server = setupServer(
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

test('Should render the header', async () => {
  render(<App />)
  const banner = screen.getByRole('banner')
  const headerImg = screen.getByAltText(/alchemy/i)
  const profileName = await screen.findByText(user.name)

  expect(banner).toHaveStyle({
    background: 'var(--grey)',
  })
  expect(headerImg).toBeInTheDocument()
  expect(profileName).toBeInTheDocument()
})

test('Should render the header with Sasuke 🌬️🔥', async () => {
  const sasuke = {
    id: 1,
    created_at: '2021-12-13T00:17:29+00:00',
    name: 'Sasuke 🌬️🔥',
    avatar: 'https://thumbs.gfycat.com/NiceRequiredGrunion-size_restricted.gif',
    header: 'https://static.wikia.nocookie.net/naruto/images/5/50/Team_Kakashi.png',
    likes: ['React', 'Anime', 'Traveling', 'Living', 'Tower Defense Games', 'Card Games'],
    motto: 'Res Non Verba',
    color: 'crimson',
  }

  // 🚨 Use the server to change the response for this test
  server.use(
    rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) =>
      res(ctx.json([sasuke]))
    )
  )
  render(<App />)

  const profileName = await screen.findByText(sasuke.name)

  expect(profileName).toBeInTheDocument()
})
