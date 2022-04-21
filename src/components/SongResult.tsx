import { ISong } from '../models/ISpotify'
import SongItem from './SongItem'

interface SongResultProps {
    songs: ISong[] | null
}

const SongResult: React.FC<SongResultProps> = ({ songs }) => {
    if (songs) {
        return (
            <div className='flex flex-wrap'>
                {songs.map((item, index) => {
                    return <SongItem key={index} songItem={item}/>
                })}
            </div>
        )
    } else {
        return <></>
    }
}

export default SongResult
