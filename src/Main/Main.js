import React, {useEffect, useState} from "react";
import {MyLibraryPage} from "./MyLibrary/MyLibraryPage";
import {BrowsePage} from "./BrowseGames/BrowsePage";
import {AboutMe} from "../Footer/AboutMe";
import {General} from "./General/General";
import './Main.css';
import games from "../GamesData";

let didInit = false;
export function Main({state, OnGetStartedClick}) {
    const [displayType, setDisplayType] = useState('none');
    const [addNewGameDisplay, setAddNewGameDisplay] = useState('none');
    const [deleteGameDisplay, setDeleteGameDisplay] = useState('none');

    useEffect(() => {
        if (!didInit) {
            didInit = true;
            dbGetTest();
        }
    }, []);

    function dbGetTest() {
        const dbName = "New_Games_DB";
        const request = indexedDB.open(dbName, 3);

        request.onerror = (event) => {
            console.error("You cannot add a new game without allowing the website to use IndexedDB.")
        };

        request.onupgradeneeded = (event) => {
            let db = request.result;

            if (!db.objectStoreNames.contains('games')) { // if there's no "games" store
                db.createObjectStore('games', { keyPath: 'id'});
            }
        };

        request.onsuccess = (event) => {
            // Save the IDBDatabase interface
            const db = event.target.result;

            const transaction = db.transaction("games", "readonly");

            transaction.oncomplete = (event) => {
                console.log("All complete! (render App.js)");
            };

            transaction.onerror = (event) => {
                console.log("oops");
            };

            const gamesStore = transaction.objectStore("games");

            gamesStore.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    games.push(cursor.value);
                    cursor.continue();
                    console.log(`It is value: ${cursor.value}`);
                } else {
                    console.log(`Got all games: ${games}`);
                }
            };

            request.onsuccess = (event) => {
                console.log("Test games was retrieved!");
            }
            request.onerror = (event) => {
                console.log("ERRRRORR");
            }
        }
    }

    function setAddNewGameOverlayOn() {
        setAddNewGameDisplay('flex');
    }

    function setDeleteGameOverlayOn() {
        setDeleteGameDisplay('flex');
    }

    function setOverlayOn() {
        setDisplayType('flex');
    }

    function setOverlayOff() {
        setDisplayType('none');
        setAddNewGameDisplay('none');
        setDeleteGameDisplay('none');
    }

    return (
        <main className="App-main">
            {state === 'start' && <
                General
                OnGetStartedClick={OnGetStartedClick}
            />}
            {state === 'library' && <
                MyLibraryPage
                displayType={displayType}
                OnLibraryGameClick={setOverlayOn}
                OnCloseClick={setOverlayOff}
                mainState={state}
            />}
            {state === 'browse' && <
                BrowsePage
                displayType={displayType}
                newGameDisplay={addNewGameDisplay}
                deleteGameDisplay={deleteGameDisplay}
                OnGameClick={setOverlayOn}
                OnAddNewGameClick={setAddNewGameOverlayOn}
                OnDeleteGameClick={setDeleteGameOverlayOn}
                OnCloseClick={setOverlayOff}
                mainState={state}
            />}
            {state === 'aboutMe' && <AboutMe/>}
        </main>
    )
}