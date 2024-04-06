import games from "../GamesData";

/**
 * Function for removing games from the IndexedDB.
 * @param {int} id - The id of the game.
 */
export function DbRemoveTest(id) {
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

    request.onsuccess = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;

        const transaction = db.transaction("games", "readwrite");

        transaction.oncomplete = (event) => {
            console.log("All remove complete! ");
        };

        transaction.onerror = (event) => {
            console.log("oops");
        };

        const gamesStore = transaction.objectStore("games");
        //Delete from IndexedDB
        gamesStore.delete(id);
        //Delete the choice from localStorage
        localStorage.setItem(id, '');
        //Delete from "games" array
        games.splice(id, 1);

        request.onsuccess = (event) => {
            console.log("Test game " + id + " was removed!")
        }
        request.onerror = (event) => {
            console.log("ERRRRORR");
        }
    }
}

/**
 * Function for updating games IDs from the IndexedDB when game with smaller ID was deleted.
 * @param {int} id - The id of the game.
 */
export function DbUpdateTest(id) {
    const dbName = "New_Games_DB";
    const request = indexedDB.open(dbName, 3);

    request.onerror = (event) => {
        console.error("You cannot update a game without allowing the website to use IndexedDB.");
    };

    request.onupgradeneeded = (event) => {
        let db = request.result;

        if (!db.objectStoreNames.contains('games')) { // if there's no "games" store
            db.createObjectStore('games', { keyPath: 'id'}); // create it
        }
    };

    request.onsuccess = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;

        const transaction = db.transaction("games", "readwrite");

        transaction.oncomplete = (event) => {
            console.log("All update complete! ");
        };

        transaction.onerror = (event) => {
            console.log("oops");
        };

        const gamesStore = transaction.objectStore("games");
        const count = gamesStore.count();
        count.onsuccess = () => {

            for (let i = 1; i <= count.result; i++) {
                const gameStoreIdRequest = gamesStore.get(id + i);
                gameStoreIdRequest.onsuccess = () => {

                    let counter = i - 1;
                    const gameToUpdateID = gameStoreIdRequest.result;
                    if (gameToUpdateID !== undefined) {
                        let gameBackup = {
                            id: id + counter,
                            title: gameToUpdateID.title,
                            src: gameToUpdateID.src,
                            description: gameToUpdateID.description,
                            genres: gameToUpdateID.genres,
                            type: gameToUpdateID.type
                        }
                        games.push(gameBackup);
                        gameToUpdateID.id = id + counter;

                        const updateIdRequest = gamesStore.put(gameToUpdateID);
                        gamesStore.delete(id + i);
                        games.splice(id, 1);

                        updateIdRequest.onsuccess = () => {
                            console.log("YAY! ID UPDATE FOR " + (id + i) +  " SUCCEED!")
                        }
                        updateIdRequest.onerror = () => {
                            console.log("Oh no! The request failed for ID: " + (id + i) + " that tried to change for ID: " + id)
                        }
                    }
                }
                gameStoreIdRequest.onerror = () => {
                    console.log("Error gameStore ID request");
                }
            }
        }
    }
}