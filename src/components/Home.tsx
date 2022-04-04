import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { SpotifyStore } from '../stores/SpotifyStore'
import PlaylistResult from './PlaylistResult'
import SongResult from './SongResult'

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
    }, [spotifyStore])

    return (
        <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'>
            <h1 className='text-[48px] font-medium text-[#1db954] mb-[20px]'>Good Evening!</h1>
            <div className='font-[600] my-[20px]'>
                <div className='flex justify-between'>
                    <p>Featured Playlist</p>
                    <a className='text-[#1db954]' href='/#'>
                        See All
                    </a>
                </div>
                <PlaylistResult playlist={spotifyStore.playlist} spotifyStore={spotifyStore} />
            </div>
            <div className='font-[600] my-[20px]'>
                <div className='flex justify-between'>
                    <p>Recently Played</p>
                    <a className='text-[#1db954]' href='/#'>
                        See All
                    </a>
                </div>
                <SongResult songs={spotifyStore.songs} spotifyStore={spotifyStore} />
            </div>
        </div>
    )
})

export default Home
