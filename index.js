"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokes = "https://icanhazdadjoke.com/";
const options = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
};
const chuckNorris = "https://api.chucknorris.io/jokes/random";
const btn = document.querySelector("button");
const result = document.querySelector("#jokis");
//CONSOLE REVISANDO QUE RECOGE DATOS CORRECTAMENTE
/*const getTheJoke = () =>
  fetch(jokes, options)
    .then((response) => response.json())
    .then((jokes) => {
      console.log(jokes);
      console.log(jokes.joke);
    });
*/
//MOSTRAR EN HTML ÚNICAMENTE EL JOKE
/*fetch(jokes, options)
  .then((response) => response.json())
  .then((jokes) => {
    console.log(jokes.joke);
  });*/
//API JOKES
const getTheJokeAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(jokes, options)
            .then((response) => response.json())
            .then((data) => {
            // console.log(jokes);
            //console.log(jokes.joke);
            result.innerHTML = `
        <p>${data.joke}</p>
       <div> 
     <img src="./blob/score1.svg" alt="1" width="50px"  class="btn" name="score1" id="scores"/>
     <img src="./blob/score2.svg" alt="2" width="50px"  class="btn" name="score2" id="scores"/>
     <img src="./blob/score3.svg" alt="3" width="50px"  class="btn" name="score3" id="scores"/>
       </div> `;
        });
    }
    catch (error) {
        console.log(error);
        alert("ERROR");
    }
});
//API NORRIS
const getTheJokeAsyncNorris = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(chuckNorris, options)
            .then((response) => response.json())
            .then((norris) => {
            // console.log(jokes);
            //console.log(jokes.joke);
            result.innerHTML = `<div>
              <p>${norris.value}</p>
             <div> 
             <img src="./blob/score1.svg" alt="1" width="50px"  class="btn" name="score1" id="scores"/>
             <img src="./blob/score2.svg" alt="2" width="50px"  class="btn" name="score2" id="scores"/>
             <img src="./blob/score3.svg" alt="3" width="50px"  class="btn" name="score3" id="scores"/>
             </div>
             </div> `;
        });
    }
    catch (error) {
        console.log(error);
        alert("ERROR");
    }
});
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", getTheJokeAsync);
const reportJokes = [];
const d = new Date();
class UI {
    saveScore(element) {
        var _a, _b, _c;
        if (element.name == "score1") {
            const nowJoke = (_a = document.querySelector("p")) === null || _a === void 0 ? void 0 : _a.outerText;
            const nowJokeF = nowJoke;
            reportJokes.push({
                joke: nowJokeF,
                score: 1,
                date: d.toISOString(),
            });
        }
        if (element.name == "score2") {
            const nowJoke = (_b = document.querySelector("p")) === null || _b === void 0 ? void 0 : _b.outerText;
            const nowJokeF = nowJoke;
            reportJokes.push({
                joke: nowJokeF,
                score: 2,
                date: d.toISOString(),
            });
        }
        if (element.name == "score3") {
            const nowJoke = (_c = document.querySelector("p")) === null || _c === void 0 ? void 0 : _c.outerText;
            const nowJokeF = nowJoke;
            reportJokes.push({
                joke: nowJokeF,
                score: 3,
                date: d.toISOString(),
            });
        }
    }
    // cambiamos de api porque se han acumulado demasiados chistes malos
    //SOLO SALEN LOS CHISTES DE LA PRIMERA API
    //SI SE ACUMULAN MÁS DE 10 PUNTUACIONES CON VALOR 1, o mas de 20 con valor 2,
    // AUTOMÁTICAMENTE PASA A LA DE CHUCK NORRIS
    getScores() {
        let scoresAcc = reportJokes.map((x) => x.score);
        let scoresLow = scoresAcc.filter((number) => (number = 1));
        let scoresMedium = scoresAcc.filter((number) => (number = 2));
        if (scoresLow.length > 10) {
            btn === null || btn === void 0 ? void 0 : btn.removeEventListener("click", getTheJokeAsync);
            btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", getTheJokeAsyncNorris);
        }
        console.log(scoresLow.length);
        if (scoresMedium.length > 20) {
            btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", getTheJokeAsyncNorris);
        }
    }
}
//ejecutamos las funciones y la interfaz
console.log(reportJokes);
document.addEventListener("click", function (e) {
    const ui = new UI();
    ui.saveScore(e.target);
    ui.getScores();
    e.preventDefault();
});
//tiempo !!
window.addEventListener("load", () => {
    let lon;
    let lat;
    let tempValue = document.querySelector("#tempValue");
    //let tempDescription = document.querySelector("#tempDescription");
    let ubi = document.querySelector("#ubi");
    let iconoAnimado = document.querySelector("#icon");
    // let windVel = document.querySelector("#windVel");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lang=es&units=metric&lat=${lat}&lon=${lon}&appid=7a769f40e25c4c5ab2bbc6b1b0103cf9`;
            fetch(url)
                .then((response) => {
                return response.json();
            })
                .then((data) => {
                let temp = Math.round(data.main.temp);
                // let desc: string = data.weather[0].description.toUpperCase();
                tempValue.innerHTML = `<h1>${temp} Cº</h1> `;
                // tempDescription!.innerHTML = `<h1>${desc}</h1>`;
                ubi.innerHTML = `<h1>${data.name}</h1>`;
                //  windVel!.innerHTML = `<h1>${data.wind.speed}</h1> m/s`;
                switch (data.weather[0].main) {
                    case "Thunderstorm":
                        iconoAnimado.innerHTML = `<img src="animated/thunder.svg"></img>`;
                        console.log("TORMENTA");
                        break;
                    case "Drizzle":
                        iconoAnimado.innerHTML = `<img src="animated/rainy-2.svg"></img>`;
                        console.log("LLOVIZNA");
                        break;
                    case "Rain":
                        iconoAnimado.innerHTML = `<img src="animated/rainy-7.svg"></img>`;
                        console.log("LLUVIA");
                        break;
                    case "Snow":
                        iconoAnimado.innerHTML = `<img src="animated/snowy-6.svg"></img>`;
                        console.log("NIEVE");
                        break;
                    case "Clear":
                        iconoAnimado.innerHTML = `<img src="animated/day.svg"></img>`;
                        console.log("LIMPIO");
                        break;
                    case "Atmosphere":
                        iconoAnimado.innerHTML = `<img src="animated/weather.svg"></img>`;
                        console.log("ATMOSFERA");
                        break;
                    case "Clouds":
                        iconoAnimado.innerHTML = `<img src="animated/cloudy-day-1.svg"></img>`;
                        console.log("NUBES");
                        break;
                    default:
                        iconoAnimado.innerHTML = `<img src="animated/cloudy-day-1.svg"></img>`;
                        console.log("por defecto");
                }
            });
        });
    }
});
