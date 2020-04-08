import {Database} from "./database/database";
import {CountrySource} from "./sources/country-source";
import {CovidCasesSource} from "./sources/covid-cases-source";

/**
 * Stores all global accessible data.
 *
 * @constructor
 */
function Global() {}

/**
 * Global accessible database (can be stored and loaded from file).
 *
 * @type {Database}
 */
Global.database = new Database();

/**
 * Load data from files and from remote servers.
 */
Global.loadData = function()
{
	CountrySource.loadList(Global.database);
	CovidCasesSource.fetchCSSE(Global.database);
	CovidCasesSource.fetchDSSGPT(Global.database);
	CovidCasesSource.fetchPCMDPCITA(Global.database);
};

export {Global};
