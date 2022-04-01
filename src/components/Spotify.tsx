import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Profile from './Profile'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Login from './Login'
import { SpotifyStore } from '../stores/SpotifyStore'
import { observer } from 'mobx-react'

interface SpotifyProps {
    spotifyStore: SpotifyStore
}

const Spotify: React.FC<SpotifyProps> = observer(({ spotifyStore }) => {
    return (
        <div className='flex flex-col bg-[#121212] overflow-hidden h-screen md:flex-row'>
            {spotifyStore.token ? (
                <Router>
                    <Sidebar spotifyStore={spotifyStore} />
                    <Routes>
                        <Route path='/' element={<Home spotifyStore={spotifyStore} />} />
                        <Route path='/profile' element={<Profile spotifyStore={spotifyStore} />} />
                        <Route path='/search' element={<Search spotifyStore={spotifyStore} />} />
                    </Routes>
                    <Footer spotifyStore={spotifyStore} />
                </Router>
            ) : (
                <Login />
            )}
        </div>
    )
})

export default Spotify
