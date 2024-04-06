import './GameWindow.css';
import games from '../../GamesData';
import closeButton from '../../assets/img/icons8-close.svg';

export function GameWindow({displayType, OnCloseClick, id, state}) {
    let value = '';
    const listGames = games.map(game =>
        <>
            <img src={closeButton} alt="Close button" id="svg_close_button" onClick={OnCloseClick}/>
            <div className="game_image_and_title">
                <img alt=" poster" src={game.src}/>
                <p id="game_title">{game.title}</p>
            </div>
            <div className="vertical_line"></div>
            <div className="game_description_container">
                <p className="game_description_item" id="game_description">{game.description}</p>
                <hr/>
                <p className="game_description_item">{game.type}</p>
                <hr/>
                <p className="game_description_item">Genres: {game.genres}</p>
                <hr/>
                <div className="game_window_buttons">
                    <Select
                        type={game.type}
                    />
                    <button className="window_button" onClick={() => handleMainButton(game.id, 'save')}>Save</button>
                    {state === "library" && <button className="window_button" onClick={() => handleMainButton(game.id, 'delete')}>Delete</button>}
                </div>
            </div>
        </>
    )

    function handleMainButton(id, buttonType) {
        if (buttonType === 'save') {
            if (value !== '') {
                // alert('Option ' + value + ' was saved for ' + id + '!');
                localStorage.setItem(id, value);
            }
        } else if(buttonType === 'delete') {
            localStorage.setItem(id, '');
        }
        OnCloseClick();
    }

    function Select({type}) {
        const npy = '';
        const completedState = 'Completed';
        const currentlyPlayingState = 'Currently playing';
        const usedToPlayState = 'Used to play';
        const chooseState = 'Add to library';

        if (type === 'Singleplayer') {
            return (
                <select name="Select your type"
                        defaultValue={localStorage.getItem(id) || npy}
                        onChange={(e) => HandleSelectChange(e)}>
                    <option className="select_option1" value='' disabled={true}>{chooseState}</option>
                    <option className="select_option2" value='Completed'>{completedState}</option>
                    <option className="select_option3" value='Currently playing'>{currentlyPlayingState}</option>
                </select>
            )
        } else if (type === 'Multiplayer' || type === 'Cooperative') {
            return (
                <select name="Select your type"
                        defaultValue={localStorage.getItem(id) || npy}
                        onChange={(e) => HandleSelectChange(e)}>
                    <option className="select_option1" value='' disabled={true}>{chooseState}</option>
                    <option className="select_option2" value='Used to play'>{usedToPlayState}</option>
                    <option className="select_option3" value='Currently playing'>{currentlyPlayingState}</option>
                </select>
            )
        }

        function HandleSelectChange(e) {
            value = e.target.value;
        }
    }

    return (
        <div className="game_window" style={{display: displayType}}>
            <div id="game_container">
                {listGames[id]}
            </div>
        </div>
    )
}

