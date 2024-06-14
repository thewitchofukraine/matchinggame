document.addEventListener("DOMContentLoaded", () => {
    const animalNames = ["Lion", "Tiger", "Bear", "Elephant", "Giraffe", "Monkey", "Zebra", "Panda"];
    const pairs = [...animalNames, ...animalNames];
    let grid = document.getElementById("gameGrid");
    let score1 = 0, score2 = 0;
    let currentPlayer = 1;
    let firstCard = null, secondCard = null;

    shuffleArray(pairs);

    pairs.forEach((animal, index) => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.animal = animal;
        card.dataset.index = index;
        card.innerText = index + 1;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });

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
        firstCard.innerText = firstCard.dataset.index;
        secondCard.innerText = secondCard.dataset.index;
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
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById("currentTeam").innerText = `Team ${currentPlayer}`;
    }

    function updateScore() {
        if (currentPlayer === 1) {
            score1++;
            document.getElementById("score1").innerText = score1;
        } else {
            score2++;
            document.getElementById("score2").innerText = score2;
        }
    }
});
