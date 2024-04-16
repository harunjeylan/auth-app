export const googleConstants = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/redirect',
  authorizeHost: 'https://accounts.google.com',
  authorizePath: '/o/oauth2/auth',
  tokenHost: 'https://oauth2.googleapis.com',
  tokenPath: '/token',
  profileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  scopes: ['profile', 'email'],
};
