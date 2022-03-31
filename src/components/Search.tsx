import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { SpotifyStore } from '../stores/SpotifyStore'

interface SearchProps {
    spotifyStore: SpotifyStore
}

const Search: React.FC<SearchProps> = observer(({ spotifyStore }) => {
    const [text, setText] = useState<string>('drake')
    const [option, setOption] = useState<string>('artist,album,track')

    const handleTextChange = (e: React.ChangeEvent<any>) => {
        setText(e.target.value)
        if (e.target.value === '') {
            // dispatch(setSearchResult(null))
            // setOption('artist,album,track')
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
        fetchSearchResults()
    }, [])

    console.log(JSON.stringify(spotifyStore.results))

    return <div className='flex flex-1 md:flex-[0.8] flex-col text-white overflow-y-auto mb-[48px] p-[40px]'></div>
})

export default Search
