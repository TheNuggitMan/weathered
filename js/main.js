const APIKEY = '18d6f6f3a5e45dffa154c78a35423a47'
const celcius = '℃';
const fahrenheit = '℉';
/* 
Make the GeoCall
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

Make the weather call
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
*/
function getLocation() {
	let location = document.getElementById('location').value;
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=3&appid=${APIKEY}`)
	.then(function(res) {
		return res.json();
	})
	.then(function(data) {
		getWeather(data);
	})
}

function getWeather(data){
	fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKEY}`)
	.then(function(res){
		return res.json();
	})
	.then(function(weather){
		console.log(weather.current)
		console.log(weather.current.temp)
		appendData(weather);
	})	
}

function appendData(data) {
	const locationName = document.getElementById('locationName');
	const locationCountry = document.getElementById('locationCountry');
	const searchBox = document.getElementById('searchBox');
	const queryHeading = document.createElement('h2');
	queryHeading.textContent = `Current weather: ${data.current.temp}${celcius}`;
	searchBox.parentNode.appendChild(queryHeading);
	
	for (i=0;i<data.length;i++) {
		let resultsContainer = document.createElement('div');
		resultsContainer.classList.add('resultsContainer');
		
		let resultList = document.createElement('p');
		searchBox.appendChild(resultsContainer);
		resultsContainer.appendChild(resultList);
		resultList.classList.add('results');

		resultList.textContent = `${data[i].name}, ${data[i].country}`;
		resultList.addEventListener('click', function(e){
			getWeather(e.target.innerText,data)
		});
	}
}

// function getWeather(location){
// 	getLocation(location);
// }

document.addEventListener('DOMContentLoaded', function() {

	document.getElementById('searchBtn').addEventListener('click', getLocation);


});