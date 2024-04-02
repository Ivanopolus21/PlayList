import closeButton from "../../img/icons8-close.svg";
import documentImg from "../../img/file-add.svg";
import addedDocumentImg from "../../img/file-check.svg";
import './AddNewGameWindow.css';
import {useState} from "react";
import games from "../../GamesData";
import {GameAddedConfirmation} from "./GameAddedConfirmation/GameAddedConfirmation";

export function AddNewGameWindow({displayType, OnCloseClick, OnAddNewGameClick}) {
    const [imageForPicture, setImageForPicture] = useState('notAdded');
    const [isGameAdded, setIsGameAdded] = useState(false);
    const [gameInputs, setGameInputs] = useState({id: 0, src: "", title: "", description: "", type: "", genres: ""});

    function dbAddTest() {
        const dbName = "New_Games_DB";
        const request = indexedDB.open(dbName, 3);

        request.onerror = (event) => {
            console.error("You cannot add a new game without allowing the website to use IndexedDB.");
        };

        request.onupgradeneeded = (event) => {
            let db = request.result;

            if (!db.objectStoreNames.contains('games')) { // if there's no "games" store
                db.createObjectStore('games', { keyPath: 'id'}); // create it
            }
        };

        request.onsuccess = async (event) => {
            // Save the IDBDatabase interface
            const db = event.target.result;

            const imageDataURL = await readFileAsDataURL(gameInputs.src);
            const typeFixed = gameInputs.type === '' ? "Singleplayer" : gameInputs.type;

            let gameExmpl = {
                id: games.length,
                title: gameInputs.title,
                src: imageDataURL,
                description: gameInputs.description,
                genres: gameInputs.genres,
                type: typeFixed
            }

            const transaction = db.transaction("games", "readwrite");

            transaction.oncomplete = (event) => {
                console.log("All add complete! (transaction of game addition was opened)");
            };

            transaction.onerror = (event) => {
                console.log("Oops, transaction of game addition was not opened!");
                console.log(games);
            };

            const gamesStore = transaction.objectStore("games");
            const request = gamesStore.add(gameExmpl);

            request.onsuccess = (event) => {
                console.log("Test game " + gameExmpl.id + " was added!")
            }
            request.onerror = (event) => {
                console.log("ERRRRORR, game " + gameExmpl.id + " was not added!");
            }
            games.push(gameExmpl);
        }
    }

    const readFileAsDataURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    };

    function changeTheFileImage() {
        setImageForPicture('added');
    }

    function resetTheFileImage() {
        setImageForPicture('notAdded');
    }

    function resetInputs() {
        resetTheFileImage();
        document.querySelector('#add_new_game_container').reset();
    }

    function ResetTheIsAddedBoolean() {
        setIsGameAdded(false);
        OnCloseClick();
    }

    function playAudio() {
        const boopSound = new Audio('/sounds/[Overwatch] Sombra\'s Boop Voice Line.mp3');
        boopSound.play();
    }

    function HandleFormSubmit(e) {
        if(validateTheForm()) {
            dbAddTest();
            setIsGameAdded(true);
            //Adds a new game to the game count, nothing important
            OnAddNewGameClick();
            resetInputs();
            playAudio();
        }
        e.preventDefault();
    }

    function validateTheForm() {
        const img = document.forms["addNewGameForm"]["gamePicture"].value;
        const title = document.forms["addNewGameForm"]["gameTitle"].value;
        const desc = document.forms["addNewGameForm"]["gameDescription"].value;
        const genres = document.forms["addNewGameForm"]["gameGenres"].value;
        console.log(img);
        if (img === "" || title === "" || desc === "" || genres === "") {
            alert("Every field is required!");
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="add_new_game_window" style={{display: displayType}}>
                <form name="addNewGameForm" id="add_new_game_container" onSubmit={(e) => {
                    HandleFormSubmit(e);
                }
                }>
                    <img src={closeButton}
                         alt="Close button"
                         className="svg_close_button"
                         onClick={() => {
                             OnCloseClick();
                             resetInputs();
                         }}
                    />
                    <p>Add a new game!</p>
                    <hr/>

                    {/* Uploading an image */}
                    <label htmlFor="game_image_input">
                        {imageForPicture === 'notAdded' ? "Choose a picture:" : "Your choice was saved!"}
                    </label>
                    <label htmlFor="game_image_input">
                        <img src={imageForPicture === 'notAdded' ? documentImg : addedDocumentImg}
                             alt="Document search img"
                             className="add_new_game_input"
                             id="game_image_input_picture"
                        />
                    </label>
                    <input type="file"
                           accept="image/*"
                           className="add_new_game_input"
                           id="game_image_input"
                           name="gamePicture"
                           onChange={(e) => {
                               changeTheFileImage();
                               setGameInputs({...gameInputs, src: e.target.files[0]})
                           }}
                           style={{display: 'none'}}
                           required={true}
                    />
                    <hr/>

                    {/* Adding the game title */}
                    <label htmlFor="game_title_input">Choose a title:</label>
                    <input
                        className="add_new_game_input"
                        id="game_title_input"
                        name="gameTitle"
                        onChange={(e) => {
                            setGameInputs({...gameInputs, title: e.target.value})
                        }}
                        minLength={2}
                        maxLength={20}
                        autoFocus={true}
                        // required={true}
                        placeholder="Overwatch"
                    ></input>
                    <hr/>

                    {/* Adding the game description */}
                    <label htmlFor="game_description_textarea">Write a short description:</label>
                    <textarea
                        className="add_new_game_input"
                        id="game_description_textarea"
                        name="gameDescription"
                        onChange={(e) => {
                            setGameInputs({...gameInputs, description: e.target.value})
                        }}
                        minLength="10"
                        maxLength="300"
                        cols="55"
                        rows="3"
                        required={true}
                        placeholder="It was the good game long time ago, now it gets worse..."
                    />
                    <hr/>

                    {/* Choosing the game type */}
                    <label htmlFor="game_type_select">Choose the game type:</label>
                    <select
                        className="add_new_game_input"
                        id="game_type_select"
                        onChange={(e) => {
                            setGameInputs({...gameInputs, type: e.target.value})
                        }}
                        name="gameType"
                        defaultValue={'Not played yet'}
                        required={true}
                    >
                        <option value="Singleplayer">Singleplayer</option>
                        <option value="Multiplayer">Multiplayer</option>
                        <option value="Cooperative">Cooperative</option>
                    </select>
                    <hr/>

                    {/* Adding the game genres */}
                    <label htmlFor="game_genres_input">Write the game genres:</label>
                    <input
                        className="add_new_game_input"
                        id="game_genres_input"
                        onChange={(e) => {
                            setGameInputs({...gameInputs, genres: e.target.value})
                        }}
                        name="gameGenres"
                        minLength={2}
                        maxLength={35}
                        required={true}
                        placeholder="Action, RPG, Shooter"
                    />
                    <hr/>
                    <button className="add_button" type="submit"><span>Add </span></button>
                </form>
            </div>
            {isGameAdded === true && <GameAddedConfirmation OnConfirmButtonClick={ResetTheIsAddedBoolean}/>}
        </>
    )
}