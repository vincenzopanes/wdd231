const url =
"https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();

  console.table(data.prophets); // temporary testing of data response

  displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the document
    const card = document.createElement("section");
    const fullName = document.createElement("h2"); // fill in the blank
    const portrait = document.createElement("img");
    const birthDate = document.createElement("p");
    const birthPlace = document.createElement("p");

    // Add the prophet's name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    //Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`); // fill in the blank
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    birthDate.textContent = `Born: ${prophet.birthdate}`;
    birthPlace.textContent = `Born in: ${prophet.birthplace}`;

    //Append the section(card) with the created elements
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    cards.appendChild(card);

  });
}