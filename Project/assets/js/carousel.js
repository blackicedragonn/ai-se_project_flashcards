import { hexToString, removeColorClasses } from './colorMap.js';

let currentIndex = 0;
let showingQuestion = true;
let currentDeck = null;

let titleEl, cardEl, textEl, leftBtn, rightBtn, flipBtn;

function getCarouselTitleString(deck, index) {
    return `${deck.name} · ${index + 1} / ${deck.cards.length} cards`;
}

function updateCardDisplay() {
    if (!currentDeck) return;

    const card = currentDeck.cards[currentIndex];

    if (showingQuestion) {
        textEl.textContent = card.question;
        cardEl.classList.remove('carousel__card_color_white');
    } else {
        textEl.textContent = card.answer;
        cardEl.classList.add('carousel__card_color_white');
    }

    titleEl.textContent = getCarouselTitleString(currentDeck, currentIndex);

    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === currentDeck.cards.length - 1;
    leftBtn.classList.toggle('carousel__btn_disabled', currentIndex === 0);
    rightBtn.classList.toggle('carousel__btn_disabled', currentIndex === currentDeck.cards.length - 1);
}

function addEventListeners() {
    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            showingQuestion = true;
            updateCardDisplay();
        }
    });

    rightBtn.addEventListener('click', () => {
        if (currentIndex < currentDeck.cards.length - 1) {
            currentIndex++;
            showingQuestion = true;
            updateCardDisplay();
        }
    });

    flipBtn.addEventListener('click', () => {
        showingQuestion = !showingQuestion;
        updateCardDisplay();
    });
}

export function renderCarouselView(deck) {
    currentDeck = deck;
    currentIndex = 0;
    showingQuestion = true;

    if (!titleEl) {
        titleEl = document.querySelector('.carousel__title');
        cardEl = document.querySelector('.carousel__card');
        textEl = document.querySelector('.carousel__card-text');
        leftBtn = document.querySelector('.carousel__btn_type_left');
        rightBtn = document.querySelector('.carousel__btn_type_right');
        flipBtn = document.querySelector('.carousel__btn_type_flip');

        addEventListeners();
    }

    removeColorClasses(cardEl);
    cardEl.classList.add(`carousel__card_color_${hexToString(deck.color)}`);
    updateCardDisplay();
}