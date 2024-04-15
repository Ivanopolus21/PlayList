import './AddNewGameWindow.css';
import {useState} from "react";
import games from "../../GamesData";
import closeButton from "../../assets/img/icons8-close.svg";
import boop from "../../assets/sounds/[Overwatch] Sombra's Boop Voice Line.mp3"
import {GameAddedConfirmation} from "./GameAddedConfirmation/GameAddedConfirmation";

export function AddNewGameWindow({displayType, OnCloseClick, OnAddNewGameClick}) {
    /**
     * useState hook that represents a state of the image that represents whether the user
     * added the picture for a new game or not yet.
     */
    const [imageForPicture, setImageForPicture] = useState('notAdded');
    /**
     * useStater hook that represents SVG changes using JS.
     */
    const [svgPath, setSvgPath] = useState('M9 17L15 13 M9 12 L15 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19');
    const [svgStroke, setSvgStroke] = useState('red');
    const [isGameAdded, setIsGameAdded] = useState(false);
    const [gameInputs, setGameInputs] = useState({id: 0, src: "", title: "", description: "", type: "", genres: ""});

    /**
     * Function that adds a new game to the IndexedDB store.
     */
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
        rewriteSvg();
        setImageForPicture('added');
    }

    function resetTheFileImage() {
        setSvgPath('M9 17L15 13 M9 12 L15 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19');
        setSvgStroke("red");
        setImageForPicture('notAdded');
    }

    function resetInputs() {
        resetTheFileImage();
        document.querySelector('#add_new_game_container').reset();
    }

    function resetTheIsAddedBoolean() {
        setIsGameAdded(false);
        OnCloseClick();
    }

    function playAudio() {
        const boopSound = new Audio(boop);
        boopSound.play();
    }

    function rewriteSvg() {
        const theSvg = document.querySelector("#game_image_input_picture");
        theSvg.setAttribute('d', "M9 15L11 17L15 13M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19");
        theSvg.setAttribute("stroke", "white");
        setSvgPath(theSvg.getAttribute('d'));
        setSvgStroke(theSvg.getAttribute("stroke"));
        // console.log(document.getElementById('game_image_input_picture').getAttribute('d'));
        // console.log(document.getElementById('game_image_input_picture').getAttribute('stroke'));
        // console.log(svgPath)
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

        if (img === "") {
            alert("Image field is required!");
            return false;
        }
        if (title === "" || desc === "" || genres === "") {
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
                        {/*<img src={imageForPicture === 'notAdded' ? documentImg : addedDocumentImg}*/}
                        {/*     alt="Document search img"*/}
                        {/*     className="add_new_game_input"*/}
                        {/*     id="game_image_input_picture"*/}
                        {/*/>*/}
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg"
                             id="game_image_input_picture"
                             className="add_new_game_input"
                        >
                            <path
                                d={svgPath}
                                // d="M9 17L15 13 M9 12 L15 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                                // stroke="red"
                                stroke={svgStroke}
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        {/*{imageForPicture !== 'notAdded' && <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"*/}
                        {/*                                        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*                                        id="game_image_input_picture"*/}
                        {/*                                        className="add_new_game_input"*/}
                        {/*> <path*/}
                        {/*    d="M9 15L11 17L15 13M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"*/}
                        {/*    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>*/}
                        {/*</svg> }*/}

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
                        maxLength={50}
                        autoFocus={true}
                        required={true}
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
            {isGameAdded === true && <GameAddedConfirmation OnConfirmButtonClick={resetTheIsAddedBoolean}/>}
        </>
    )
}