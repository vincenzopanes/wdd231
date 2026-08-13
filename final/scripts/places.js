const placesContainer = document.querySelector("#places-container");
const modal = document.querySelector("#place-modal");
const modalDetails = document.querySelector("#modal-details");
const closeModal = document.querySelector("#close-modal");

// Load saved favorites from Local Storage
let favorites = JSON.parse(
    localStorage.getItem("cobquecuraFavorites")
) || [];


async function loadPlaces() {
    try {
        const response = await fetch("data/places.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const places = await response.json();

        displayPlaces(places);

    } catch (error) {
        console.error("Unable to load places:", error);

        placesContainer.innerHTML = `
            <p class="error">
                Sorry, the places could not be loaded at this time.
            </p>
        `;
    }
}


function displayPlaces(places) {

    placesContainer.innerHTML = places.map(place => `
        <article class="place-card">

            <img
                src="${place.image}"
                alt="${place.name}"
                width="400"
                height="250"
                loading="lazy"
            >

            <div class="place-content">

                <p class="place-category">
                    ${place.category}
                </p>

                <h3>${place.name}</h3>

                <p>
                    <strong>Location:</strong>
                    ${place.location}
                </p>

                <p>
                    ${place.description}
                </p>

                <div class="card-actions">

                    <button
                        class="details-button"
                        data-id="${place.id}"
                    >
                        View Details
                    </button>

                    <button
                        class="favorite-button"
                        data-id="${place.id}"
                        aria-label="Add ${place.name} to favorites"
                    >
                        ☆ Favorite
                    </button>

                </div>

            </div>

        </article>
    `).join("");

    addDetailsEvents(places);
}


function addDetailsEvents(places) {

    // Details buttons
    const buttons = document.querySelectorAll(".details-button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const placeId = Number(button.dataset.id);

            const selectedPlace = places.find(
                place => place.id === placeId
            );

            if (selectedPlace) {
                showPlaceDetails(selectedPlace);
            }

        });

    });


    // Favorite buttons
    const favoriteButtons =
        document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach(button => {

        const placeId = Number(button.dataset.id);

        // Show the correct state when the page loads
        updateFavoriteButton(button, placeId);

        button.addEventListener("click", () => {

            toggleFavorite(placeId);

            updateFavoriteButton(button, placeId);

        });

    });
}


function toggleFavorite(placeId) {

    if (favorites.includes(placeId)) {

        // Remove from favorites
        favorites = favorites.filter(
            id => id !== placeId
        );

    } else {

        // Add to favorites
        favorites.push(placeId);

    }

    // Save favorites in Local Storage
    localStorage.setItem(
        "cobquecuraFavorites",
        JSON.stringify(favorites)
    );
}


function updateFavoriteButton(button, placeId) {

    if (favorites.includes(placeId)) {

        button.textContent = "★ Favorite";
        button.classList.add("favorite-active");

    } else {

        button.textContent = "☆ Favorite";
        button.classList.remove("favorite-active");

    }
}


function showPlaceDetails(place) {

    modalDetails.innerHTML = `
        <img
            src="${place.image}"
            alt="${place.name}"
            width="600"
            height="400"
        >

        <p class="place-category">
            ${place.category}
        </p>

        <h2>${place.name}</h2>

        <p>
            <strong>Location:</strong>
            ${place.location}
        </p>

        <p>${place.description}</p>
    `;

    modal.showModal();
}


closeModal.addEventListener("click", () => {
    modal.close();
});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.close();
    }

});


loadPlaces();


// Footer dates
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}