import { spotifyStore } from './stores/SpotifyStore'
import { useEffect } from 'react'
import Spotify from './components/Spotify'

const App: React.FC = () => {
    useEffect(() => {
        const hash = spotifyStore.getToken()
        window.location.hash = ''
        if (hash.access_token) {
            spotifyStore.setToken(hash.access_token)
        }
    }, [])

    return <Spotify/>
}

export default App
