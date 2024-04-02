import React from "react";
import dvaWithHearth from '../../assets/img/dva_hearth.png';
import './/General.css';

export function General({OnGetStartedClick}) {
    return (
        <>
            <p>PlayList</p>
            <p>The single page application is designed from gamers and for gamers! You can use the webpage to save games
                to your personal library.<br/>On the "Browse" tab we have many different games to observe and to add to
                your library.
                Feel free to add some personal games too!<br/>On the "Library" all your games displayed.<br/>Have fun!
            </p>
            <button className="get_started_button" onClick={OnGetStartedClick}>Get started with Browse!</button><br/>
            <img src={dvaWithHearth} alt="D.Va" className="dva_image"/>
        </>
    )
}