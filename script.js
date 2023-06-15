const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-CT-WEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players/`);
        const players = await response.json();
        return players.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`)
        const player = await response.json();
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: 'DELETE'
        })
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {
    try {
        const players = await fetchAllPlayers();
        players.forEach((player) => {
            const newPlayerCard = renderSinglePlayer(player);
            playerContainer.appendChild(newPlayerCard);
        })
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
    
};
function renderSinglePlayer(player) {
    const PlayerCard = document.createElement("div");
    PlayerCard.className = "player-card";

    const newPlayerName = document.createElement("h1");
    newPlayerName.innerHTML = player.name;
    PlayerCard.appendChild(newPlayerName);

    const newPlayerImage = document.createElement('img');
    newPlayerImage.className = "player-image";
    newPlayerImage.src = player.imageUrl;
    PlayerCard.appendChild(newPlayerImage);

    const showDetailsButton = document.createElement("Button");
    showDetailsButton.innerHTML = "See Details";
    PlayerCard.appendChild(showDetailsButton);

    showDetailsButton.addEventListener(("click"), async (event) => {
        const showDetailsById = player.id;
        await fetchSinglePlayer(showDetailsById);
    })

    const deleteButton = document.createElement("Button");
    deleteButton.innerHTML = "Delete";
    PlayerCard.appendChild(deleteButton);

    deleteButton.addEventListener(("click"),async (event) => {
        //console.log(player)
        const deletePlayerById = player.id;
        //console.log(deletePlayerById)
        await removePlayer(deletePlayerById);
    })

    return PlayerCard;
}

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderNewPlayerForm();
}

init();