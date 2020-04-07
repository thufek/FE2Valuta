import { selectBas, selectMot, SetHeaderValues } from "./main.js";

//Dessa är startvalutorna
const standardBasVal = "SEK";
const standardMotVal = "EUR";

//Här hämtas alla valutor
export function FetchCurrencies() {
  let url =
    "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=c804dc7f9b1746048402900363b5fb83";

  if (localStorage.getItem("Currencies") === null) {
    fetch(url)
      .then(function (response) {
        if (response.status !== 200) {
          console.warn("Response error: " + response.status);

          return;
        }
        response.json().then(function (data) {
          PopulateSelectLists(data);
          CreateLocalStorage(data);
        });
      })
      .catch(function (err) {
        console.error("Fetch error: ", err);
      });
  } else {
    PopulateSelectLists(JSON.parse(localStorage.getItem("Currencies")));
  }
  SetHeaderValues();
}

//Här kastar vi in alla hämtade valutor i båda selectlistorna
function PopulateSelectLists(data) {
  for (let key in data) {
    let optionBas = document.createElement("option");
    optionBas.text = "(" + key + ") " + data[key];
    optionBas.value = key;
    let optionMot = document.createElement("option");
    optionMot.text = "(" + key + ") " + data[key];
    optionMot.value = key;

    if (optionBas.value == standardBasVal) {
      optionBas.selected = true;
    }
    if (optionMot.value == standardMotVal) {
      optionMot.selected = true;
    }

    selectBas.add(optionBas);
    selectMot.add(optionMot);
  }
}

//Local storage för alla hämtade valutor
function CreateLocalStorage(data) {
  localStorage.setItem("Currencies", JSON.stringify(data));
}
