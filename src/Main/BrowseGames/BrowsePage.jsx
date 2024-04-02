import './BrowsePage.css';
import games from '../../GamesData';
import closeButton from "../../assets/img/icons8-close.svg";
import {useState} from "react";
import {GameWindow} from "../GameWindow/GameWindow";
import {AddNewGameWindow} from "../AddNewGameWindow/AddNewGameWindow";
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

