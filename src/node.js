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
	FileUtils.writeFile("database.json", JSON.stringify(Global.database.toJSON(), null, '\t'));
	FileUtils.writeFile("config.json", JSON.stringify(simulation.config, null, '\t'));
	FileUtils.writeFile("data.json", JSON.stringify(simulation.data, null, '\t'));

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
