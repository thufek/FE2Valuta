import { FetchCurrencies } from './currencies.js'
import { FetchRates } from './rates.js'

export var selectBas;
export var selectMot;
export var inputBas;
export var outputMot;
var headerBas;
var headerMot;
var buttonSwitch;

GetAllElements();
FetchCurrencies();
SetHeaderValues();
AddAllEventListeners();

function GetAllElements(){
    selectBas = document.getElementById('selectBas');
    selectMot = document.getElementById('selectMot');
    inputBas = document.getElementById('inputBas');
    outputMot = document.getElementById('outputMot');
    headerBas = document.getElementById('headerBas');
    headerMot = document.getElementById('headerMot');
    buttonSwitch = document.getElementById('buttonSwitch');
}

function AddAllEventListeners(){
    selectBas.addEventListener('change', SetHeaderValues);
    selectMot.addEventListener('change', SetHeaderValues);
    inputBas.addEventListener('input', FetchRates);
    buttonSwitch.addEventListener('click', SwitchCurrencies);
}

export function SetHeaderValues(){
    headerBas.innerHTML = selectBas.value;
    headerMot.innerHTML = selectMot.value;

    FetchRates();
}

function SwitchCurrencies(){
    let basVal = selectBas.selectedIndex;
    let motVal = selectMot.selectedIndex;

    selectBas.selectedIndex = motVal;
    selectMot.selectedIndex = basVal;

    SetHeaderValues();
}

