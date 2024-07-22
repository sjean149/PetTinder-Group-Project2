class Card {
    constructor({
        element,
        onDismiss,
        onLike,
        onDislike,
        user_id,
        pet_id
    }) {
        this.onDismiss = onDismiss;
        this.onLike = onLike;
        this.onDislike = onDislike;
        this.user_id = user_id;
        this.element = element;
        this.pet_id = pet_id;
        this.#init();
    }

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

        
        this.element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
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
            this.#sendLikeToServer();
        }
        if (typeof this.onDislike === 'function' && direction === -1) {
            this.onDislike();
        }
    }

    #sendLikeToServer = async () => {
        try {
            const response = await fetch('/api/likes/chatLikes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: this.user_id,
                    pet_id: this.pet_id
                }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to send like to server');
            }

            console.log('Like sent successfully');
        } catch (error) {
            console.error('Error sending like to server:', error);
        }
    }

    #handleMove = (x, y) => {
        this.#offsetX = x - this.#startPoint.x;
        this.#offsetY = y - this.#startPoint.y;
        const rotate = this.#offsetX * 0.1;
        this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
        
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
            this.#dismiss(this.#offsetX > 0 ? 1 : -1);
        }
    }

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
}


const swiper = document.querySelector('#swiper');
const like = document.querySelector('#like');
const dislike = document.querySelector('#dislike');

let currentIndex = 0;

const cardElements = document.querySelectorAll('.card');
console.log('Card elements:', cardElements);
cardElements.forEach((cardElement) => {
    console.log('Initializing card with element:', cardElement);
    const user_id = cardElement.getAttribute('data-user');
    const pet_id = cardElement.getAttribute('data-pet');
    console.log('User ID:', user_id);
    console.log('Pet ID:', pet_id);
    new Card({
        element: cardElement,
        onDismiss: () => {
            currentIndex = (currentIndex + 1) % cardElements.length;
        },
        onLike: () => {
            like.style.animationPlayState = 'running';
            like.classList.toggle('trigger');
        },
        onDislike: () => {
            dislike.style.animationPlayState = 'running';
            dislike.classList.toggle('trigger');
        },
        user_id: user_id,
        pet_id: pet_id
    });
});
