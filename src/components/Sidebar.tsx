import logo from '../assets/logo.png'

import { ReactComponent as HomeIcon } from '../assets/homeIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/profileIcon.svg'
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg'
import { ReactComponent as PlaylistIcon } from '../assets/playlistIcon.svg'
import { ReactComponent as LogoutIcon } from '../assets/logoutIcon.svg'
import { ReactComponent as DownArrowIcon } from '../assets/downArrowIcon.svg'
import { ReactComponent as CrossIcon } from '../assets/crossIcon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { spotifyStore } from '../stores/SpotifyStore'

const Sidebar: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const showSidebar = (width < 768 && isOpen) || width >= 768

    return (
        <div className='flex flex-[0.2] flex-col text-white h-screen bg-[#1db954] text-[24px]'>
            <img className='h-[70px] md:h-[100px] md:p-[10px] mt-[20px] text-[24px] object-contain' src={logo} alt='spotify' />
            {isOpen ? (
                <CrossIcon className='flex mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
            ) : (
                <DownArrowIcon className='flex mr-[25px] mb-[10px] ml-auto md:hidden' fill='#fff' width='24px' height='24px' onClick={() => setIsOpen(!isOpen)} />
            )}
            {showSidebar && (
                <ul className='mt-[10px] md:mt-[60px]'>
                    <li
                        className={
                            location.pathname === '/'
                                ? 'text-[#1db954] bg-[white] flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                                : 'flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                        }
                        onClick={() => navigate('/')}
                    >
                        <HomeIcon fill={location.pathname === '/' ? '#1db954' : '#fff'} width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Home</p>
                    </li>
                    <li
                        className={
                            location.pathname === '/profile'
                                ? 'text-[#1db954] bg-[white] flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                                : 'flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                        }
                        onClick={() => navigate('/profile')}
                    >
                        <ProfileIcon fill={location.pathname === '/profile' ? '#1db954' : '#fff'} width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Profile</p>
                    </li>
                    <li
                        className={
                            location.pathname === '/search'
                                ? 'text-[#1db954] bg-[white] flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                                : 'flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                        }
                        onClick={() => navigate('/search')}
                    >
                        <SearchIcon fill={location.pathname === '/search' ? '#1db954' : '#fff'} width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Search</p>
                    </li>
                    <li
                        className={
                            location.pathname === '/playlist'
                                ? 'text-[#1db954] bg-[white] flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                                : 'flex items-center cursor-pointer px-[25px] py-[10px] rounded-tr-[20px] rounded-br-[20px]'
                        }
                    >
                        <PlaylistIcon fill={location.pathname === '/playlist' ? '#1db954' : '#fff'} width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Featured Playlist</p>
                    </li>
                    <li className='flex items-center cursor-pointer px-[25px] py-[10px] border-tr-[20px] border-br-[20px] md:bottom-[48px] md:absolute' onClick={() => spotifyStore.setToken(null)}>
                        <LogoutIcon fill='#fff' width='24px' height='24px' />
                        <p className='flex ml-[15px] items-center'>Logout</p>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Sidebar
