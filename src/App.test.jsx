// When in doubt check the docs!
// 🚨🚨 https://mswjs.io/docs/ 🚨🚨

import { screen, render } from '@testing-library/react'
import { rest } from 'msw'
import { server } from './setupTests'
// 🚨
// import rest
// import setupServer

import App from './App'
import { user, sasuke } from './fixtures/characterData'

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
  server.use(
    rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) =>
      res(ctx.json([sasuke]))
    )
  )
  render(<App />)

  const profileName = await screen.findByText(sasuke.name)

  expect(profileName).toBeInTheDocument()
})
