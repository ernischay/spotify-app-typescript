import { ISong } from '../models/ISong'
import { SpotifyStore } from '../stores/SpotifyStore'
import SongItem from './SongItem'

interface SongResultProps {
    songs: ISong[] | null
    spotifyStore: SpotifyStore
}

const SongResult: React.FC<SongResultProps> = ({ songs, spotifyStore }) => {
    if (songs) {
        return (
            <div className='flex flex-wrap'>
                {songs.map((item, index) => {
                    return <SongItem key={index} songItem={item} spotifyStore={spotifyStore} />
                })}
            </div>
        )
    } else {
        return <></>
    }
}

export default SongResult
