import React from "react";
import {Artist, musicService} from "../services/music.service";
import {RouteComponentProps, Link} from "react-router-dom";
import AsyncSelect from "react-select/async";
import {components} from 'react-select';
import {OptionTypeBase} from "react-select/src/types";

import {MusicPreview} from "../pages/ArtistPage";

import {SideMenuItem, sideMenuItems} from "./constants";
import Music from '../assets/mobile/MUSIC.png';
import NewPlaylist from '../assets/new_playlist.png';
import Settings from '../assets/settings.png';
import Bell from '../assets/bell.png';

import "./container.css";


interface Props extends RouteComponentProps {
    children: React.Component;
}


const DropdownIndicator = (
    props: any
) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.886 17.2541 14.5978 16.0413 15.8565C16.0071 15.8828 15.9742 15.9116 15.9429 15.9429C15.9116 15.9742 15.8827 16.0071 15.8564 16.0413C14.5977 17.2542 12.886 18 11 18C7.13401 18 4 14.866 4 11ZM16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0977 20.6834 22.0977 20.2929 21.7071L16.6177 18.0319Z"
                      fill="#8B8E97"/>
            </svg>
        </components.DropdownIndicator>
    );
};


const customSearchStyles = {
    container: (provided: any) => ({
        ...provided,
        background: '#181E30',
        maxWidth: '488px'
    }),
    control: (provided: any) => ({
        ...provided,
        background: '#181E30',
        border: '1px solid #8B8E97',
        borderRadius: '6px',
        backgroundPositionX: 0,
        backgroundRepeat: 'no-repeat',
        flexDirection: "row-reverse"
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    menu: (provided: any) => ({
        ...provided,
        background: '#181E30',
        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        // borderRadius: '6px'
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#8B8E97'
    }),
    input: (provided: any) => ({
        ...provided,
        color: '#8B8E97'
    }),
    option: (styles: any, {isFocused}: { isFocused: boolean }) => ({
        ...styles,
        backgroundColor: isFocused ? '' : '',
        cursor: 'pointer'
    })
}

const OptionLabel = ({artist}: { artist: Artist }) => {
    return (
        <div className={'label-container'}>
            <div className={'label-preview'}>
                {artist.strArtistThumb ?
                    <img src={`${artist.strArtistThumb}/preview`} alt=''/> :
                    <MusicPreview/>
                }
            </div>
            <div className={'item-name'}>{artist.strArtist}</div>
        </div>
    )
}

const RightColumn = () => <div className={'column right'}>
    <div className={'aside-menu'}>
        <Link to={'/'}>
            <img src={Music} alt=''/>
        </Link>
    </div>
    <div className={'aside-menu-list green'}>
        {sideMenuItems[0].map((item: SideMenuItem) =>
            <div className={'side-menu-item'} key={item.title}>
                <div className={'side-menu-item_icon'}>
                    <img src={item.icon} alt=''/>
                </div>
                <div className={'side-menu-item_title'}>{item.title}</div>
            </div>
        )}
    </div>
    <div className={'aside-menu-list'}>
        <div className={'side-menu-item_title pink side-menu-title'}>
            YOUR LIBRARY
        </div>
        {sideMenuItems[1].map((item: SideMenuItem) =>
            <div className={'side-menu-item'} key={item.title}>
                <div className={'side-menu-item_icon'}>
                    <img src={item.icon} alt=''/>
                </div>
                <div className={'side-menu-item_title'}>{item.title}</div>
            </div>
        )}
    </div>
    <div className={'aside-menu-list'}>
        <div className={'side-menu-item_title pink side-menu-title'}>
            PLAYLISTS
        </div>
        {sideMenuItems[2].map((item: SideMenuItem) =>
            <div className={'side-menu-item'} key={item.title}>
                <div className={'side-menu-item_title'}>{item.title}</div>
            </div>
        )}
    </div>
    <div className={'aside-menu-bottom'}>
        <img src={NewPlaylist} alt=''/>
    </div>
</div>

const MobileHeader = () => <div className={'mobile-header_wrapper'}>
        <div className={'mobile-header'}>
            <div className={'mobile-menu'}></div>
            <div className={'menu-title'}>
                <Link to={'/'}>
                    <img src={Music} alt=''/>
                </Link>
            </div>
            <div className={'user'}></div>
        </div>
    </div>


export const Container = ({children, history}: Props) => {

    const loadingOptions = async (value: string) => {
        const artists = await musicService.searchArtists(value);

        return artists.map((artist) => ({
            label: <OptionLabel artist={artist} key={artist.idArtist}/>,
            value: artist.idArtist,
        }))
    }

    const onChange = (option: OptionTypeBase) => {
        history.push(`/${option.value}`)
    }

    return (
        <div className={"Container"}>
            <main>
                <RightColumn/>
                <MobileHeader/>
                <div className={'column left'}>
                    <div className={'header-row'}>
                        <div className={'search-container'}>
                            <AsyncSelect
                                value={null}
                                loadOptions={loadingOptions}
                                onChange={onChange}
                                styles={customSearchStyles}
                                components={{DropdownIndicator}}
                                placeholder={'Search for artists...'}
                            />
                        </div>
                        <div className={'actions-container'}>
                            <div className={'actions-settings'}>
                                <img src={Settings} alt=''/>
                            </div>
                            <div className={'actions-notifications'}>
                                <img src={Bell} alt=''/>
                            </div>
                            <div className={'user'}></div>
                        </div>
                    </div>
                    {children}
                </div>
            </main>
            <footer></footer>
        </div>
    )
};


