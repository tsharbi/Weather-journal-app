/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const userInput = document.getElementById("feelings");

// window.addEventListener("load", (e) => {
//   fetch("http://localhost:8000/user")
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// });
// const dataw = {
//   temperature: weatherData.main.temp,
//   date: newDate,
//   userresponse: userInput.value,
// };

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=c0845cd405946b72546105a79370c0b3";

// add event listener

document.getElementById("generate").addEventListener("click", actionMethod);

function actionMethod(e) {
  e.preventDefault();
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apikey)
    .then(function (data) {
      console.log(data);
      postData("/add", {
        date: newDate,
        temp: data.main.temp,
        content: feelings,
      });
    })
    .then(function () {
      updateUI();
    });
}

const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    // document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}`;
    document.getElementById("content").innerHTML = `I feel: ${allData.content}`; // or userInput.value
  } catch (error) {
    console.log("error", error);
  }
};
