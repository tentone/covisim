import "chart.js";
import {Country} from "country";
import {Data} from "data"

window.initialize = function() {
	var countries = Country.loadList();

	console.log(countries);

	Data.getDSSGPT();
	Data.getPCMDPCITA();

	/*
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var chart = new Chart(context, {
		type: 'doughnut',
		data: {},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});*/
}


