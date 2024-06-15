document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    let flippedCards = [];
    let turn = 1; // Start with Team 1
    let scores = [];

    teamCountSelector.addEventListener('change', setupTeams);

    function setupTeams() {
        let teamCount = parseInt(teamCountSelector.value);
        scores = Array(teamCount).fill(0);
        updateScoreboard();
    }

    function createScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = '';
        scores.forEach((score, index) => {
            let teamScore = document.createElement('div');
            teamScore.textContent = `Team ${index + 1} Score: ${score}`;
            scoreboard.appendChild(teamScore);
        });
    }

    function updateScoreboard() {
        scores.forEach((score, index) => {
            document.querySelectorAll('#scoreboard div')[index].textContent = `Team ${index + 1} Score: ${score}`;
        });
    }

    function createBoard() {
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
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = 'A' + (Array.from(gameBoard.children).indexOf(card1) + 1);
            card2.textContent = 'A' + (Array.from(gameBoard.children).indexOf(card2) + 1);
            switchTurn();
        }
        flippedCards = [];
    }

    function updateScore() {
        scores[turn - 1]++;
        updateScoreboard();
        retainTurn();
    }

    function retainTurn() {
        // Teams retain turn if they match
    }

    function switchTurn() {
        turn = turn % scores.length + 1;
        document.getElementById('turn').textContent = 'Current Turn: Team ' + turn;
    }

    setupTeams();
    createBoard();
});
