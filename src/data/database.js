import {FileUtils} from "../utils/file-utils";

function Database()
{
	this.countries = new Map();
}

/**
 * Load database from files stored in data folder.
 *
 * @returns {Database}
 */
Database.load = function () {
	var database = new Database();
	var coutries = FileUtils.readFile("countries.csv", true);
	console.log(coutries);

	return database;
};

export {Database};
