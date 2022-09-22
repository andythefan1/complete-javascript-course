'use strict';

const countriesBtn = document.querySelector('.btn-country');
const geolocateBtn = document.querySelector('.btn-geolocate');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://restcountries.com/v2/name/portugal

function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
}

function renderCountry(data, className) {
  const html = `
    <article class="country ${className ? className : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// AJAX using callback calls
function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  // asynchronous call
  request.send();

  // callback to only run after response is received
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
  });
}

// getCountry('USA');

// Getting country data using fetch API and promises
function fetchCountryData(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      // <Promise>.json() is an asynchronous operation
      return response.json();
    })
    .then(response => {
      const [data] = response;
      renderCountry(data);
    });
}

fetchCountryData('France');

// chaining promises (vs. callback hell)
function fetchCountryDataChained(country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      // <Promise>.json() is an asynchronous operation
      return response.json();
    })
    .then(response => {
      const [data] = response;
      renderCountry(data);

      console.log(data);
      const neighbors = data.borders;
      if (neighbors) {
        return fetch(`https://restcountries.com/v2/alpha/${neighbors[0]}`);
      } else {
        return;
      }
    })
    .then(response => response.json())
    .then(response => renderCountry(response, 'neighbour'))
    .catch(err => {
      renderError('something went wrong', err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

countriesBtn.addEventListener('click', () =>
  fetchCountryDataChained('Colombia')
);

// wrapping callback-based async call into a promise - geolocation API
// async operation w/ callback function
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);

// wrap callback function into promise
const getPositionPromise = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentLocation(
      position => resolve(position),
      err => reject(err)
    );
  });
};

// simplified wrap callback function into promise
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// ASYNC and AWAIT
const whereAmI = async function () {
  // geolocation
  const position = await getPosition();
  const { latitude: lat, longitude: long } = position.coords;

  // reverse geo-coding
  const geoResponse = await fetch(
    `https://geocode.xyz/${lat},${long}?geoit=json`
  );
  const geoData = await geoResponse.json();
  const country = geoData.country;

  // country data
  const response = await fetch(`https://restcountries.com/v2/name/${country}`);
  const responseJson = await response.json();
  console.log(responseJson);
  renderCountry(responseJson[0]);
};

geolocateBtn.addEventListener('click', () => whereAmI('USA'));

// PROMISES IN PARALLEL

const getJSON = async function (url) {
  const response = await fetch(url);
  return await response.json();
};

//
const getThreeCountries = async function (country1, country2, country3) {
  try {
    const [data1] = await getJSON(
      `https://restcountries.com/v2/name/${country1}`
    );
    const [data2] = await getJSON(
      `https://restcountries.com/v2/name/${country2}`
    );
    const [data3] = await getJSON(
      `https://restcountries.com/v2/name/${country3}`
    );
  } catch (error) {
    console.error(error);
  }
};

getThreeCountries('USA', 'China', 'Vietnam');

// Promse.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(error => console.error(error));
