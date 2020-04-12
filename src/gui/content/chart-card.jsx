import React from "react";
import "chart.js";
import "hammerjs";
import "chartjs-plugin-zoom";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {GuiState} from "../gui-state";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {Global} from "../../global";
import {FileUtils} from "../../utils/file-utils";

/**
 * Chart to draw graphs into the GUI.
 */
class ChartCard extends React.Component
{
	constructor(props)
	{
		super(props);
		this.canvas = React.createRef();
		this.chart = null;
	}

	/**
	 * Called when the component is mounted to the interface.
	 */
	componentDidMount()
	{
		this.createChart();
	}

	/**
	 * Create chart.js object and attach to the canvas element.
	 */
	createChart()
	{
		var context = this.canvas.current.getContext("2d");

		this.chart = new Chart(context, {
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
					xAxes: [{
						type: "time",
						time: {
							displayFormats: {
								quarter: "MMM YYYY"
							}
						},
						scaleLabel: {
							display: true,
							labelString: "Date"
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
	}

	/**
	 * Draw data into the chart component by its date.
	 *
	 * @param data
	 * @param title
	 * @param append
	 */
	drawCovidCases(data, title, append)
	{
		var timeseries = {
			infected: [],
			recovered: [],
			deaths: [],
			suspects: []
		};

		for (var i = 0; i < data.length; i++) {
			timeseries.infected.push({t: data[i].date, y: data[i].infected});
			timeseries.recovered.push({t: data[i].date, y: data[i].recovered});
			timeseries.deaths.push({t: data[i].date, y: data[i].deaths});
			timeseries.suspects.push({t: data[i].date, y: data[i].suspects});
		}

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

		this.chart.data.datasets = append ? this.chart.data.datasets.concat(datasets) : datasets;
		this.chart.update();
	}

	/**
	 * Export data of the currently selected country.
	 */
	exportData()
	{
		if(GuiState.country === null)
		{
			alert("No country selected");
			return;
		}

		var data = Global.database.getCovidCases(GuiState.country.code);
		FileUtils.writeFile("data.json", data);
	};


	render()
	{
		return (
			<Card style={{margin:"20px"}}>
				<div style={{margin:"20px"}}>
					<Typography variant="h6">Chart</Typography>
					<div style={{width: "calc(100% - 20px)", height: "500px"}}>
						<canvas ref={this.canvas}/>
					</div>
					<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button onClick={() => {this.exportData();}}>Export</Button>
					</ButtonGroup>
				</div>
			</Card>

		);
	}
}

export {ChartCard};
