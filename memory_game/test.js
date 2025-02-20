const cards=[
    '1.jpg','1.jpg',
    '2.jpg','2.jpg',
    '3.jpg','3.jpg',
    '4.jpg','4.jpg',
    '5.jpg','5.jpg',
    '6.jpg','6.jpg',
    '7.jpg','7.jpg',
    '8.jpg','8.jpg',
    '9.jpg','9.jpg',
]

// algorithm to shuffle the cards

function fisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Losujemy indeks między 0 a i
        const j = Math.floor(Math.random() * (i + 1));
        // Zamieniamy elementy na wylosowany indeks i bieżący
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const table = document.querySelector('table');

// function to create the game board
function createBoard(cards) {
    const shuffledCards = fisherYatesShuffle(cards); // Wymieszaj karty
    const cells = document.querySelectorAll('td'); // Pobierz wszystkie komórki tabeli

    // Przypisz wartości kart do komórek
    shuffledCards.forEach((card, index) => {
        const cell = cells[index];
        cell.classList.add('card'); // Dodaj klasę do stylizacji
        cell.dataset.value = card; // Przypisz wartość karty
        cell.addEventListener('click', handleCardClick); // Dodaj obsługę kliknięcia
    });
}

let flippedCards = []; // Przechowuje odkryte karty
let lockBoard = false; // Blokuje planszę podczas animacji

function handleCardClick(event) {
    const clickedCard = event.target;

    // Zablokuj klikanie w trakcie animacji lub na już odkrytą kartę
    if (lockBoard || clickedCard.classList.contains('flipped')) return;

    // Odkryj kartę
    clickedCard.classList.add('flipped');
    clickedCard.style.backgroundImage = `url('/covers/${clickedCard.dataset.value}')`;
    flippedCards.push(clickedCard);

    // Sprawdź, czy dwie karty zostały odkryte
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Jeśli karty są parą
        flippedCards = []; // Wyczyść tablicę odkrytych kart
    } else {
        // Jeśli karty nie są parą
        lockBoard = true; // Zablokuj planszę
        setTimeout(() => {
            card1.classList.remove('flipped'); // Zakryj kartę
            card2.classList.remove('flipped');
            card1.style.backgroundImage = ''; // Usuń obrazek
            card2.style.backgroundImage = '';
            flippedCards = []; // Wyczyść tablicę odkrytych kart
            lockBoard = false; // Odblokuj planszę
        }, 1000); // 1 sekunda na animację
    }
}
document.getElementById('start').addEventListener('click', () => {
    createBoard(cards); // Wypełnij planszę kartami
});
