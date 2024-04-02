import './BrowsePage.css';
import games from '../../GamesData';
import {GameWindow} from "../GameWindow/GameWindow";
import {useState} from "react";
import {AddNewGameWindow} from "../AddNewGameWindow/AddNewGameWindow";
import closeButton from "../../img/icons8-close.svg";
import {GameDeletedConfirmation} from "../DeleteGame/GameDeletedConfirmation";
import {DbRemoveTest, DbUpdateTest} from "../../Config/DatabaseConfigs";

export function BrowsePage({displayType, newGameDisplay, deleteGameDisplay, OnGameClick, OnAddNewGameClick, OnDeleteGameClick, OnCloseClick, mainState}) {
    const [currentGameId, setCurrentGameID] = useState(0);
    const [gameNum, setGameNum] = useState(games.length);

    const gameList = games.map(game =>
        <li key={game.id} className="listItem">
            <div
                className="overlay"
            ></div>
            <img src={closeButton}
                 alt="Close button"
                 className="svg_remove_game_button"
                 onClick={() => {
                     OnDeleteGameClick();
                     HandleGameClick(game.id);
                 }}
                 style={{display: game.id >= 4 ? 'inline' : 'none'}}
            />
            <img
                src={game.src}
                className="gameImage"
                alt={game.title + ' poster'}
                onClick={() => {
                    OnGameClick();
                    HandleGameClick(game.id);
                }}
            />
            <p
                className="gameTitle"
            >{game.title}</p>
        </li>
    )

    // function dbRemoveTest(id) {
    //     const dbName = "New_Games_DB";
    //     const request = indexedDB.open(dbName, 3);
    //
    //     request.onerror = (event) => {
    //         console.error("You cannot add a new game without allowing the website to use IndexedDB.");
    //     };
    //
    //     request.onupgradeneeded = (event) => {
    //         let db = request.result;
    //
    //         if (!db.objectStoreNames.contains('games')) { // if there's no "games" store
    //             db.createObjectStore('games', { keyPath: 'id'}); // create it
    //         }
    //     };
    //
    //     request.onsuccess = (event) => {
    //         // Save the IDBDatabase interface
    //         const db = event.target.result;
    //
    //         const transaction = db.transaction("games", "readwrite");
    //
    //         transaction.oncomplete = (event) => {
    //             console.log("All remove complete! ");
    //         };
    //
    //         transaction.onerror = (event) => {
    //             console.log("oops");
    //         };
    //
    //         const gamesStore = transaction.objectStore("games");
    //         //Delete from IndexedDB
    //         gamesStore.delete(id);
    //         //Delete the choice from localStorage
    //         localStorage.setItem(id, 'Not played yet');
    //         //Delete from "games" array
    //         games.splice(id, 1);
    //
    //         request.onsuccess = (event) => {
    //             console.log("Test game " + id + " was removed!")
    //         }
    //         request.onerror = (event) => {
    //             console.log("ERRRRORR");
    //         }
    //     }
    // }
    //
    // function dbUpdateTest(id) {
    //     const dbName = "New_Games_DB";
    //     const request = indexedDB.open(dbName, 3);
    //
    //     request.onerror = (event) => {
    //         console.error("You cannot update a game without allowing the website to use IndexedDB.");
    //     };
    //
    //     request.onupgradeneeded = (event) => {
    //         let db = request.result;
    //
    //         if (!db.objectStoreNames.contains('games')) { // if there's no "games" store
    //             db.createObjectStore('games', { keyPath: 'id'}); // create it
    //         }
    //     };
    //
    //     request.onsuccess = (event) => {
    //         // Save the IDBDatabase interface
    //         const db = event.target.result;
    //
    //         const transaction = db.transaction("games", "readwrite");
    //
    //         transaction.oncomplete = (event) => {
    //             console.log("All update complete! ");
    //         };
    //
    //         transaction.onerror = (event) => {
    //             console.log("oops");
    //         };
    //
    //         const gamesStore = transaction.objectStore("games");
    //         const count = gamesStore.count();
    //         count.onsuccess = () => {
    //
    //             for (let i = 1; i <= count.result; i++) {
    //                 const gameStoreIdRequest = gamesStore.get(id + i);
    //
    //                 gameStoreIdRequest.onsuccess = () => {
    //                     let counter = i - 1;
    //                     const gameToUpdateID = gameStoreIdRequest.result;
    //
    //                     if (gameToUpdateID !== undefined) {
    //                         // console.log(gameToUpdateID.title);
    //                         let gameBackup = {
    //                             id: id + counter,
    //                             title: gameToUpdateID.title,
    //                             src: gameToUpdateID.src,
    //                             description: gameToUpdateID.description,
    //                             genres: gameToUpdateID.genres,
    //                             type: gameToUpdateID.type
    //                         }
    //                         games.push(gameBackup);
    //                         gameToUpdateID.id = id + counter;
    //
    //                         const updateIdRequest = gamesStore.put(gameToUpdateID);
    //                         gamesStore.delete(id + i);
    //                         games.splice(id, 1);
    //
    //                         updateIdRequest.onsuccess = () => {
    //                             console.log("YAY! ID UPDATE FOR " + (id + i) +  " SUCCEED!")
    //                         }
    //                         updateIdRequest.onerror = () => {
    //                             console.log("Oh no! The request failed for ID: " + (id + i) + " that tried to change for ID: " + id)
    //                         }
    //                     }
    //                     /*todo: 22.03, 12:17 ОСНОВНІ ПРОБЛЕМИ: після видалення однієї з ігор воно має всі айдішки поміняти, а міняє лише одне наче
    //                      */
    //                 }
    //
    //                 gameStoreIdRequest.onerror = () => {
    //                     console.log("Error gameStore ID request");
    //                 }
    //
    //                 // const gameStoreIdRequest = gamesStore.get(id + 1);
    //                 //
    //                 // gameStoreIdRequest.onsuccess = () => {
    //                 //
    //                 //     const gameToUpdateID = gameStoreIdRequest.result;
    //                 //
    //                 //     if (gameToUpdateID !== undefined) {
    //                 //         gameToUpdateID.id = id;
    //                 //
    //                 //         const updateIdRequest = gamesStore.put(gameToUpdateID);
    //                 //         gamesStore.delete(id + 1);
    //                 //         updateIdRequest.onsuccess = () => {
    //                 //             console.log("YAY! ID UPDATE SUCCEED!")
    //                 //         }
    //                 //         updateIdRequest.onerror = () => {
    //                 //             console.log("Oh no! The request failed for ID: " + (id + 1) + " that tried to change for ID: " + id)
    //                 //         }
    //                 //     }
    //                 //
    //                 //     /*todo: 22.03, 12:17 ОСНОВНІ ПРОБЛЕМИ: після видалення однієї з ігор воно має всі айдішки поміняти, а міняє лише одне наче
    //                 //      */
    //                 // }
    //                 //
    //                 // gameStoreIdRequest.onerror = () => {
    //                 //     console.log(gamesStore.get(id + 1).result);
    //                 // }
    //             }
    //         }
    //     }
    // }

    function HandleGameClick(gameId) {
        setCurrentGameID(gameId);
    }

    function changeNumberOfGames(num) {
        setGameNum(gameNum + num);
    }

    function HandleGameDelete(num) {
        DbRemoveTest(currentGameId);
        DbUpdateTest(currentGameId);
        changeNumberOfGames(num);
    }

    return (
        <div className="browse_page" >
            <p>Current number of games: {gameNum}</p>
            <button className="add_game_button" onClick={OnAddNewGameClick}>Add new game</button>
            <ul className="gameList">
                {gameList}
            </ul>
            <
                GameDeletedConfirmation
                displayType={deleteGameDisplay}
                gameId={currentGameId}
                OnYesButtonClick={() => {HandleGameDelete(-1)}}
                OnNoButtonClick={OnCloseClick}
            />
            <
                AddNewGameWindow
                displayType={newGameDisplay}
                OnAddNewGameClick={() => {changeNumberOfGames(1)}}
                OnCloseClick={OnCloseClick}
            />
            <
                GameWindow
                displayType={displayType}
                OnCloseClick={OnCloseClick}
                id={currentGameId}
                state={mainState}
            />
        </div>
    )
}

