import { IPlaylist } from '../models/ISpotify'
import PlaylistItem from './PlaylistItem'

interface PlaylistResultProps {
    playlist: IPlaylist[] | null
}

const PlaylistResult: React.FC<PlaylistResultProps> = ({ playlist }) => {
    if (playlist) {
        return (
            <div className='flex flex-wrap'>
                {playlist.map((item, index) => {
                    return <PlaylistItem key={index} playlistItem={item}/>
                })}
            </div>
        )
    } else {
        return <></>
    }
}

export default PlaylistResult
