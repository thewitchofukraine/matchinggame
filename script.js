document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    const turnIndicator = document.getElementById('turnIndicator');
    let flippedCards = [];
    let turn = 1; // Start with Team 1
    let scores = [];

    teamCountSelector.addEventListener('change', () => setupTeams(parseInt(teamCountSelector.value)));

    function setupTeams(teamCount) {
        scores = new Array(teamCount).fill(0);
        createScoreboard();
        createBoard();
        updateTurnIndicator();
    }

    function createScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = '';
        for (let i = 0; i < scores.length; i++) {
            let teamScore = document.createElement('div');
            teamScore.textContent = `Team ${i + 1} Score: ${scores[i]}`;
            scoreboard.appendChild(teamScore);
        }
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Next turn: Team ${turn}`;
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        shuffle(animals);
        animals.forEach((animal, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.animal = animal;
            card.textContent = 'A' + (index + 1);
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            card.textContent = card.dataset.animal;
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.animal === card2.dataset.animal) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            updateScore();
            flippedCards = []; // Clear flipped cards array after match
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.textContent = 'A' + (Array.from(gameBoard.children).indexOf(card) + 1);
            });
            flippedCards = []; // Clear flipped cards array if no match
            switchTurn();
        }
    }

    function updateScore() {
        scores[turn - 1]++;
        document.querySelectorAll('#scoreboard div')[turn - 1].textContent = `Team ${turn} Score: ${scores[turn - 1]}`;
        updateTurnIndicator();
    }

    function switchTurn() {
        turn = (turn % scores.length) + 1;
        updateTurnIndicator();
    }

    setupTeams(parseInt(teamCountSelector.value)); // Initialize the game
});
