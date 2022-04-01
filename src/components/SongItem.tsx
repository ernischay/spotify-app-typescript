import { ISong } from '../models/ISong'
import { SpotifyStore } from '../stores/SpotifyStore'

interface SongItemProps {
    songItem: ISong
    spotifyStore: SpotifyStore
}

const SongItem: React.FC<SongItemProps> = ({ songItem, spotifyStore }) => {
    const handlePlay = () => {
        spotifyStore.setTrackUri(songItem.uri)
    }

    return (
        <div onClick={handlePlay} className='cursor-pointer bg-[#202020] max-w-[200px] rounded-[12px] my-[12px] mr-[10px]'>
            <img className='object-contain h-[200px] w-[200px] rounded-tl-[12px] rounded-tr-[12px]' src={songItem.image_url} alt='playlist' />
            <div className='font-[500] m-[10px]'>
                <p className='text-sm'>{songItem.name}</p>
                <p className='text-gray-400 text-xs mt-[5px] break-words'>{songItem.artistName}</p>
            </div>
        </div>
    )
}

export default SongItem
