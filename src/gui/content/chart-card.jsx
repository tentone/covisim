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
 * Enum with possible values for the chart X axis mode.
 */
const ChartTimeAxis = {
	DATE: 0,
	DAY: 1
};

/**
 * Enum with possible values for the chart X axis mode.
 */
const ChartCasesAxis = {
	ABSOLUTE: 0,
	DIFF: 1
};

/**
 * Chart to draw graphs into the GUI.
 */
class ChartCard extends React.Component
{
	constructor(props)
	{
		super(props);

		/**
		 * How to draw the time axis. If by day it considers the day since the data beginning.
		 *
		 * If by date is uses the absolute date of each data entry.
		 */
		this.timeAxis = ChartTimeAxis.DAY;

		/**
		 * How to draw the cases axis. Can be absolute value or daily diff.
		 */
		this.casesAxis = ChartCasesAxis.ABSOLUTE;

		/**
		 * Canvas DOM element reference.
		 */
		this.canvas = React.createRef();

		/**
		 * ChartJS object to draw the charts into the canvas.
		 */
		this.chart = null;
	}

	/**
	 * Called when the component is mounted to the interface.
	 */
	componentDidMount()
	{
		this.createChart();
		this.setTimeAxisMode(this.timeAxis);
	}

	/**
	 * Create chart.js object and attach to the canvas element.
	 */
	createChart()
	{
		let context = this.canvas.current.getContext("2d");

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
					xAxes: [],
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

	setCasesAxisMode(casesAxis)
	{
		this.casesAxis = casesAxis;
		this.chart.update();
	}

	/**
	 * Set the mode of the X axis, can be date or day.
	 */
	setTimeAxisMode(timeAxis)
	{
		this.timeAxis = timeAxis;

		if(this.timeAxis === ChartTimeAxis.DATE)
		{
			this.chart.options.scales.xAxes = [{
				type: "time",
				time: {
					round: "day",
					displayFormats: {
						quarter: "MMM YYYY"
					}
				},
				scaleLabel: {
					display: true,
					labelString: "Date"
				}
			}];
		}
		else if(this.timeAxis === ChartTimeAxis.DAY)
		{
			this.chart.options.scales.xAxes = [{
				type: "linear",
				scaleLabel: {
					display: true,
					labelString: "Day"
				},
				ticks: {
					stepSize: 1.0
				}
			}];
		}

		this.chart.update();
	}

	/**
	 * Clear all data from the chart card.
	 */
	clear()
	{
		this.chart.data.datasets = [];
		this.chart.update();
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
		// Colors and title of the individual graphs
		let fields = {
			suspects: {
				title: "Suspects",
				backgroundColor: "rgba(254,238,0, 0.3)",
				borderColor: "rgb(254,238,0)",
			},
			cases: {
				title: "Cases",
				backgroundColor: "rgba(47,180,254, 0.3)",
				borderColor: "rgb(47,180,254)",
			},
			infected: {
				title: "Infected",
				backgroundColor: "rgba(254, 123, 5, 0.3)",
				borderColor: "rgba(254, 123, 5, 1)",
			},
			deaths: {
				title: "Deaths",
				backgroundColor: "rgba(254,0,34, 0.3)",
				borderColor: "rgb(254,0,34)",
			},
			recovered: {
				title: "Recovered",
				backgroundColor: "rgba(50,254,0, 0.3)",
				borderColor: "rgb(50,254,0)",
			},
		};

		// Create time series object based on the available fields (not null)
		let timeseries = {};
		if(data.length > 0)
		{
			for(var i in fields)
			{
				if(data[0][i] !== null)
				{
					timeseries[i] = [];
				}
			}
		}

		// Fill time series data from covid data
		if(this.casesAxis === ChartCasesAxis.ABSOLUTE)
		{
			for (let i = 0; i < data.length; i++)
			{
				for(let j in timeseries)
				{
					if(this.timeAxis === ChartTimeAxis.DATE)
					{
						timeseries[j].push({t: data[i].date, y: data[i][j]});
					}
					else if(this.timeAxis === ChartTimeAxis.DAY)
					{
						timeseries[j].push({x: data[i].day, y: data[i][j]});
					}
				}
			}
		}
		else if(this.casesAxis === ChartCasesAxis.DIFF)
		{
			for (let i = 1; i < data.length; i++)
			{
				for(let j in timeseries)
				{
					if(this.timeAxis === ChartTimeAxis.DATE)
					{
						timeseries[j].push({t: data[i].date, y: data[i][j] - data[i-1][j]});
					}
					else if(this.timeAxis === ChartTimeAxis.DAY)
					{
						timeseries[j].push({x: data[i].day, y: data[i][j] - data[i-1][j]});
					}
				}
			}
		}

		// Create ChartJS data sets object to display on chart
		let datasets = [];
		for(let j in timeseries)
		{
			datasets.push({
				label: title + " [" + fields[j].title + "]",
				backgroundColor: fields[j].backgroundColor,
				borderColor: fields[j].borderColor,
				fill: true,
				data: timeseries[j]
			});
		}

		this.chart.data.datasets = append ? this.chart.data.datasets.concat(datasets) : datasets;
		this.chart.update();
	}

	/**
	 * Export data of the currently selected countries into a JSON file.
	 */
	exportData()
	{
		if(GuiState.countries.length === 0)
		{
			alert("No country selected. Must select a country first.");
			return;
		}

		let data = [];
		for(let i = 0; i < GuiState.countries.length; i++)
		{
			let cases = Global.database.getCovidCases(GuiState.countries[i].code);
			if(cases !== null)
			{
				data.push({
					code: GuiState.countries[i].code,
					data: cases
				});
			}
		}

		FileUtils.writeFile("data.json", data);
	};


	/**
	 * Reset the zoom to fit the graph
	 */
	resetZoom()
	{
		this.chart.resetZoom();
	}

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
						<Button onClick={() => {this.resetZoom();}}>Reset Zoom</Button>
					</ButtonGroup>
				</div>
			</Card>

		);
	}
}

export {ChartCard, ChartTimeAxis, ChartCasesAxis};
