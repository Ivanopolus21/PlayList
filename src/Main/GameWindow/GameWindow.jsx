import './GameWindow.css';
import closeButton from '../../img/icons8-close.svg';
import games from '../../GamesData';

export function GameWindow({displayType, OnCloseClick, id, state}) {
    let value = 'Not played yet';
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
            if (value !== 'Not played yet') {
                // alert('Option ' + value + ' was saved for ' + id + '!');
                localStorage.setItem(id, value);
            }
        } else if(buttonType === 'delete') {
            localStorage.setItem(id, "Not played yet");
        }
        OnCloseClick();
    }

    function Select({type}) {
        const npy = 'Not played yet';
        const c = 'Completed';
        const cp = 'Currently playing';
        const utp = 'Used to play';
        const choose = 'Add to library';

        if (type === 'Singleplayer') {
            return (
                <select name="Select your type"
                        defaultValue={localStorage.getItem(id)}
                        onChange={(e) => HandleSelectChange(e)}>
                    <option className="select_option1" value='Not played yet' disabled={true}>{choose}</option>
                    <option className="select_option2" value='Completed'>{c}</option>
                    <option className="select_option3" value='Currently playing'>{cp}</option>
                </select>
            )
        } else if (type === 'Multiplayer' || type === 'Cooperative') {
            return (
                <select name="Select your type"
                        defaultValue={localStorage.getItem(id)}
                        onChange={(e) => HandleSelectChange(e)}>
                    <option className="select_option1" value='Not played yet' defaultValue disabled={true}>{choose}</option>
                    <option className="select_option2" value='Used to play'>{utp}</option>
                    <option className="select_option3" value='Currently playing'>{cp}</option>
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

