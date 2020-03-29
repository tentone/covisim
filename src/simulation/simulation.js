import {Block} from "./block";
import {Person, PersonStatus} from "./person";

function Simulation() {
	// Population of the simulation
	this.population = 10000;

	// Number of districts in the simulation
	this.districts = 12;

	// Family size
	this.familySize = 5;

	// Foreign visit configuration
	this.foreign = {
		// Number of foreign visitors daily (from outside the country)
		dailyForeignVisit: 1000,

		// Probability of being infected
		infectedProbability: 0.05
	};

	// Population movement
	this.district = {
		// How many people one people contacts with inside the district
		dailyContact: 200,

		// How many contact with people outside the district
		outsideContact: 30,

		// Hospital capacity
		hospitalCapacity: 300
	};

	// Disease configuration
	this.disease = {
		// Transmission configuration
		transmissionProbabilty: 0.3,

		// Probability of death
		deathProbabilityHospital: 0.05,
		deathProbabilityHome: 0.3,

		// Time until symptoms show up
		symptomsTime: 12,

		// Time until the person is treated/dies
		treatmentTime: 9
	};

	// Disease prevention configuration
	this.measures = {
		// TODO <ADD CODE HERE>
	};

	// Country of the simulation
	this.country = null;

	// Data of the simulation stored in each step.
	this.data = [];

	// Days of simulation
	this.day = 0;

	// Current date of the simulation
	this.date = new Date();
}

/**
 * Reset simulation create structure.
 */
Simulation.prototype.reset = function() {
	var homes = this.population / this.familySize;
	var homesPerDistrict = this.districts / homes;

	this.country = new Block();

	for(var i = 0; i < this.districts; i++)
	{
		var districts = new Block();

		for(var j = 0; j < homesPerDistrict; j++)
		{
			var home = new Block();
			for(var k = 0; k < this.familySize; k++)
			{
				home.people.push(new Person());
			}
			districts.push(home);
		}

		this.country.subBlocks.push(districts);
	}
};

/**
 * Perform a day of simulation.
 */
Simulation.prototype.next = function() {
	if(this.country === null)
	{
		console.log("Simulation needs to be reset before start.");
		return;
	}
};

/**
 * Get data of the current simulation state.
 */
Simulation.prototype.getData = function() {
	var data = new CovidData(new Date(this.date), this.day);
	data.suspects = 0;
	data.deaths = 0;
	data.infected = 0;
	data.recovered = 0;

	this.country.traverse(function(person)
	{
		if(person.status === PersonStatus.DEATH) {data.deaths++;}
		if(person.status === PersonStatus.INFECTED) {data.infected++;}
		if(person.status === PersonStatus.INFECTED_NO_SYMPTOMS) {data.suspects++;}
		if(person.status === PersonStatus.RECOVERED) {data.recovered++;}
	});
};



export {Simulation};
