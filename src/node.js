import {Global} from "./global";
import {FileUtils} from "./utils/file-utils";
import {Simulation} from "./simulation/simulation";

console.log("Covid 19 simulation");

Global.loadData(function()
{
	console.log(" - Country data loaded");
	console.log(" - Starting simulation");

	var simulation = new Simulation();
	simulation.reset();
	for(var i = 0; i < 100; i++)
	{
		simulation.step();

		if(i % 10 === 0)
		{
			console.log(" - Step " + i + "done");
		}
	}

	console.log(" - Finished simulation");
	console.log(" - Saving result into file");

	FileUtils.writeFile("database.json", JSON.stringify(Global.database, null, '\t'));
	FileUtils.writeFile("config.json", JSON.stringify(simulation.config, null, '\t'));
	FileUtils.writeFile("data.json", JSON.stringify(simulation.data, null, '\t'));

	console.log(" - Finished");
});
