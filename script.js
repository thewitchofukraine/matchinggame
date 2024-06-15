document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'].sort(() => Math.random() - 0.5);
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    const turnIndicator = document.getElementById('turnIndicator');
    let flippedCards = [];
    let scores;
    let turn = 1;

    teamCountSelector.addEventListener('change', () => initializeGame());

    function initializeGame() {
        scores = new Array(parseInt(teamCountSelector.value)).fill(0);
        setupGameBoard();
        setupScoreboard();
        updateTurnIndicator();
    }

    function setupGameBoard() {
        gameBoard.innerHTML = '';
        animals.forEach((animal, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.animal = animal;
            card.textContent = 'A' + (index + 1);
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
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
            });
            switchTurn();
        }
        flippedCards = [];
    }

    function updateScore() {
        scores[turn - 1]++;
        setupScoreboard();
        retainTurn();
    }

    function retainTurn() {
        updateTurnIndicator();
    }

    function switchTurn() {
        turn = turn === scores.length ? 1 : turn + 1;
        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Next turn: Team ${turn}`;
    }

    function setupScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = '';
        scores.forEach((score, index) => {
            const scoreDiv = document.createElement('div');
            scoreDiv.textContent = `Team ${index + 1} Score: ${score}`;
            scoreboard.appendChild(scoreDiv);
        });
    }

    initializeGame();  // Initialize the game initially
});
