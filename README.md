# GameList
This website represents a library that contains different types of videogames. It has two pages: "Browse", where you can see a list of all games on the website and add them to your own library; "Library", where are all your saved games displayed.
It is a good choice for people who want to track their progress in games or found some new games to play.

## Get started
The website is available on the following [link](https://ivanopolus21.github.io/GameList/).

If you want to clone on download the project, in the project directory, you can run:

### `npm start`
! You must have npm installed on your machine!
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Aim of the Project
I chose the theme of my project because I really into videogames and I wanted to create some application that will be useful.
I started the project to complete the subject KAJ in my university, but I will use it as actually library for my videogames.
Everyone can use it too (check "Get started" for more info).

## Approach
I had some experience with HTML5, CSS3 and Javascript before, so only thing I needed to learn was React.
I started with learning by a [React.dev documentation](https://react.dev/).
Then I created some components and rendered them along with CSS.
After the navigation buttons and page itself, I managed to create list of the games in "Browse", then the GameWindow.
Later the "Library" page was updated with saved games and AddNewGameWindow was added to the "Browse" page.
The last thing to add was deletion of the games that were added.
Some fixes and adjustments were made after the deployment and now the project is working fine.

## Technologies
My webpage is a Single Page Application (SPA) that I created using React.
The technologies I have used:
- **HTML5** - as the main page.
- **CSS3** - for page styles.
- **JS** - interactions.
- **React** - the main technology that was used for rendering the whole page and its' components.
- **localStorage** - used to store games' state in users' library, individually for every user.
- **IndexedDB** - used to store new games added by users, individually for every user.
- **File API** - reads user image uploads.

## Functionality
On the webpage you can:
- Browse the list of the games on "Browse" page
- Click on a game to discover more info
- Choose a state of the game and save it to your library
- Add new game to the page
- Delete previously added game from the page
- Observe list of games on "Library" page those have state that you have chosen for them
- Filter games on "Library" page by their state
- Change a game state or delete the game from your library
- Find more information about me (as an owner)

All images that were used in the project are not my own property and all rights belonge to their original owners.
