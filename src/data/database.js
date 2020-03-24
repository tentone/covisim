import {FileUtils} from "../utils/file-utils";

function Database()
{
	// Index countries by their code
	this.countries = new Map();
}

Database.load = function () {
	var database = new Database();

	var coutries = FileUtils.readFile("countries.csv", true);
	console.log(coutries);

	return database;
};

export {Database};
