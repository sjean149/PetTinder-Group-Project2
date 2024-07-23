const fetchLikedCards = async (user_id) => {
    try {
        const response = await fetch(`/api/likes/dashboard`);
        const data = await response.json();

        if (response.ok) {
            console.log('Liked cards:', data);
            // Process and display the liked cards
            displayLikedCards(data);
        } else {
            console.error('Error fetching liked cards:', data);
        }
    } catch (error) {
        console.error('Error fetching liked cards:', error);
    }
}

const displayLikedCards = (likedCards) => {
    // Implement logic to display liked cards
    likedCards.forEach(like => {
        const pet = like.pet;
        // Example of creating an HTML element for each liked pet
        const cardElement = document.createElement('div');
        cardElement.classList.add('liked-card');
        cardElement.innerHTML = `
            <div class="card-content">
                <h2>${pet.name}</h2>
            </div>
            <img src="${pet.profile_picture}" alt="${pet.name}">
        `;
        document.querySelector('#liked-cards-container').appendChild(cardElement);
    });
}

// Fetch liked cards for the current user
const user_id = req.session.user_id ;
fetchLikedCards(user_id);
