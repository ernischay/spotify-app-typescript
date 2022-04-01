import { IPlaylist } from '../models/IPlaylist'
import { SpotifyStore } from '../stores/SpotifyStore'

interface PlaylistItemProps {
    playlistItem: IPlaylist
    spotifyStore: SpotifyStore
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlistItem, spotifyStore }) => {
    const handlePlay = () => {
        spotifyStore.setTrackUri(playlistItem.uri)
    }

    return (
        <div onClick={handlePlay} className='cursor-pointer bg-[#202020] max-w-[200px] rounded-[12px] my-[12px] mr-[10px]'>
            <img className='object-contain h-[200px] w-[200px] rounded-tl-[12px] rounded-tr-[12px]' src={playlistItem.image_url} alt='playlist' />
            <div className='font-[500] m-[10px]'>
                <p className='text-sm'>{playlistItem.name}</p>
                <p className='text-gray-400 text-xs mt-[5px] break-words'>{playlistItem.description}</p>
            </div>
        </div>
    )
}

export default PlaylistItem
