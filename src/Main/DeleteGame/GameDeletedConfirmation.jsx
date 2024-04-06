import './GameDeletedConfirmation.css';
import {useState} from "react";
import deleteBoopSound from "../../assets/sounds/infographic-pop-1-197868.mp3";
import {GameDeletedSuccessfullyMessage} from "./GameDeletedSuccessfullyMessage";

export function GameDeletedConfirmation({displayType, gameId, OnYesButtonClick, OnNoButtonClick}) {
    const [isDeletedSuccessfullyMessageShown, setIsDeletedSuccessfullyMessageShown] = useState(false);

    function showTheGameDeletedSuccessfullyMessage() {
        setIsDeletedSuccessfullyMessageShown(true);
    }

    function playAudio() {
        const boopSound = new Audio(deleteBoopSound);
        boopSound.play();
    }

    function hideTheGameDeletedSuccessfullyMessage() {
        setIsDeletedSuccessfullyMessageShown(false);
        OnNoButtonClick();
        playAudio();
    }

    return(
        <>
            <div className="game_delete_confirmation_window" style={{display: displayType}}>
                <div className="game_delete_confirmation_container">
                    <p>Do you want to delete the game?</p>
                    <div className="conf_buttons">
                        <button onClick={() => {
                            OnYesButtonClick();
                            showTheGameDeletedSuccessfullyMessage();
                        }} id="yes_button">Yes</button>
                        <button onClick={OnNoButtonClick} id="no_button">No</button>
                    </div>
                </div>
            </div>
            {isDeletedSuccessfullyMessageShown === true &&
                <GameDeletedSuccessfullyMessage gameId={gameId}
                OnConfirmButtonClick={hideTheGameDeletedSuccessfullyMessage}/>}
        </>
    )
}