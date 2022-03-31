import { SpotifyStore } from './stores/SpotifyStore'
import { useEffect } from 'react'
import { SpotifyService } from './services/SpotifyService'
import Spotify from './components/Spotify'

const spotifyService = new SpotifyService()

const spotifyStore = new SpotifyStore(spotifyService)

const App: React.FC = () => {
    useEffect(() => {
        const hash = spotifyStore.getToken()
        window.location.hash = ''
        if (hash.access_token) {
            spotifyStore.setToken(hash.access_token)
        }
    }, [])

    return <Spotify spotifyStore={spotifyStore} />
}

export default App
