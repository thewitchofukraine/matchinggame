document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    const turnIndicator = document.getElementById('turnIndicator');
    let flippedCards = [];
    let turn = 1;
    let scores = [];

    teamCountSelector.addEventListener('change', initializeGame);

    function initializeGame() {
        let teamCount = parseInt(teamCountSelector.value);
        scores = new Array(teamCount).fill(0);
        setupScoreboard();
        setupGameBoard();
        updateTurnIndicator();
    }

    function setupScoreboard() {
        let scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = '';
        scores.forEach((score, index) => {
            let scoreDiv = document.createElement('div');
            scoreDiv.className = `score team${index + 1}`;
            scoreDiv.textContent = `Team ${index + 1} Score: ${score}`;
            scoreboard.appendChild(scoreDiv);
        });
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Next turn: Team ${turn}`;
    }

    function setupGameBoard() {
        gameBoard.innerHTML = '';
        shuffle(animals);
        animals.forEach((animal, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.animal = animal;
            card.textContent = `A${index + 1}`;
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
        const [card1, card2] = flippedCards;
        if (card1.dataset.animal === card2.dataset.animal) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            updateScore();
            retainTurn();
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.textContent = `A${Array.from(gameBoard.children).indexOf(card) + 1}`;
            });
            switchTurn();
        }
        flippedCards = [];
    }

    function updateScore() {
        scores[turn - 1]++;
        document.querySelector(`.team${turn} .score`).textContent = `Team ${turn} Score: ${scores[turn - 1]}`;
        updateTurnIndicator();
    }

    function retainTurn() {
        // Optional: logic to retain the turn if the team scores
    }

    function switchTurn() {
        turn = (turn % scores.length) + 1;
        updateTurnIndicator();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    initializeGame(); // Initialize the game with default values
});
