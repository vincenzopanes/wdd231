async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        displayMembers(data);
    } catch (error) {
        console.error("Error loading member data:", error);
    }
}

getMembers()

function displayMembers(members) {
    const container = document.querySelector("#members");

    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");
        const name = document.createElement("h2");
        name.textContent = member.name;
        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;
        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = ("Visit Website");
        website.target = ("_blank")
        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = member.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";
        const description = document.createElement("p");
        description.textContent = member.description;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(description);

        container.appendChild(card);
    });
}

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const container = document.querySelector("#members");

gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
})

listButton.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
})