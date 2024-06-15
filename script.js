document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    let flippedCards = [];
    let turn = 1; // Start with Team 1
    let scores = [];

    teamCountSelector.addEventListener('change', function() {
        setupTeams(parseInt(this.value));
    });

    function setupTeams(teamCount) {
        scores = new Array(teamCount).fill(0);
        turn = 1; // Reset turn to Team 1 on team change
        createScoreboard();
        createBoard();
    }

    function createScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = ''; // Clear previous team data
        for (let i = 0; i < scores.length; i++) {
            let teamScore = document.createElement('div');
            teamScore.textContent = `Team ${i + 1} Score: ${scores[i]}`;
            scoreboard.appendChild(teamScore);
        }
        document.getElementById('turn').textContent = `Current Turn: Team ${turn}`;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = ''; // Clear previous board
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
        retainTurn();
    }

    function retainTurn() {
        // Teams retain turn if they match
    }

    function switchTurn() {
        turn = (turn % scores.length) + 1;
        document.getElementById('turn').textContent = `Current Turn: Team ${turn}`;
    }

    setupTeams(parseInt(teamCountSelector.value)); // Initialize game with default team count
});
