import {CovidData} from "../../database/covid-data";

function createChart() {
	var canvas = document.createElement("canvas");
	canvas.width = 1400;
	canvas.height = 800;
	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";
	document.body.appendChild(canvas);

	var context = canvas.getContext("2d");

	var chart = new Chart(context, {
		type: "line",
		data: {
			datasets: []
		},
		options: {
			responsive: false,
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
				xAxes: [{
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
	var timeseries = CovidData.generateTimeseries(data);

	let datasets = [
		{
			label: title + " - Suspects",
			backgroundColor: "rgba(47,180,254, 0.3)",
			borderColor: "rgb(47,180,254)",
			fill: true,
			data: timeseries.suspects
		},
		{
			label: title + " - Infected",
			backgroundColor: "rgba(254, 123, 5, 0.3)",
			borderColor: "rgba(254, 123, 5, 1)",
			fill: true,
			data: timeseries.infected
		},
		{
			label: title + " - Deaths",
			backgroundColor: "rgba(254,0,34, 0.3)",
			borderColor: "rgb(254,0,34)",
			fill: true,
			data: timeseries.deaths
		},
		{
			label: title + " - Recovered",
			backgroundColor: "rgba(50,254,0, 0.3)",
			borderColor: "rgb(50,254,0)",
			fill: true,
			data: timeseries.recovered
		}
	];

	chart.data.datasets = append ? chart.data.datasets.concat(datasets) : datasets;
	chart.update();
}
