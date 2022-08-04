const cities = {
	2643741: 'London',
	625143: 'Minsk',
	3099434: 'Gdansk',
	703448: 'Kyiv',
}

function selCity() {
	let sel = document.createElement('select');
	sel.id = "selCityId";
	let out = document.querySelector('.out');
	out.before(sel);
	for (let key in cities) {
		let opt = document.createElement('option');
		opt.textContent = cities[key];
		opt.value = key;
		sel.append(opt);
	}
}

const param = {
	"url": "https://api.openweathermap.org/data/2.5/",
	"appid": "735f6b77afaae67d44ef09f2720fad0c",
}

function getWeather() {
	const cityId = document.querySelector('#selCityId').value;
	fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
		.then(weather => {
			return weather.json();
		}).then(showWeather);
}

function showWeather(data) {
	console.log(data);
	document.querySelector('.city').textContent = data.name;
	document.querySelector('.temp').innerHTML = `Temp: ${Math.round(data.main.temp)}&deg;`;
	document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
	document.querySelector('.imgWind').style.transform = `rotate(${data.wind.deg}deg)`;
	document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} m/s`;
	document.querySelector('.pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
	document.querySelector('.description').textContent = data.weather[0].description;
	document.querySelector('.features').innerHTML =
		`<img src = 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`;
}

selCity();
getWeather();
document.querySelector('#selCityId').onchange = getWeather;