import './App.css';
import {Footer} from "../Footer/Footer";
import {Main} from "../Main/Main";
import React, {useState} from "react";
import {Navigation} from "../Navigation/Navigation";

export default function App() {
    const [state, setState] = useState("start");
    const [leftHover, setLeftHover] = useState(false);
    const [rightHover, setRightHover] = useState(false);

    function handleClick(type) {
        setState(type);
    }

    function handleRightHover() {
        setRightHover(true);
    }

    function handleLeftHover() {
        setLeftHover(true);
    }

    function handleBothHover() {
        setLeftHover(true);
        setRightHover(true);
    }

    function handleHoverNot() {
        setLeftHover(false);
        setRightHover(false);
    }

    function renderMain() {
        return (
            <Main
                state={state}
                OnGetStartedClick={() => handleClick("browse")}
            />
        )
    }

    function renderNavigation() {
        return (
            <Navigation
                name = {state}
                OnNavigationBrowseButtonClick= {() => handleClick("browse")}
                OnNavigationLibraryButtonClick= {() => handleClick("library")}
                OnNavigationLogoClick= {() => handleClick("start")}
            />
        )
    }

    function renderFooter() {
        return (
            <Footer
                name = {state}
                leftHover = {leftHover}
                rightHover = {rightHover}
                OnAboutMeClick = {() => handleClick("aboutMe")}
                OnLinkHoverLeft={handleLeftHover}
                OnLinkHoverRight={handleRightHover}
                OnLinkHoverBoth={handleBothHover}
                OnLinkHoverNot={handleHoverNot}
            />
        )
    }

     return (
            <div className="App">
                {renderNavigation()}
                {renderMain()}
                {renderFooter()}
            </div>
     )
}