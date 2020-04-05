import {Database} from "./database/database";
import {CountrySource} from "./sources/country-source";
import {CovidCasesSource} from "./sources/covid-cases-source";

console.log("Hello modafoca!");

var database = new Database();

CountrySource.loadList(database);
CovidCasesSource.fetchDSSGPT(database);
CovidCasesSource.fetchPCMDPCITA(database);

// Log database to window
console.log(database);
