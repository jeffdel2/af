import auth0 from 'auth0-js'

const domain     = import.meta.env.VITE_AUTH0_DOMAIN
const clientID   = import.meta.env.VITE_AUTH0_CLIENT_ID
export const CONNECTION = import.meta.env.VITE_AUTH0_CONNECTION

if (!domain || !clientID || !CONNECTION) {
  throw new Error(
    'Missing Auth0 config. Copy web/.env.example to web/.env and fill in your values.'
  )
}

export const webAuth = new auth0.WebAuth({
  domain,
  clientID,
  redirectUri:  `${window.location.origin}/callback`,
  responseType: 'token id_token',
  scope:        'openid profile email',
})
