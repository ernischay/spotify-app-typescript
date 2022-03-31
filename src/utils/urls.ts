import { CLIENT_ID, scopes } from './config'

export const API_URL = 'https://api.spotify.com/v1'
export const REDIRECT_URL = 'http://localhost:3000/'
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`
