import confirmButton from "../../../assets/img/check_icon.svg";
import './GameAddedConfirmation.css';

export function GameAddedConfirmation({OnConfirmButtonClick}) {
    return(
        <div className="game_add_confirmation_window">
            <div className="game_add_confirmation_container">
                <p>You added a new game!</p>
                <img src={confirmButton}
                     alt="Confirm button"
                     className="svg_confirm_button"
                     onClick={OnConfirmButtonClick}
                />
            </div>
        </div>
    )
}