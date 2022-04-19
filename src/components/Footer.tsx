import { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { SpotifyStore } from '../stores/SpotifyStore'
import { observer } from 'mobx-react'

interface FooterProps {
    spotifyStore: SpotifyStore
}

const Footer: React.FC<FooterProps> = observer(({ spotifyStore }) => {
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
