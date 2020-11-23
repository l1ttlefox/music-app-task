import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useParams} from 'react-router-dom';
import './index.css';
import {Album, Artist, musicService, Track} from "../../services/music.service";
import {millisToMinutesAndSeconds} from "../../utils";

interface Params {
    artistId: string;
}

export const MusicPreview = () => <div className={'track-preview'}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.6464 1.23699C14.8707 1.42699 15 1.70606 15 2.00001V10.6667C15 11.219 14.5523 11.6667 14 11.6667C13.4477 11.6667 13 11.219 13 10.6667V3.18047L7 4.18047V12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12V3.33334C5 2.8445 5.35341 2.42731 5.8356 2.34695L13.8356 1.01361C14.1256 0.965288 14.4221 1.04698 14.6464 1.23699Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11ZM1 12C1 10.3431 2.34315 9 4 9C5.65685 9 7 10.3431 7 12C7 13.6569 5.65685 15 4 15C2.34315 15 1 13.6569 1 12Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 9.66669C11.4477 9.66669 11 10.1144 11 10.6667C11 11.219 11.4477 11.6667 12 11.6667C12.5523 11.6667 13 11.219 13 10.6667C13 10.1144 12.5523 9.66669 12 9.66669ZM9 10.6667C9 9.00983 10.3431 7.66669 12 7.66669C13.6569 7.66669 15 9.00983 15 10.6667C15 12.3235 13.6569 13.6667 12 13.6667C10.3431 13.6667 9 12.3235 9 10.6667Z" fill="white"/>
        </g>
    </svg>
</div>

const AlbumItem = ({ album } : { album: Album }) => {
    return (
        <div className={'album'}>
            <div className={'album-preview'}>
                {album.strAlbumThumb ?
                    <img src={`${album.strAlbumThumb}/preview`} alt='' /> :
                    <MusicPreview />
                }

            </div>
            <div className={'item-name'}>
                {album.strAlbum}
            </div>
            <div className={'item-artist'}>
                {album.strArtist}
            </div>
        </div>
    )
}

const TrackItem = ({ track } : { track: Track }) => {
    return (
        <div className={'track-item'}>
            <MusicPreview />
            <div className={'track-info'}>
                <p className={'item-name'}>
                    {track.strTrack}
                </p>
                <p className={'item-artist'}>
                    {track.strArtist}
                </p>
            </div>
            <div className={'track-actions'}>
                <div>
                    {millisToMinutesAndSeconds(+track.intDuration)}
                </div>
                <div className={'plus-icon'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47711 2 1.99995 6.47715 1.99995 12C1.99995 17.5228 6.47711 22 12 22Z" stroke="#5ABC61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V16" stroke="#5ABC61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.99995 12H16" stroke="#5ABC61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export const ArtistPage = (props: RouteComponentProps) => {
    const {artistId} = useParams<Params>();
    const [artist, setArtist] = useState<Artist>({} as Artist);
    const [albums, setAlbums] = useState<Album[]>([])
    const [tracks, setTracks] = useState<Track[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const artistData = await musicService.getArtist(artistId);
            if (artistData) {
                setArtist(artistData);
                const albumsData = await musicService.getArtistAlbums(artistData.strArtist);
                setAlbums(albumsData);
                if (albumsData.length) {
                    const tracksData = await musicService.getAlbumTracks(albumsData[0].idAlbum);
                    setTracks(tracksData);
                }
            }
        }
        fetchData()
    }, [artistId])

    console.log('albums', albums);

    return (
        <div className={'artist-info'}>
            <div className={'songs-list'}>
                <div>
                    <h3 className={'info-title'}>
                        Most loved tracks
                    </h3>

                </div>
                <div>
                    {tracks.map((track: Track) => (<TrackItem track={track} key={track.idTrack}/>))}
                </div>
            </div>
            <div className={'artist-info_preview'}>
                <h3 className={'info-title'}>{artist.strArtist}</h3>
                <div className={'artist-preview'}>
                    <img src={`${artist.strArtistThumb}/preview`} alt='' />
                </div>
                <div className={'artist-albums'}>
                    <h3 className={'info-title'}>
                        Albums
                    </h3>
                    <div className={'albums_container'}>
                        {!!albums && albums.map((album: Album) => (<AlbumItem album={album} key={album.idAlbum}/>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

