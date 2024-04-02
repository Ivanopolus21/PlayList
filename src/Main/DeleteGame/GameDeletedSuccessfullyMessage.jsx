import './GameDeletedSuccessfullyMessage.css';
import games from "../../GamesData";
import confirmButton from "../../assets/img/check_icon.svg";

export function GameDeletedSuccessfullyMessage({gameId, OnConfirmButtonClick}) {
    return(
        <div className="game_successfully_deleted_window">
            <div className="game_successfully_deleted_container">
                <p>You successfully deleted the "{games[gameId].title}"!</p>
                <img src={confirmButton}
                     alt="Confirm button"
                     className="svg_confirm_button"
                     onClick={OnConfirmButtonClick}
                />
            </div>
        </div>
    )
}