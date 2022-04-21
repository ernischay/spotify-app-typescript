import { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { spotifyStore } from '../stores/SpotifyStore'
import { observer } from 'mobx-react'

const Footer: React.FC = observer(() => {
    const [play, setPlay] = useState(false)

    const trackUri = spotifyStore.trackUri

    useEffect(() => {
        setPlay(true)
    }, [trackUri])

    return (
        <div className='bottom-0 fixed w-full'>
            <SpotifyPlayer
                token={spotifyStore.token || ''}
                showSaveIcon
                callback={(state) => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
            />
        </div>
    )
})

export default Footer
