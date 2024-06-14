document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    let grid = document.getElementById("gameGrid");
    let scoreboard = document.getElementById("scoreboard");
    let currentPlayer = 1;
    let firstCard = null, secondCard = null;
    let scores = [];
    let totalTeams = 2;

    function startGame(teams) {
        console.log("Starting game with " + teams + " teams");
        totalTeams = teams;
        initializeGame();
    }

    function initializeGame() {
        console.log("Initializing game");

        grid.innerHTML = '';
        scoreboard.innerHTML = '';
        scores = new Array(totalTeams).fill(0);
        currentPlayer = 1;

        const animalNames = ["Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Monkey", "Zebra", "Panda", "Koala", "Leopard"];
        const pairs = [...animalNames, ...animalNames];
        shuffleArray(pairs);

        const labels = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "E4"];

        for (let i = 0; i < 20; i++) {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.animal = pairs[i];
            card.dataset.index = i;
            card.innerText = labels[i];
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }

        for (let i = 1; i <= totalTeams; i++) {
            let teamDiv = document.createElement("div");
            teamDiv.classList.add("team");
            teamDiv.id = `team${i}`;
            teamDiv.innerHTML = `<span>Team ${i}: <span id="score${i}">0</span></span>`;
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
        firstCard.innerText = getCardLabel(firstCard.dataset.index);
        secondCard.innerText = getCardLabel(secondCard.dataset.index);
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

    function getCardLabel(index) {
        const labels = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "E4"];
        return labels[index];
    }

    window.startGame = startGame;
});

