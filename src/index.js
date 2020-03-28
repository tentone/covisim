import "chart.js";
import {Country} from "./country.js";
import {CovidData} from "./covid-data.js"

window.initialize = function() {
	var countries = Country.loadList();
	console.log(countries);

	var pt = CovidData.getDSSGPT();
	console.log(pt);

	var ita = CovidData.getPCMDPCITA();
	console.log(ita);

	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var chart = new Chart(context, {
		type: 'line',
		data: {},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
}


