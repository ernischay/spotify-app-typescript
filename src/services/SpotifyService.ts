import { API_URL } from '../utils/urls'
import axios from 'axios'
import { IProfile } from '../models/IProfile'
import { IPlaylist } from '../models/IPlaylist'
import { ISong } from '../models/ISong'
import { IResult } from '../models/IResult'

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

    async getSearchResults(token: string, params: URLSearchParams) {
        try {
            const searchResponse = await spotify.get(`/search?${params}`, {
                headers: { Authorization: `'Bearer ${token}'` },
            })

            let albums: ISong[] = []
            let artists: ISong[] = []
            let tracks: ISong[] = []
            let albumItem: ISong
            let artistItem: ISong
            let trackItem: ISong

            let result: IResult

            if (searchResponse.data.albums) {
                albums = searchResponse.data.albums.items.map((album: { name: string; artists: any; images: any; uri: string }) => {
                    albumItem = {
                        name: album.name,
                        artistName: album.artists[0].name,
                        image_url: album.images[0].url,
                        uri: album.uri,
                    }
                    return albumItem
                })
            }

            if (searchResponse.data.artists) {
                artists = searchResponse.data.artists.items.map((artist: { name: string; genres: any; images: any; uri: string }) => {
                    artistItem = {
                        name: artist.name,
                        artistName: artist.genres[0],
                        image_url: artist.images[0].url,
                        uri: artist.uri,
                    }
                    return artistItem
                })
            }

            if (searchResponse.data.tracks) {
                tracks = searchResponse.data.tracks.items.map((track: { name: string; album: { name: string; images: any; uri: string } }) => {
                    trackItem = {
                        name: track.name,
                        artistName: track.album.name,
                        image_url: track.album.images[0].url,
                        uri: track.album.uri,
                    }
                    return trackItem
                })
            }
            result = { albums, artists, tracks }
            return result
        } catch (e) {
            console.error(e)
        }
    }
}
