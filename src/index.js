import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import ReactDOM from "react-dom";
import React from "react";
import {Screen} from "./gui/screen";
import {Global} from "./global";

ReactDOM.render(React.createElement(Screen), document.getElementById("container"));
Global.loadData();

/*
function createButton() {
	var button = document.createElement("button");
	button.onclick = runSimulation;
	button.innerText = "Run";
	document.body.appendChild(button);
}

function runSimulation() {
	var simulation = new Simulation();
	simulation.config.date = new Date(2020, 1, 25);
	simulation.reset();
	console.log("Simulation reset ok.");

	var last = performance.now();
	for (var i = 0; i < 10; i++) {
		simulation.step();

		// Log time to console
		var time = performance.now();
		console.log("Simulation step " + i + " finished (" + (time - last) + "ms)");
		last = time;
	}

	drawCovidData(chart, database.getCovidCases("PRT"), "PRT", false);
	drawCovidData(chart, simulation.data, "Simulation", true);
}
*/
