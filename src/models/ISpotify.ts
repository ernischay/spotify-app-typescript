export interface IPlaylist {
    name: string
    description: string
    image_url: string
    uri: string
}

export interface IProfile {
    display_name: string
    image_url: string
    uri: string
}

export interface ISong {
    name: string
    artistName: string
    image_url: string
    uri: string
}

export interface IResult {
    albums: ISong[]
    artists: ISong[]
    tracks: ISong[]
}
