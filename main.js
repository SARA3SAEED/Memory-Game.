let letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;







document.addEventListener('DOMContentLoaded', () => {


    let gameBoard = document.getElementById('game-board');
    let restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', restartGame);

/*----------------------------------------------------------------*/

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }



/*----------------------------------------------------------------*/


    function createBoard() {
        let shuffledletters = shuffle(letters.slice());
        shuffledletters.forEach(letter => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.letter = letter;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }


/*----------------------------------------------------------------*/


    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.letter;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }



/*----------------------------------------------------------------*/


    function checkForMatch() {
        if (firstCard.dataset.letter === secondCard.dataset.letter) {
            disableCards();
            resetBoard();
        } else {
            unflipCards();
        }
    }


/*----------------------------------------------------------------*/

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }


/*----------------------------------------------------------------*/


    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }


/*----------------------------------------------------------------*/


    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }



    function restartGame() {
        gameBoard.innerHTML = '';
        createBoard();
    }

    createBoard();


});
