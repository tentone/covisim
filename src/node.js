import {Global} from "./global";
import {FileUtils} from "./utils/file-utils";
import {Simulation} from "./simulation/simulation";

console.log("Covid 19 simulation");

const steps = 300;

Global.loadData(function()
{
	console.log(" - Database loaded");

	runSimulation();

	console.log(" - Saving results into file");
	FileUtils.writeFile("database.json", Global.database.toJSON());
	FileUtils.writeFile("simulation.json", simulation.toJSON());

	console.log(" - Finished");
});

function runSimulation()
{
	console.log(" - Starting simulation");
	var simulation = new Simulation();
	simulation.reset();

	for(var i = 0; i < steps; i++)
	{
		simulation.step();

		if(i % 10 === 0)
		{
			console.log(" - Step " + i + "done");
		}
	}
	console.log(" - Finished simulation");
}
