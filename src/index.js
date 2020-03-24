import "chart.js";
import {FileUtils} from  "utils/file-utils.js";
import CSV from "csv-js";
import {Database} from "./data/database";

window.initialize = function() {
	var database = Database.load();

	readDSSGPTData();
	readPCMDPCITA();

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

// Read covid 19 data from DSSG-PT
function readDSSGPTData() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
}

// Italia Covid 19 data
function readPCMDPCITA() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
}
