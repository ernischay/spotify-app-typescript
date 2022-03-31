import { API_URL } from '../utils/urls'
import axios from 'axios'
import { IProfile } from '../models/IProfile'
import { IPlaylist } from '../models/IPlaylist'
import { ISong } from '../models/ISong'

const spotify = axios.create({
    baseURL: API_URL,
})

export class SpotifyService {
    getTokenFromUrl = () => {
        return window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial: { [key: string]: any }, item) => {
                let parts = item.split('=')
                initial[parts[0]] = decodeURIComponent(parts[1])
                return initial
            }, {})
    }

    async getUserDetails(token: string) {
        try {
            const response = await spotify.get('/me', {
                headers: { Authorization: `'Bearer ${token}'` },
            })
            const { display_name, images, uri } = response.data
            let profile: IProfile
            profile = { display_name, image_url: images[0].url, uri }
            return profile
        } catch (e) {
            console.error(e)
        }
    }

    async getPlaylistAndSongs(token: string) {
        try {
            const [playlistResponse, songsResponse] = await Promise.all([
                spotify.get('/browse/featured-playlists?limit=6', {
                    headers: { Authorization: `'Bearer ${token}'` },
                }),
                spotify.get('/me/player/recently-played?limit=6', {
                    headers: { Authorization: `'Bearer ${token}'` },
                }),
            ])
            let playlist: IPlaylist[]
            let songs: ISong[]
            let playlistItem: IPlaylist
            let songItem: ISong
            playlist = playlistResponse.data.playlists.items.map((item: { name: string; description: string; images: any; uri: string }) => {
                playlistItem = {
                    name: item.name,
                    description: item.description,
                    image_url: item.images[0].url,
                    uri: item.uri,
                }
                return playlistItem
            })
            songs = songsResponse.data.items.map((item: { track: { album: { name: string; images: any }; artists: any; uri: string } }) => {
                songItem = {
                    name: item.track.album.name,
                    artistName: item.track.artists[0].name,
                    image_url: item.track.album.images[0].url,
                    uri: item.track.uri,
                }
                return songItem
            })
            return { playlist, songs }
        } catch (e) {
            console.error(e)
        }
    }

    // async getInfo() {
    //     const [user, repos] = await Promise.all([github.get('/users/ernischay'), github.get('/users/ernischay/repos')])
    //     return { user: user.data, repos: repos.data }
    // }
}
