import Home from '../assets/icons/home.png'
import Search from '../assets/icons/search.png'
import Radio from '../assets/icons/radio.png'
import Clock from '../assets/icons/clock.png'
import User from '../assets/icons/user.png'
import Heart from '../assets/icons/heart.png'
import Layers from '../assets/icons/layers.png'

export const sideMenuItems = [
    [
        {
            icon: Home,
            title: 'Home'
        },
        {
            icon: Search,
            title: 'Browse'
        },
        {
            icon: Radio,
            title: 'Radio'
        },
    ],
    [
        {
            icon: Clock,
            title: 'RECENTLY PLAYED'
        },
        {
            icon: Heart,
            title: 'FAVORITE SONGS'
        },
        {
            icon: User,
            title: 'ARTISTS'
        },
        {
            icon: Layers,
            title: 'albums'
        },

    ],
    [
        {

            title: 'TOP POP'
        },
        {

            title: 'CHARTING NOW'
        },
        {

            title: 'ROMANCE SEASON'
        },
    ]
] as SideMenuItem[][];

export interface SideMenuItem {
    title: string,
    icon?: string
}
