export interface Artist {
    idArtist: string;
    strArtist: string;
    strArtistThumb?: string;
}

export interface Album {
    idAlbum: string;
    strAlbum: string;
    strAlbumThumb?: string;
    strArtist: string;
}

export interface Track {
    strTrack: string;
    intDuration: string;
    strArtist: string;
    idTrack: string;
}

interface SearchArtistsResponse {
    artists: Artist[];
}

interface GetArtistAlbumsResponse {
    album: Album[];
}

interface GetAlbumTacksResponse {
    track: Track[];
}

class MusicService {
    private url = "https://www.theaudiodb.com/api/v1/json/1";

    public searchArtists = async (artistName: string) => {
        const response = await fetch(`${this.url}/search.php?s=${artistName}`);
        const {artists}: SearchArtistsResponse = await response.json();
        return artists || [];
    }

    public getArtistAlbums = async (artistName: string) => {
        const response = await fetch(`${this.url}/searchalbum.php?s=${artistName}`);
        const {album}: GetArtistAlbumsResponse = await response.json();
        return album || [];
    }

    public getAlbumTracks = async (albumId: string) => {
        const response = await fetch(`${this.url}/track.php?m=${albumId}`);
        const {track}: GetAlbumTacksResponse = await response.json();
        return track || [];
    }

    public getArtist = async (artistId: string) => {
        const response = await fetch(`${this.url}/artist.php?i=${artistId}`);
        const {artists} = await response.json();
        return artists ? artists[0] : undefined;
    }
}

export const musicService = new MusicService();
