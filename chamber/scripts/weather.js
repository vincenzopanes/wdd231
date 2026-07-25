const key = "3eb99e6a72189b3aac14ec60dadce03c";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=-36.84&lon=-73.10&units=metric&appid=${key}`;

async function getWeather() {
    
    const response = await fetch(url);
    const data = await response.json();

    document.querySelector("#current-temp").textContent = 
    `${data.list[0].main.temp.toFixed(1)} °C`;

    document.querySelector("#weather-desc").textContent =
    data.list[0].weather[0].description;

    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "";

    let daysShown = 0;

    for(let i=0; i<data.list.length; i++){
        const item = data.list[i];

        if(item.dt_txt.includes("12:00:00")){

            const card = document.createElement("p");
            const date = new Date(item.dt_txt);

            card.textContent = 
            `${date.toLocaleDateString("en-US", {weekday: "long"})}: ${item.main.temp.toFixed(0)}°C`;

            forecast.append(card);

            daysShown++;

            if(daysShown === 3) break;
        }
    }
}

getWeather();