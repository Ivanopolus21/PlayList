import './MyLibraryPage.css';
import {useState} from "react";
import games from "../../GamesData";
import {GameWindow} from "../GameWindow/GameWindow";

export function MyLibraryPage({displayType, OnLibraryGameClick, OnCloseClick, mainState}) {
    const [currentLibraryGameId, setCurrentLibraryGameID] = useState(0);
    const [filteredBy, setFilteredBy] = useState('notFiltered');
    const completed = 'Completed';
    const usedToPlay = 'Used to play'
    const currentlyPlaying = 'Currently playing';
    const notPlayedYet = '';

    /**
     * Function for displaying current chosen state of the games.
     * @param id - The game id.
     * @param filterType - The type of filter (Completed, Currently Playing...)
     * @returns {string}
     */
    function checkForGameState(id, filterType) {
        let gameStateBasedOnId = localStorage.getItem(id);
        switch (filterType) {
            case 'showCompleted':
                if (gameStateBasedOnId === completed && filteredBy === 'completed') {
                    return 'flex';
                } else {
                    return 'none';
                }
            case 'showUsedToPlay':
                if (gameStateBasedOnId === usedToPlay && filteredBy === 'usedToPlay') {
                    return 'flex';
                } else {
                    return 'none';
                }
            case 'showCurrentlyPlaying':
                if (gameStateBasedOnId === currentlyPlaying && filteredBy === 'currentlyPlaying') {
                    return 'flex';
                } else {
                    return 'none';
                }
            default:
                if (gameStateBasedOnId === completed || gameStateBasedOnId === currentlyPlaying || gameStateBasedOnId === usedToPlay) {
                    return 'flex';
                } else if (gameStateBasedOnId === notPlayedYet || gameStateBasedOnId === undefined || filteredBy !== 'notPlayedYet'){
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

    function ChangeLibraryFilter(filterBy) {
        setFilteredBy(filterBy);
    }

    return (
        <div className="library_main">
            <aside className="sort_buttons_list">
                <button onClick={() => ChangeLibraryFilter('notFiltered')} className="sort_button">Show all</button>
                <button onClick={() => ChangeLibraryFilter('completed')} className="sort_button">{completed}</button>
                <button onClick={() => ChangeLibraryFilter('usedToPlay')} className="sort_button">{usedToPlay}</button>
                <button onClick={() => ChangeLibraryFilter('currentlyPlaying')} className="sort_button">{currentlyPlaying}</button>
            </aside>
            <ul className='library_game_list'>
                {filteredBy === 'notFiltered' && returnTheList('all')}
                {filteredBy === 'completed' && returnTheList('completed')}
                {filteredBy === 'usedToPlay' && returnTheList('usedToPlay')}
                {filteredBy === 'currentlyPlaying' && returnTheList('currentlyPlaying')}
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