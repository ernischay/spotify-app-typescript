import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
    const [play, setPlay] = useState(false)
    const token = 'asdas'

    return (
        <div className='bottom-0 fixed w-full'>
            <SpotifyPlayer token={token} showSaveIcon play={play} uris={[]} />
        </div>
    )
}

export default Footer
