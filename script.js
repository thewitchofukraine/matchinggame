document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const team1ScoreElem = document.getElementById('team1Score');
    const team2ScoreElem = document.getElementById('team2Score');
    const currentTurnElem = document.getElementById('currentTurn');
    const animals = ['Cat', 'Dog', 'Fox', 'Cow', 'Pig', 'Bat', 'Hen', 'Ant'];
    const cardValues = animals.concat(animals);
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let currentTurn = 'Team 1';
    let team1Score = 0;
    let team2Score = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(value, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content">
                <div class="front">${index + 1}</div>
                <div class="back">${value}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, value));
        return card;
    }

    function flipCard(card, value) {
        if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        if (!firstCard) {
            firstCard = { card, value };
        } else {
            secondCard = { card, value };
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const isMatch = firstCard.value === secondCard.value;
        isMatch ? handleMatch() : unflipCards();
    }

    function handleMatch() {
        firstCard.card.classList.add('matched');
        secondCard.card.classList.add('matched');

        if (currentTurn === 'Team 1') {
            team1Score++;
            team1ScoreElem.textContent = team1Score;
        } else {
            team2Score++;
            team2ScoreElem.textContent = team2Score;
        }

        resetBoard(false);
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetBoard(true);
        }, 1500);
    }

    function resetBoard(switchTurn) {
        [firstCard, secondCard, lockBoard] = [null, null, false];
        if (switchTurn) {
            currentTurn = currentTurn === 'Team 1' ? 'Team 2' : 'Team 1';
            currentTurnElem.textContent = currentTurn;
        }
    }

    function initGame() {
        shuffle(cardValues);
        cardValues.forEach((value, index) => {
            const card = createCard(value, index);
            gameBoard.appendChild(card);
        });
    }

    initGame();
});
