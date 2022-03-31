import { makeAutoObservable } from 'mobx'
import { IPlaylist } from '../models/IPlaylist'
import { IProfile } from '../models/IProfile'
import { IResult } from '../models/IResult'
import { ISong } from '../models/ISong'
import { SpotifyService } from '../services/SpotifyService'

export class SpotifyStore {
    token: string | null = null
    profile: IProfile | null = null
    playlist: IPlaylist[] | null = null
    songs: ISong[] | null = null
    results: IResult | null = null

    constructor(private readonly spotifyService: SpotifyService) {
        makeAutoObservable(this)
    }

    getToken() {
        return this.spotifyService.getTokenFromUrl()
    }

    setToken(token: string) {
        this.token = token
    }

    getUserDetails(token: string) {
        return this.spotifyService.getUserDetails(token)
    }

    setProfile(profile: IProfile) {
        this.profile = profile
    }

    getPlaylistAndSongs(token: string) {
        return this.spotifyService.getPlaylistAndSongs(token)
    }

    setPlaylistAndSongs(playlist: IPlaylist[], songs: ISong[]) {
        this.playlist = playlist
        this.songs = songs
    }

    getSearchResults(token: string, params: URLSearchParams) {
        return this.spotifyService.getSearchResults(token, params)
    }

    setSearchResults(results: IResult) {
        this.results = results
    }
}
