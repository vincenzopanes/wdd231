async function getSpotlight() {
    
    const response = await fetch("data/members.json");
    const data = await response.json();

    displaySpotlights(data);

}

getSpotlight()


function displaySpotlights(members){
    
    const premium = members.filter(member =>
        member.membershipLevel >= 2);

    premium.sort(()=>Math.random()-0.5);

    const selected = premium.slice(0,3);

    const container = document.querySelector("#spotlight-container");
    container.innerHTML = "";

    selected.forEach(member => {
        const card = document.createElement("section");

        card.classList.add("spotlight");
        card.innerHTML= `
        <h3>${member.name}</h3>

        <img src="images/${member.image}"alt="${member.name} logo" loading="lazy" width="120" height="120">

        <p>${member.phone}</p>
        <p>${member.address}</p>

        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>

        <p>${member.membershipLevel===3?"Gold":"Silver"} Member</p>
        `;

        container.append(card);
    })
}