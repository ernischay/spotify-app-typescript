import { observer } from 'mobx-react'
import { IResult } from '../models/IResult'
import { SpotifyStore } from '../stores/SpotifyStore'
import SongItem from './SongItem'

interface SearchResultProps {
    results: IResult | null
    spotifyStore: SpotifyStore
}

const SearchResult: React.FC<SearchResultProps> = observer(({ results, spotifyStore }) => {
    if (results) {
        return (
            <div className='flex flex-wrap my-[20px]'>
                {results.albums.map((item, index) => {
                    return <SongItem key={index} songItem={item} spotifyStore={spotifyStore} />
                })}
                {results.artists.map((item, index) => {
                    return <SongItem key={index} songItem={item} spotifyStore={spotifyStore} />
                })}
                {results.tracks.map((item, index) => {
                    return <SongItem key={index} songItem={item} spotifyStore={spotifyStore} />
                })}
            </div>
        )
    } else {
        return <></>
    }
})

export default SearchResult
