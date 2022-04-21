import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Profile from './Profile'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Login from './Login'
import { spotifyStore } from '../stores/SpotifyStore'
import { observer } from 'mobx-react'

const Spotify: React.FC = observer(() => {
    return (
        <div className='flex flex-col bg-[#121212] overflow-hidden h-screen md:flex-row'>
            {spotifyStore.token ? (
                <Router>
                    <Sidebar/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/profile' element={<Profile/>} />
                        <Route path='/search' element={<Search/>} />
                    </Routes>
                    <Footer/>
                </Router>
            ) : (
                <Login />
            )}
        </div>
    )
})

export default Spotify
