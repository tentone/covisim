import {Block} from "./block";
import {Person, PersonStatus} from "./person";
import {CovidData} from "../covid-data";
import {RandomUtils} from "../utils/random-utils";
import {Configuration} from "./configuration";

/**
 * Structure to run the simulation.
 *
 * @constructor
 */
function Simulation() {
	// Configuration
	this.config = new Configuration();

	// Country of the simulation
	this.country = null;

	// Days of simulation
	this.day = 0;

	// Current date of the simulation
	this.date = new Date();

	// Data of the simulation stored in each step.
	this.data = [];
}

/**
 * Reset simulation create structure.
 */
Simulation.prototype.reset = function() {
	var homes = (this.config.world.population / this.config.world.familySize) / this.config.world.districts;
	var country = new Block("Country");

	for(var i = 0; i < this.config.world.districts; i++)
	{
		var districts = new Block("District " + i);

		for(var j = 0; j < homes; j++)
		{
			var home = new Block("Home " + i + "-" + j);
			for(var k = 0; k < this.config.world.familySize; k++)
			{
				home.addPerson(new Person());
			}
			districts.addSubBlock(home);
		}

		country.addSubBlock(districts);
	}

	country.traverse(undefined, function(block)
	{
		block.peopleCache = block.getAllPeople();
	});

	// Infected people at beginning
	for(var i = 0; i < this.config.start.infectedPeople; i++)
	{
		var person = RandomUtils.randomElement(country.peopleCache);
		person.status = PersonStatus.INFECTED_NO_SYMPTOMS;
	}

	this.day = 0;
	this.data = [];
	this.country = country;
};

/**
 * Perform a day of simulation.
 */
Simulation.prototype.step = function()
{
	if(this.country === null)
	{
		console.log("Simulation needs to be reset before start.");
		return;
	}

	// Foreigners visit
	for(var i = 0; i < this.config.foreign.dailyVisits; i++)
	{
		let foreign = new Person();

		// Check if foreign person is infected
		if(RandomUtils.happens(this.config.foreign.infectedProbability)) { foreign.status = PersonStatus.INFECTED; }
		else if(RandomUtils.happens(this.config.foreign.infectedNoSymptomsProbability)) { foreign.status = PersonStatus.INFECTED_NO_SYMPTOMS; }

		if(foreign.isInfected())
		{
			// Select a random destination district
			var district = RandomUtils.randomElement(this.country.subBlocks);

			// Contact with random people from the destination district
			for(var j = 0; j < this.config.foreign.dailyContact; j++)
			{
				foreign.contact(RandomUtils.randomElement(district.peopleCache), this.config);
			}
		}
	}


	// Traverse all persons from the country
	this.country.traverse((person) =>
	{
		person.step(this.config);
	});

	// Collect daily data
	this.data.push(this.getData());
	this.nextDay();
};

/**
 * Update date and day counter.
 */
Simulation.prototype.nextDay = function()
{
	this.date.setDate(this.date.getDate() + 1);
	this.day++;
};

/**
 * Get data of the current simulation state.
 */
Simulation.prototype.getData = function()
{
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

	return data;
};

export {Simulation};
