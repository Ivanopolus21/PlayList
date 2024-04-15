import './Navigation.css';
import React, {useState} from "react";
import logo from "../assets/img/play_list_logo.png";
import darkLogo from "../assets/img/play_list_logo_dark.png";
import {BrowseButton} from "./BrowseButton";
import {LibraryButton} from "./LibraryButton";
import {useOnlineStatus} from "../hooks/useOnlineStatus";

export function Navigation({OnNavigationBrowseButtonClick, OnNavigationLibraryButtonClick, OnNavigationLogoClick}) {
    const [logoTheme, setLogoTheme] = useState('light');
    const isOnline = useOnlineStatus();
    function renderBrowserButton() {
        return (
            <BrowseButton
                OnBrowseButtonClick = {OnNavigationBrowseButtonClick}
            />
        )
    }

    function renderLibraryButton() {
        return (
            <LibraryButton
                OnLibraryButtonClick = {OnNavigationLibraryButtonClick}
            />
        )
    }

    function HandleMouseEnter() {
        setLogoTheme('dark');
    }

    function HandleMouseLeave() {
        setLogoTheme('light');
    }

    return (
        <nav>
            <div className="logo_circle" onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseLeave} onClick={OnNavigationLogoClick}>
                {isOnline && <img src={logoTheme === 'light' ? logo : darkLogo} alt="PlayList logo" className="logo_mini"/>}
                {!isOnline && <div className="logo_offline"/>}
            </div>
            {renderBrowserButton()}
            {renderLibraryButton()}
        </nav>
    )
}