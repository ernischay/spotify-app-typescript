import { makeAutoObservable } from 'mobx'
import { IPlaylist, IProfile, IResult, ISong } from '../models/ISpotify'
import { getTokenFromUrl, getUserDetails, getPlaylistAndSongs, getSearchResults } from '../services/SpotifyService'

class SpotifyStore {
    token: string | null = null
    profile: IProfile | null = null
    playlist: IPlaylist[] | null = null
    songs: ISong[] | null = null
    results: IResult | null = null
    trackUri: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    getToken() {
        return getTokenFromUrl()
    }

    setToken(token: string | null) {
        this.token = token
    }

    getUserDetails(token: string) {
        return getUserDetails(token)
    }

    setProfile(profile: IProfile) {
        this.profile = profile
    }

    getPlaylistAndSongs(token: string) {
        return getPlaylistAndSongs(token)
    }

    setPlaylistAndSongs(playlist: IPlaylist[], songs: ISong[]) {
        this.playlist = playlist
        this.songs = songs
    }

    getSearchResults(token: string, params: URLSearchParams) {
        return getSearchResults(token, params)
    }

    setSearchResults(results: IResult | null) {
        this.results = results
    }

    setTrackUri(uri: string) {
        this.trackUri = uri
    }
}

export const spotifyStore = new SpotifyStore()