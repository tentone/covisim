import {Block} from "./block";
import {Person, PersonStatus} from "./person";
import {CovidData} from "../covid-data";
import {RandomUtils} from "../utils/random-utils";

/**
 * Structure to run the simulation.
 *
 * @constructor
 */
function Simulation() {
	// Population of the simulation
	this.population = 10000;

	// Number of districts in the simulation
	this.districts = 20;

	// Family size
	this.familySize = 4;

	// Start conditions for the simulation
	this.startConditions = {
		// Number of people infected at the beginning of the simulation
		infectedPeople: 1
	};

	// Foreign visit configuration (from outside the country, into a district)
	this.foreign = {
		// Number of foreign visitors daily
		dailyVisits: 1000,

		// How many people a foreign person contacts with
		dailyContact: 30,

		// Probability of person being infected
		infectedProbability: 0.00001,

		// Probability of person being infected w/o symptoms
		infectedNoSymptomsProbability: 0.001,
	};

	// Population movement
	this.district = {
		// How many people one people contacts with inside the district
		dailyContact: 100,

		// How many contact with people outside the district
		outsideContact: 20,
	};

	// Disease configuration
	this.disease = {
		// Transmission configuration
		transmissionNoSymptoms: 0.001,
		transmission: 0.03,

		// Probability of recovery
		recoveryProbability: 0.22,

		// Probability of starting showing symptoms today
		symptomsProbability: 0.01,

		// Probability of recovery today
		treatmentProbability: 0.01,

		// Probability of death today
		deathProbability: 0.002,
	};

	// Hospital capacity
	this.hospitalCapacity = {
		// TODO <ADD CODE HERE>
	};

	// Measures adopted to control the disease
	this.measures = {
		// Infected people movement restriction
		infectedMovementRestriction: 0.0,
	};

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
	var homes = (this.population / this.familySize) / this.districts;
	var country = new Block("Country");

	for(var i = 0; i < this.districts; i++)
	{
		var districts = new Block("District " + i);

		for(var j = 0; j < homes; j++)
		{
			var home = new Block("Home " + i + "-" + j);
			for(var k = 0; k < this.familySize; k++)
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
	for(var i = 0; i < this.startConditions.infectedPeople; i++)
	{
		var person = RandomUtils.randomElement(country.peopleCache);
		person.status = PersonStatus.INFECTED;
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

	// Foreigners
	for(var i = 0; i < this.foreign.dailyVisits; i++)
	{
		let foreign = new Person();

		// Check if foreign person is infected
		if(RandomUtils.happens(this.foreign.infectedProbability)) { foreign.status = PersonStatus.INFECTED; }
		else if(RandomUtils.happens(this.foreign.infectedNoSymptomsProbability)) { foreign.status = PersonStatus.INFECTED_NO_SYMPTOMS; }

		if(foreign.isInfected())
		{
			// Select a random destination district
			var district = RandomUtils.randomElement(this.country.subBlocks);

			// Contact with random people from one
			for(var j = 0; j < this.foreign.dailyContact; j++)
			{
				Person.contact(foreign, RandomUtils.randomElement(district.peopleCache), this);
			}
		}
	}


	// Traverse all persons from the country
	this.country.traverse((person) =>
	{
		// Contact with other people at home
		var peopleHome = person.block.peopleCache;
		for(var i = 0; i < peopleHome.length; i++)
		{
			Person.contact(person, peopleHome[i], this);
		}

		// Contact with people of the same district
		var peopleDistrict = person.block.parent.peopleCache;
		for(var i = 0; i < this.district.dailyContact; i++)
		{
			let stranger = RandomUtils.randomElement(peopleDistrict);
			Person.contact(person, stranger, this);
		}

		// Contact with people outside of district
		var peopleCountry = person.block.parent.parent.peopleCache;
		for(var i = 0; i < this.district.outsideContact; i++)
		{
			let stranger = RandomUtils.randomElement(peopleCountry);
			Person.contact(person, stranger, this);
		}

		person.step(this);
	});


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
