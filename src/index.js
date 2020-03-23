import "chart.js";
import {FileUtils} from  "utils/file-utils.js";
import CSV from "csv-js"

document.addEventListener("DOMContentLoaded", function(event) {
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var options = {
		responsive: true,
		maintainAspectRatio: false
	};

	var data = {
		labels: ['Suspects', 'Infected', 'Deaths'],
		datasets: [{
			data: [0, 0, 0, 0, 0, 0, 0],
			backgroundColor: [
				'rgba(0, 153, 0, 0.2)',
				'rgba(204, 102, 0, 0.2)',
				'rgba(255, 20, 86, 0.2)',
			],
			borderColor: [
				'rgba(0, 153, 0,1)',
				'rgba(204, 102, 0, 1)',
				'rgba(255, 20, 86, 1)',
			]
		}]
	};

	var chart = new Chart(context, {
		type: 'doughnut',
		data: data,
		options: options
	});


});

// Read covid 19 data from DSSG-PT
function readDSSGPTData() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
}
