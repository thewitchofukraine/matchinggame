document.addEventListener('DOMContentLoaded', () => {
    const animals = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Wolf', 'Deer', 'Wolf', 'Deer', 'Fox', 'Monkey', 'Fox', 'Monkey', 'Zebra', 'Giraffe', 'Zebra', 'Giraffe'];
    const gameBoard = document.getElementById('gameBoard');
    let flippedCards = [];
    let turn = 1; // 1 for Team 1, 2 for Team 2
    let score1 = 0, score2 = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
            retainTurn();
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
        if (turn === 1) {
            score1++;
            document.getElementById('score1').textContent = score1;
        } else {
            score2++;
            document.getElementById('score2').textContent = score2;
        }
    }

    function retainTurn() {
        // Teams retain turn if they match
    }

    function switchTurn() {
        turn = turn === 1 ? 2 : 1;
        document.getElementById('turn').textContent = turn === 1 ? 'Team 1' : 'Team 2';
    }

    createBoard();
});
