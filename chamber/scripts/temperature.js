const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

// step 2
const myKey = "65ac781c0125b4a914b6d6162c01949e"
const myLat = "-16.50393004187901"
const myLong = "-68.13123610706539"

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`

// step 3
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// display the json
function displayResults(data) {
   myTown.innerHTML = data.name
   myDescription.innerHTML = data.weather[0].description
   myTemperature.innerHTML = `${data.main.temp}&deg;C`
   const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconsrc)
    myGraphic.setAttribute('alt', data.weather[0].description)
}
// start the proses.


apiFetch();