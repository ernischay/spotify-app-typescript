import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { SpotifyStore } from '../stores/SpotifyStore'

interface HomeProps {
    spotifyStore: SpotifyStore
}

const Home: React.FC<HomeProps> = observer(({ spotifyStore }) => {
    useEffect(() => {
        const fetchPlaylistAndSongs = async () => {
            if (spotifyStore.token) {
                const response = await spotifyStore.getPlaylistAndSongs(spotifyStore.token)
                if (typeof response != 'undefined') {
                    spotifyStore.setPlaylistAndSongs(response.playlist, response.songs)
                }
            }
        }
        fetchPlaylistAndSongs()
    }, [])

    console.log(JSON.stringify(spotifyStore.playlist))
    console.log(JSON.stringify(spotifyStore.songs))

    return (
        <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'>
            <h1 className='text-[48px] font-medium text-[#1db954] mb-[20px]'>Good Evening!</h1>
        </div>
    )
})

export default Home
