import { observer } from 'mobx-react'
import { IResult, ISong } from '../models/ISpotify'
import SongItem from './SongItem'

interface SearchResultProps {
    results: IResult | null
}

const SearchResult: React.FC<SearchResultProps> = observer(({ results }) => {
    let songs: ISong[] = []
    if (!!results) {
        songs.push(...results.albums, ...results.artists, ...results.tracks)
        return (
            <div className='flex flex-wrap my-[20px]'>
                {songs.map((item, index) => {
                    return <SongItem key={index} songItem={item} />
                })}
            </div>
        )
    } else {
        return <></>
    }
})

export default SearchResult
