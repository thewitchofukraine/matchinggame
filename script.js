document.addEventListener("DOMContentLoaded", () => {
    let grid = document.getElementById("gameGrid");
    let scoreboard = document.getElementById("scoreboard");
    let currentPlayer = 1;
    let firstCard = null, secondCard = null;
    let scores = [];
    let totalTeams = 2;

    function startGame(teams) {
        totalTeams = teams;
        initializeGame();
    }

    function initializeGame() {
        grid.innerHTML = '';
        scoreboard.innerHTML = '';
        scores = new Array(totalTeams).fill(0);
        currentPlayer = 1;

        const animalNames = ["Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Monkey", "Zebra", "Panda"];
        const pairs = [...animalNames, ...animalNames];
        shuffleArray(pairs);

        pairs.forEach((animal, index) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.animal = animal;
            card.dataset.index = index;
            card.innerText = "?";
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        });

        for (let i = 1; i <= totalTeams; i++) {
            let teamDiv = document.createElement("div");
            teamDiv.classList.add("team");
            teamDiv.id = `team${i}`;
            teamDiv.innerHTML = `<h2>Team ${i}: <span id="score${i}">0</span></h2>`;
            scoreboard.appendChild(teamDiv);
        }

        document.getElementById("currentTeam").innerText = `Team 1`;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard() {
        if (this.classList.contains("flipped") || this.classList.contains("matched")) return;
        if (firstCard && secondCard) return;

        this.classList.add("flipped");
        this.innerText = this.dataset.animal;

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            updateScore();
            resetTurn();
        } else {
            setTimeout(unflipCards, 1000);
        }
    }

    function unflipCards() {
        firstCard.innerText = "?";
        secondCard.innerText = "?";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
        switchPlayer();
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer % totalTeams) + 1;
        document.getElementById("currentTeam").innerText = `Team ${currentPlayer}`;
    }

    function updateScore() {
        scores[currentPlayer - 1]++;
        document.getElementById(`score${currentPlayer}`).innerText = scores[currentPlayer - 1];
    }

    window.startGame = startGame;
});
