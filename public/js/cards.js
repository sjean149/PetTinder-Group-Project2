// Card Class
class Card {
    constructor({
        element,
        onDismiss,
        onLike,
        onDislike
    }) {
        this.onDismiss = onDismiss;
        this.onLike = onLike;
        this.onDislike = onDislike;
        this.element = element;
        this.#init();
    }

    // private properties
    #startPoint;
    #offsetX;
    #offsetY;

    #isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    #init = () => {
        if (this.#isTouchDevice()) {
            this.#listenToTouchEvents();
        } else {
            this.#listenToMouseEvents();
        }
    }

    #listenToTouchEvents = () => {
        this.element.addEventListener('touchstart', (e) => {
            const touch = e.changedTouches[0];
            if (!touch) return;
            const { clientX, clientY } = touch;
            this.#startPoint = { x: clientX, y: clientY }
            document.addEventListener('touchmove', this.#handleTouchMove);
            this.element.style.transition = 'transform 0s';
        });

        document.addEventListener('touchend', this.#handleTouchEnd);
        document.addEventListener('cancel', this.#handleTouchEnd);
    }

    #listenToMouseEvents = () => {
        this.element.addEventListener('mousedown', (e) => {
            const { clientX, clientY } = e;
            this.#startPoint = { x: clientX, y: clientY }
            document.addEventListener('mousemove', this.#handleMouseMove);
            this.element.style.transition = 'transform 0s';
        });

        document.addEventListener('mouseup', this.#handleMoveUp);

        // prevent card from being dragged
        this.element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    #handleMove = (x, y) => {
        this.#offsetX = x - this.#startPoint.x;
        this.#offsetY = y - this.#startPoint.y;
        const rotate = this.#offsetX * 0.1;
        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
        // dismiss card
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
            this.#dismiss(this.#offsetX > 0 ? 1 : -1);
        }
    }

    // mouse event handlers
    #handleMouseMove = (e) => {
        e.preventDefault();
        if (!this.#startPoint) return;
        const { clientX, clientY } = e;
        this.#handleMove(clientX, clientY);
    }

    #handleMoveUp = () => {
        this.#startPoint = null;
        document.removeEventListener('mousemove', this.#handleMouseMove);
        this.element.style.transform = '';
    }

    // touch event handlers
    #handleTouchMove = (e) => {
        if (!this.#startPoint) return;
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#handleMove(clientX, clientY);
    }

    #handleTouchEnd = () => {
        this.#startPoint = null;
        document.removeEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transform = '';
    }

    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMoveUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);
        document.removeEventListener('touchend', this.#handleTouchEnd);
        document.removeEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transition = 'transform 1s';
        this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
        }, 1000);
        if (typeof this.onDismiss === 'function') {
            this.onDismiss();
        }
        if (typeof this.onLike === 'function' && direction === 1) {
            this.onLike();
        }
        if (typeof this.onDislike === 'function' && direction === -1) {
            this.onDislike();
        }
    }
}

// DOM
const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

// variables
let cardCount = 0;
const cardElements = document.querySelectorAll('.card');
let currentIndex = 0;

// functions
function initializeCard(cardElement) {
    const card = new Card({
        element: cardElement,
        onDismiss: () => {
            currentIndex = (currentIndex + 1) % cardElements.length;
            loadProfile(currentIndex);
        },
        onLike: () => {
            like.style.animationPlayState = 'running';
            like.classList.toggle('trigger');
        },
        onDislike: () => {
            dislike.style.animationPlayState = 'running';
            dislike.classList.toggle('trigger');
        }
    });
    swiper.appendChild(card.element);
    cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

function loadProfile(index) {
    swiper.innerHTML = ''; // Clear previous card
    initializeCard(cardElements[index]);
}

function handlePageClick(event) {
    const pageWidth = window.innerWidth;
    const clickX = event.clientX;

    if (clickX > pageWidth / 2) {
        // Like profile
        like.classList.toggle('trigger');
    } else {
        // Dislike profile
        dislike.classList.toggle('trigger');
    }
}

// Event Listener
document.addEventListener('click', handlePageClick);

// Initialize the first profile
loadProfile(currentIndex);
