const api = {
  key: "1bb198625abbc63ca8fd16dca2ee3922",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

async function setQuery(e) {
  if (e.keyCode === 13) {
    await getData(e.target.value);
  }
}

async function getData(query) {
  try {
    const response = await fetch(
      `${api.baseURL}weather/?q=${query}&units=metric&APPID=${api.key}`
    );
    if (response) {
      let json = await response.json();
      displayData(json);
    }
  } catch (err) {
    alert(` The entered city, ${searchBox.value} is not found!`);
  }
}

function displayData(data) {
  let city = document.querySelector(".location .city");
  city.innerHTML = `${data.name}, ${data.sys.country}`;

  const date = document.querySelector(".location .date");
  date.innerHTML = getDate(new Date());

  const temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(data.main.temp)} <span>°c</span>`;

  const state = document.querySelector(".current .weather");
  state.innerHTML = `${data.weather[0].main}`;

  const hilow = document.querySelector(".current .hi-low");
  hilow.innerHTML = `${Math.round(data.main.temp_min)} °c / ${Math.round(
    data.main.temp_max
  )} °c`;
}

function getDate(d) {
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = daysNames[d.getDay()];
  const date = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
