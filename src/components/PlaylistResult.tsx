import { IPlaylist } from '../models/IPlaylist'
import { SpotifyStore } from '../stores/SpotifyStore'
import PlaylistItem from './PlaylistItem'

interface PlaylistResultProps {
    playlist: IPlaylist[] | null
    spotifyStore: SpotifyStore
}

const PlaylistResult: React.FC<PlaylistResultProps> = ({ playlist, spotifyStore }) => {
    if (playlist) {
        return (
            <div className='flex flex-wrap'>
                {playlist.map((item, index) => {
                    return <PlaylistItem key={index} playlistItem={item} spotifyStore={spotifyStore} />
                })}
            </div>
        )
    } else {
        return <></>
    }
}

export default PlaylistResult
