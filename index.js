/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const btnEl = document.getElementById("btn");
const clearbtn = document.getElementById("clear")
const inputEl = document.getElementById("INP");
const lengthEl = document.getElementById("length-text");
const volumeEl = document.getElementById("volume-text");
const massEl = document.getElementById("mass-text");
const preButtonContainer = document.getElementById("pre-button-container");
let inputValue = 20;
let previousValue = [];

clearbtn.addEventListener("dblclick", () =>{
    localStorage.setItem("preValues", "[]")
    previousValue = []
    renderPreviousEntrys(previousValue)
})

btnEl.addEventListener("click", () => {
	if (!inputEl.value) {
		console.error("Invaild Input");
	} else {
		inputValue = inputEl.value;
		localStorage.setItem("input", inputEl.value.toString());
		addPreviousValue(inputValue);
		renderValue(inputValue);
	}
});

/* Renders out current input
 *  PRECONDITION: input must be a number*/
function renderValue(input) {
	lengthEl.textContent = `${input} meters = ${convertMeterToFeets(
		input
	)} feet | ${input} feet = ${convertFeetToMeters(input)} meters`;
	volumeEl.textContent = `${input} liters = ${convertLiterToGallon(
		input
	)} gallons | ${input} gallons = ${convertGallonToLiter(input)} liters`;
	massEl.textContent = `${input} kilos = ${convertKiloToPound(
		input
	)} pounds | ${input} pounds = ${convertPoundToKilo(input)} kilos`;
}

function convertPre(value) {
    console.log(value)
	inputValue = value;
	localStorage.setItem("input", value.toString());
	renderValue(inputValue);
}

/* Renders out the last 5 previous entrys contained in arry
 *  REQUIRES arry being a array with a length <= 5 */
function renderPreviousEntrys(arry) {
	console.log(arry);
	let BtnString = "";
	for (let i = 0; i < arry.length; i++) {
		BtnString += `<button class="pre-button" onclick="convertPre('${arry[i]}')">${arry[i]}</button>`;
	}
	preButtonContainer.innerHTML = BtnString;
}

/* Adds current input as a previous input, adjusts
 *  previousValue arry to always have a length <= 5 */
function addPreviousValue(input) {
	if (previousValue.length < 5) {
		previousValue.push(input);
	} else {
		previousValue.shift();
		previousValue.push(input);
	}
	localStorage.setItem("preValues", JSON.stringify(previousValue));
	renderPreviousEntrys(previousValue);
}

function convertMeterToFeets(value) {
	return (value * 3.281).toFixed(3);
}

function convertFeetToMeters(value) {
	return (value / 3.281).toFixed(3);
}

function convertLiterToGallon(value) {
	return (value * 0.264).toFixed(3);
}

function convertGallonToLiter(value) {
	return (value / 0.264).toFixed(3);
}

function convertKiloToPound(value) {
	return (value * 2.204).toFixed(3);
}

function convertPoundToKilo(value) {
	return (value / 2.204).toFixed(3);
}

/*Resets up the app if anything was saved from previous use*/
if (localStorage.getItem("input").length != 0) {
	const orginalValue = localStorage.getItem("input");
	inputValue = orginalValue;
	inputEl.value = orginalValue;
	renderValue(orginalValue);
	previousValue = JSON.parse(localStorage.getItem("preValues"));
	console.log(localStorage.getItem("preValues"));
	console.log(previousValue);
	renderPreviousEntrys(previousValue);
}
