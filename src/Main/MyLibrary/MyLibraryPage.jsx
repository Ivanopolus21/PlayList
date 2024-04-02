import games from "../../GamesData";
import './MyLibraryPage.css';
import {GameWindow} from "../GameWindow/GameWindow";
import {useState} from "react";

export function MyLibraryPage({displayType, OnLibraryGameClick, OnCloseClick, mainState}) {
    const [currentLibraryGameId, setCurrentLibraryGameID] = useState(0);
    const [sortedBy, setSortedBy] = useState('notSorted');
    const completed = 'Completed';
    const usedToPlay = 'Used to play'
    const currentlyPlaying = 'Currently playing';
    const notPlayedYet = 'Not played yet';

    function checkForGameState(id, sortType) {
        let gameStateBasedOnId = localStorage.getItem(id);
        switch (sortType) {
            case 'showCompleted':
                if (gameStateBasedOnId === completed && sortedBy === 'completed') {
                    return 'flex';
                } else {
                    return 'none';
                }
            case 'showUsedToPlay':
                if (gameStateBasedOnId === usedToPlay && sortedBy === 'usedToPlay') {
                    return 'flex';
                } else {
                    return 'none';
                }
            case 'showCurrentlyPlaying':
                if (gameStateBasedOnId === currentlyPlaying && sortedBy === 'currentlyPlaying') {
                    return 'flex';
                } else {
                    return 'none';
                }
            default:
                if (gameStateBasedOnId === completed || gameStateBasedOnId === currentlyPlaying || gameStateBasedOnId === usedToPlay) {
                    return 'flex';
                } else if (gameStateBasedOnId === notPlayedYet || gameStateBasedOnId === undefined || sortedBy !== 'notPlayedYet'){
                    return 'none';
                } else {
                    return 'none';
                }
        }
    }

    function HandleLibraryGameClick(gameId) {
        setCurrentLibraryGameID(gameId);
    }

    function returnTheList(type) {
        if (type === 'all') {
            return (games.map(game =>
                <li key={game.id} className="listItem" style={{display: checkForGameState(game.id)}}>
                    <div
                        className="overlay"
                    ></div>
                    <img
                        src={game.src}
                        className="gameImage"
                        alt={game.title + ' poster'}

                        onClick={() => {
                            OnLibraryGameClick();
                            HandleLibraryGameClick(game.id)
                        }}
                    />
                    <p className="gameTitle">{game.title}</p>
                </li>
            ))
        } else if (type === 'completed') {
            return (games.map(game =>
                <li key={game.id} className="listItem" style={{display: checkForGameState(game.id, 'showCompleted')}}>
                    <div
                        className="overlay"
                    ></div>
                    <img
                        src={game.src}
                        className="gameImage"
                        alt={game.title + ' poster'}

                        onClick={() => {
                            OnLibraryGameClick();
                            HandleLibraryGameClick(game.id)
                        }}
                    />
                    <p
                        className="gameTitle"
                        style={{}}
                    >{game.title}</p>
                </li>
            )
            )
        } else if (type === 'usedToPlay') {
            return (games.map(game =>
                <li key={game.id} className="listItem" style={{display: checkForGameState(game.id, 'showUsedToPlay')}}>
                    <div
                        className="overlay"
                    ></div>
                    <img
                        src={game.src}
                        className="gameImage"
                        alt={game.title + ' poster'}

                        onClick={() => {
                            OnLibraryGameClick();
                            HandleLibraryGameClick(game.id)
                        }}
                    />
                    <p
                        className="gameTitle"
                        style={{}}
                    >{game.title}</p>
                </li>
            ))
        } else if (type === 'currentlyPlaying') {
            return (games.map(game =>
                <li key={game.id} className="listItem" style={{display: checkForGameState(game.id, 'showCurrentlyPlaying')}}>
                    <div
                        className="overlay"
                    ></div>
                    <img
                        src={game.src}
                        className="gameImage"
                        alt={game.title + ' poster'}

                        onClick={() => {
                            OnLibraryGameClick();
                            HandleLibraryGameClick(game.id)
                        }}
                    />
                    <p
                        className="gameTitle"
                        style={{}}
                    >{game.title}</p>
                </li>
            ))
        }
    }

    function ChangeLibrarySort(sortBy) {
        setSortedBy(sortBy);
    }

    return (
        <div className="library_main">
            <aside className="sort_buttons_list">
                <button onClick={() => ChangeLibrarySort('notSorted')} className="sort_button">Show all</button>
                <button onClick={() => ChangeLibrarySort('completed')} className="sort_button">{completed}</button>
                <button onClick={() => ChangeLibrarySort('usedToPlay')} className="sort_button">{usedToPlay}</button>
                <button onClick={() => ChangeLibrarySort('currentlyPlaying')} className="sort_button">{currentlyPlaying}</button>
            </aside>
            <ul className='library_game_list'>
                {sortedBy === 'notSorted' && returnTheList('all')}
                {sortedBy === 'completed' && returnTheList('completed')}
                {sortedBy === 'usedToPlay' && returnTheList('usedToPlay')}
                {sortedBy === 'currentlyPlaying' && returnTheList('currentlyPlaying')}
            </ul>
            <
                GameWindow
                displayType={displayType}
                OnCloseClick={OnCloseClick}
                id={currentLibraryGameId}
                state={mainState}
            />
        </div>
    )
}