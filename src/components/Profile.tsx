import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { SpotifyStore } from '../stores/SpotifyStore'
import { ReactComponent as LinkIcon } from '../assets/linkIcon.svg'

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
    }, [spotifyStore])

    const profile = spotifyStore.profile

    return (
        <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'>
            <h1 className='text-[2em] font-medium text-white mb-[20px]'>Profile</h1>
            {profile && (
                <div className='flex flex-wrap gap-x-8'>
                    <img className='h-48 md:h-[auto] max-w-[335px] object-contain rounded-[4px]' src={profile.image_url} alt='profile' />
                    <div className='py-[25px]'>
                        <h2 className='text-[1.5em]'>{profile.display_name}</h2>
                        <a className='text-[24px] flex items-center justify-center text-white bg-[#1db954] px-[25px] py-[10px] rounded-[20px] mt-[20px]' href={profile.uri} target='_blank' rel='noreferrer'>
                            Open in spotify
                            <LinkIcon style={{ marginLeft: '6px' }} fill='#fff' width='24px' height='24px' />
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
})

export default Profile
