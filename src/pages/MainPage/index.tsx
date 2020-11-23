import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './mainPage.css';
import musicImageDesktop from "../../assets/MUSIC.png"
import musicImageMobile from "../../assets/Rectangle_3.png"
import featuredImage from "../../assets/FEATURED.png"

export const MainPage = (props: RouteComponentProps) => {
    return (
        <div className="music">
            <img src={musicImageDesktop} className={'music-slider-desktop'} alt='' />
            <img src={musicImageMobile} className={'music-slider-mobile'} alt='' />
            <img src={featuredImage} alt='' />
        </div>
    );
}
