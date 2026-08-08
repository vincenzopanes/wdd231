const url = "data/discover.json";
const container = document.querySelector(".discover-grid");
const visitMessage = document.getElementById("visit-message");

// Fetch the discover data from the JSON file
async function fetchDiscoverData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not load discover.json");
        }
        const places = await response.json();
        displayPlaces(places);
    } catch (error) {
        console.error(error);
    }
}

// Display the places in the discover grid
function displayPlaces(places) {
    places.forEach(place => {
        const card = document.createElement("article");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const address = document.createElement("p");
        address.classList.add("address");
        address.textContent = `Address: ${place.address}`;

        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.alt;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("a");
        button.href = place.url;
        button.textContent = "Learn More";
        button.classList.add("button");
        button.target = "_blank";
        button.rel = "noopener";

        card.appendChild(title);
        card.appendChild(address);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(button);

        container.appendChild(card);
    });
}

// localStorage message for returning visitors
const today = new Date().toISOString().split("T")[0];
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Take a look at our featured places.";
} else {
    const daysBetween = Math.floor((new Date(today) - new Date(lastVisit)) / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
        visitMessage.textContent = "Welcome back! You last visited today.";
    } else if (daysBetween === 1) {
        visitMessage.textContent = "Welcome back! You last visited yesterday.";
    } else {
        visitMessage.textContent = `Welcome back! You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", today);

fetchDiscoverData();