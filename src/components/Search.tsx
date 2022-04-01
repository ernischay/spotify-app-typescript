import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { SpotifyStore } from '../stores/SpotifyStore'
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg'
import { ReactComponent as CrossIcon } from '../assets/crossIcon.svg'
import SearchResult from './SearchResult'

interface SearchProps {
    spotifyStore: SpotifyStore
}

const Search: React.FC<SearchProps> = observer(({ spotifyStore }) => {
    const [text, setText] = useState<string>('')
    const [option, setOption] = useState<string>('artist,album,track')

    const handleTextChange = (e: React.ChangeEvent<any>) => {
        setText(e.target.value)
        if (e.target.value === '') {
            spotifyStore.setSearchResults(null)
            setOption('artist,album,track')
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(`q=${text}&type=${option}&limit=4`)
        const fetchSearchResults = async () => {
            if (spotifyStore.token) {
                const results = await spotifyStore.getSearchResults(spotifyStore.token, params)
                if (typeof results != 'undefined') {
                    spotifyStore.setSearchResults(results)
                }
            }
        }
        if (text.length > 0) {
            fetchSearchResults()
        } else {
            spotifyStore.setSearchResults(null)
        }
    }, [text, option, spotifyStore])

    const handleOption = (e: React.ChangeEvent<any>) => {
        setOption(e.currentTarget.value)
    }

    return (
        <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'>
            <div className='flex flex-row px-[10px] py-[8px] rounded-[20px] bg-[#202020]'>
                <SearchIcon fill='#fff' width='24px' height='24px' />
                <input className='flex flex-1 grow-2 border-0 grow-2 text-[16px] text-white bg-[#202020] ml-[15px] focus:outline-none' type='text' placeholder='Search for artists, music and genres...' onChange={handleTextChange} value={text} />
                {text && (
                    <CrossIcon
                        fill='#fff'
                        width='24px'
                        height='24px'
                        cursor='pointer'
                        onClick={() => {
                            setText('')
                            spotifyStore.setSearchResults(null)
                            setOption('artist,album,track')
                        }}
                    />
                )}
            </div>
            {text && (
                <ul className='flex justify-end mt-[20px] mb-[10px] list-none'>
                    <li className='px-[10px] py-[8px] relative text-center rounded-[20px]' key='artist'>
                        <input className='translate-x-[250%] placeholder:text-white-400 opacity-0 checked:bg-[white] checked:text-[#202020] peer' id='artist' type='radio' checked={option === 'artist'} onChange={handleOption} value='artist' />
                        <label className='rounded-[20px] px-[10px] py-[8px] bg-[#202020] peer-checked:bg-white peer-checked:text-[#202020]' htmlFor='artist'>
                            artist
                        </label>
                    </li>
                    <li className='px-[10px] py-[8px] relative text-center rounded-[20px]' key='album'>
                        <input className='translate-x-[250%] placeholder:text-white-400 opacity-0 checked:bg-[white] checked:text-[#202020] peer' id='album' type='radio' checked={option === 'album'} onChange={handleOption} value='album' />
                        <label className='rounded-[20px] px-[10px] py-[8px] bg-[#202020] peer-checked:bg-white peer-checked:text-[#202020]' htmlFor='album'>
                            album
                        </label>
                    </li>
                    <li className='px-[10px] py-[8px] relative text-center rounded-[20px]' key='track'>
                        <input className='translate-x-[250%] placeholder:text-white-400 opacity-0 checked:bg-[white] checked:text-[#202020] peer' id='track' type='radio' checked={option === 'track'} onChange={handleOption} value='track' />
                        <label className='rounded-[20px] px-[10px] py-[8px] bg-[#202020] peer-checked:bg-white peer-checked:text-[#202020]' htmlFor='track'>
                            track
                        </label>
                    </li>
                </ul>
            )}
            {text && spotifyStore.results && <SearchResult results={spotifyStore.results} spotifyStore={spotifyStore} />}
        </div>
    )
})

export default Search
