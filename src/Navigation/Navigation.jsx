import React, {useState} from "react";
import './Navigation.css';
import {BrowseButton} from "./BrowseButton";
import {LibraryButton} from "./LibraryButton";
import logo from "../img/play_list_logo.png";
import darkLogo from "../img/play_list_logo_dark.png";

export function Navigation({OnNavigationBrowseButtonClick, OnNavigationLibraryButtonClick, OnNavigationLogoClick}) {
    const [logoTheme, setLogoTheme] = useState('light');

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
                <img src={logoTheme === 'light' ? logo : darkLogo} alt="PlayList logo" className="logo_mini"/>
            </div>
            {renderBrowserButton()}
            {renderLibraryButton()}
        </nav>
    )
}