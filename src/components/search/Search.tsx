import React from "react";
import {musicService} from "../../services/music.service";
import AsyncSelect from "react-select/async";
import {OptionTypeBase} from "react-select/src/types";
import "./search.css";
import {components} from "react-select";
import {RouteComponentProps} from "react-router-dom";

interface Props extends RouteComponentProps {
    children: React.Component;
}

const customSearchStyles = {
    container: (provided: any) => ({
        ...provided,
        background: '#181E30'
    }),
    control: (provided: any) => ({
        ...provided,
        background: '#181E30',
        border: '1px solid #8B8E97',
        borderRadius: '6px'
    }),
    dropdownIndicator: () => ({
        display: 'none'
    })
}


const DropdownIndicator = (
    props: any
) => {
    return (
        <components.DropdownIndicator {...props}>
            <div className='search-icon'/>
        </components.DropdownIndicator>
    );
};

const loadingOptions = async (value: string) => {
    const artists = await musicService.searchArtists(value);

    return artists.map((artist) => ({
        label: <div><img width={"24px"} height={"24px"} src={`${artist.strArtistThumb}/preview`}/>
            {artist.strArtist}</div>,
        value: artist.idArtist,
    }))
}

export const Search = ({children, history}: Props) => {

    const onChange = (option: OptionTypeBase) => {
        history.push(`/${option.value}`)
    }

}