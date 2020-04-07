import { selectBas, selectMot, inputBas, outputMot } from "./main.js";

//Här hämtas växlingskurser
export function FetchRates() {
  let url =
    "https://openexchangerates.org/api/latest.json?app_id=c804dc7f9b1746048402900363b5fb83&prettyprint=false&show_alternative=false";

  if (sessionStorage.getItem("Rates") === null) {
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          console.warn("Response error: " + response.status);
          return;
        }

        response.json().then(function (data) {
          CalculateRate(data);
          CreateSessionStorage(data);
        });
      })
      .catch(function (err) {
        console.error("Fetch error: ", err);
      });
  } else {
    CalculateRate(JSON.parse(sessionStorage.getItem("Rates")));
  }
}

//Valutaomvandlings-räknaren
function CalculateRate(data) {
  let basVal = data.rates[selectBas.value];
  let motVal = data.rates[selectMot.value];

  let totalt = (motVal * inputBas.value) / basVal;

  outputMot.value = totalt.toLocaleString();
}

//Session storage för växlingskurser
function CreateSessionStorage(data) {
  sessionStorage.setItem("Rates", JSON.stringify(data));
}
