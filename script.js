document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const teamCountSelector = document.getElementById('teamCount');
    let scores = [];
    let turn = 1;

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
        let turnIndicator = document.getElementById('turnIndicator');
        turnIndicator.textContent = `Next turn: Team ${turn + 1}`;
    }

    function setupGameBoard() {
        // Example setup, implement actual game logic
    }

    initializeGame(); // Initialize the game with default values
});
