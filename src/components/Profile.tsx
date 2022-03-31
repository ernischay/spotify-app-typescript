import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { IProfile } from '../models/IProfile'
import { SpotifyStore } from '../stores/SpotifyStore'

interface ProfileProps {
    spotifyStore: SpotifyStore
}

const Profile: React.FC<ProfileProps> = observer(({ spotifyStore }) => {
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (spotifyStore.token) {
                const profile = await spotifyStore.getUserDetails(spotifyStore.token)
                if (typeof profile != 'undefined') {
                    spotifyStore.setProfile(profile)
                }
            }
        }
        fetchUserDetails()
    }, [])

    console.log(JSON.stringify(spotifyStore.profile))

    return <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'></div>
})

export default Profile
