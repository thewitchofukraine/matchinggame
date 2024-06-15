document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    const turnIndicator = document.getElementById('turnIndicator');
    let flippedCards = [];
    let turn = 1;
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
        scores.forEach((score, index) => {
            let teamScore = document.createElement('div');
            teamScore.textContent = `Team ${index + 1} Score: ${score}`;
            teamScore.className = `team${index + 1}`; // Assign class based on team number
            scoreboard.appendChild(teamScore);
        });
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Next turn: Team ${turn}`;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
        if (!card.classList.contains('flipped') && flippedCards.length < 2) {
            card.classList.add('flipped');
            card.textContent = card.dataset.animal;
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    function checkForMatch() {
        if (flippedCards[0].dataset.animal === flippedCards[1].dataset.animal) {
            flippedCards.forEach(card => card.classList.add('matched'));
            updateScore();
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.textContent = 'A' + (Array.from(gameBoard.children).indexOf(card) + 1);
            });
            switchTurn();
        }
        flippedCards = [];
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

    setupTeams(parseInt(teamCountSelector.value));
});
