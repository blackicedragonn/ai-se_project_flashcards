import { decks, getDeckByID } from './decks.js';
import { hexToString, removeColorClasses } from './colorMap.js';
import { renderCarouselView } from './carousel.js';

const deckList = document.querySelector('.decks__list');
const deckTemplate = document.getElementById('deck-template');
const homeSection = document.getElementById('home');
const carouselSection = document.getElementById('carousel');
const notFoundSection = document.getElementById('not-found');
const main = document.querySelector('.page__main-content');

function createDeckElement(deck) {
    const clone = deckTemplate.content.cloneNode(true);
    const deckEl = clone.querySelector('.deck');
    const titleEl = clone.querySelector('.deck__title');
    const countEl = clone.querySelector('.deck__count');
    const linkEl = clone.querySelector('.deck__link');
    const deleteBtn = clone.querySelector('.deck__delete-btn');

    titleEl.textContent = deck.name;
    countEl.textContent = `${deck.cards.length} cards`;

    removeColorClasses(deckEl);
    deckEl.classList.add(`deck_color_${hexToString(deck.color)}`);

    linkEl.href = `#carousel/${deck.id}`;

    deleteBtn.addEventListener('click', e => {
        e.stopImmediatePropagation();
        deckEl.remove();
    });

    return deckEl;
}

function renderAllDecks() {
    deckList.innerHTML = '';
    decks.forEach(deck => {
        deckList.appendChild(createDeckElement(deck));
    });
}

function showSection(view) {
    homeSection.style.display = view === 'home' ? 'block' : 'none';
    carouselSection.style.display = view === 'carousel' ? 'grid' : 'none';
    notFoundSection.style.display = view === 'not-found' ? 'block' : 'none';
    
    main.classList.toggle('page__main-content_type_carousel', view === 'carousel');
}

function handleHashChange() {
    const hash = window.location.hash.slice(1) || 'home';

    if (hash === 'home') {
        showSection('home');
    } else if (hash.startsWith('carousel/')) {
        const id = hash.split('/')[1];
        const deck = getDeckByID(id);
        if (deck) {
            renderCarouselView(deck);
            showSection('carousel');
        } else {
            showSection('not-found');
        }
    } else {
        showSection('not-found');
    }
}

function init() {
    renderAllDecks();
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
}

init();