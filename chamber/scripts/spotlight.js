async function getSpotlight() {
    
    const response = await fetch("data/members.json");
    const data = await response.json();

    displaySpotlights(data.members);

}

getSpotlight()

const premium = members.filter(members =>
    members.membership >= 2);

premium.sort(()=>Math.random()-0.5);

const selected = premium.slice(0,3);

selected.forEach(member => {
    const card = document.createElement("section");

    card.classList.add("spotlight");
    card.innerHTML=`
    <h3>${member.name}</h3>

    <img src="images/${member.image}"alt="${member.name} logo"loading="lazy">

    <p>${member.phone}</p>
    <p>${member.address}</p>

    <a href="${member.website}">Visit Website</a>

    <p>${member.membership===3?"Gold":"Silver"} Member</p>
    `;

    container.append(card);
})