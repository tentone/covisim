import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import {Country} from "./country.js";
import {CovidData} from "./covid-data.js"
import {Simulation} from "./simulation/simulation";

window.initialize = function() {
	var countries = Country.loadList();
	console.log(countries);

	var pt = CovidData.getDSSGPT();
	console.log(pt);

	var ita = CovidData.getPCMDPCITA();
	console.log(ita);

	var simulation = new Simulation();
	simulation.date = new Date(pt[0].date);
	simulation.reset();

	for(var i = 0; i < 500; i++)
	{
		simulation.step();
	}

	var ratio = countries.map.get("PRT").population / simulation.population;
	for(var i = 0; i < simulation.data.length; i++)
	{
		simulation.data[i].multiplyScalar(ratio);
	}

	var chart = createChart();
	drawCovidData(chart, pt, "PT", false);
	drawCovidData(chart, simulation.data, "Simulation", true);
	// drawCovidData(chart, ita, "ITA", true);
};

function createChart() {
	var canvas = document.createElement("canvas");
	canvas.width = 1000;
	canvas.height = 800;
	document.body.appendChild(canvas);

	var context = canvas.getContext("2d");

	var chart = new Chart(context, {
		type: "line",
		data: {
			datasets: []
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			pan: {
				enabled: true,
				mode: "x",
				speed: 100,
				threshold: 100
			},
			zoom: {
				enabled: true,
				drag: false,
				mode: "x",
				limits: {
					max: 10,
					min: 0.5
				}
			},
			title: {
				display: false,
			},
			tooltips: {
				mode: "index",
				intersect: false,
			},
			hover: {
				mode: "nearest",
				intersect: true
			},
			scales: {
				xAxes: [ {
					type: "time",
					time: {
						displayFormats: {
							quarter: "MMM YYYY"
						}
					},
					scaleLabel: {
						display: true,
						labelString: "Time"
					}
				}],
				yAxes:
					[{
						scaleLabel: {
							display: true,
							labelString: "People"
						}
					}]
			}
		}
	});

	return chart;
}

function drawCovidData(chart, data, title, append) {
	let datasets = [];

	let infected = [];
	let recovered = [];
	let deaths = [];
	let suspects = [];

	for (let i = 0; i < data.length; i++) {
		infected.push({t: data[i].date, y: data[i].infected});
		recovered.push({t: data[i].date, y: data[i].recovered});
		deaths.push({t: data[i].date, y: data[i].deaths});
		suspects.push({t: data[i].date, y: data[i].suspects});
	}


	datasets.push({
		label: title + " - Suspects",
		backgroundColor: "rgba(47,180,254, 0.3)",
		borderColor: "rgb(47,180,254)",
		fill: true,
		data: suspects
	});

	datasets.push({
		label: title + " - Infected",
		backgroundColor: "rgba(254, 123, 5, 0.3)",
		borderColor: "rgba(254, 123, 5, 1)",
		fill: true,
		data: infected
	});

	datasets.push({
		label: title + " - Deaths",
		backgroundColor: "rgba(254,0,34, 0.3)",
		borderColor: "rgb(254,0,34)",
		fill: true,
		data: deaths
	});


	datasets.push({
		label: title + " - Recovered",
		backgroundColor: "rgba(50,254,0, 0.3)",
		borderColor: "rgb(50,254,0)",
		fill: true,
		data: recovered
	});

	chart.data.datasets = append ? chart.data.datasets.concat(datasets) : datasets;
	chart.update();
}


