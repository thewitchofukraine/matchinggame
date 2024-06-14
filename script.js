document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-content">
                <div class="front">${value}</div>
                <div class="back"></div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, value));
        return card;
    }

    function flipCard(card, value) {
        if (lockBoard || card === firstCard) return;

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
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.card.removeEventListener('click', flipCard);
        secondCard.card.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function initGame() {
        shuffle(cardValues);
        cardValues.forEach(value => {
            const card = createCard(value);
            gameBoard.appendChild(card);
        });
    }

    initGame();
});
