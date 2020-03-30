/**
 * Stored the simulation configuration.
 *
 * @constructor
 */
function Configuration() {
	// World configuration
	this.world = {
		// Population of the simulation
		population: 10e6,

		// Number of districts (cities or provinces) in the simulation
		districts: 156,

		// Family size
		familySize: 5
	};

	// Start conditions for the simulation
	this.start = {
		// Number of people infected at the beginning of the simulation
		infectedPeople: 1
	};

	// Foreign visit configuration (from outside the country, into a district)
	this.foreign = {
		// Number of foreign visitors daily
		dailyVisits: 1000,

		// How many people a foreign person contacts with
		dailyContact: 20,

		// Probability of person being infected
		infectedProbability: 0.00001,

		// Probability of person being infected w/o symptoms
		infectedNoSymptomsProbability: 0.0001,
	};

	// Population movement
	this.district = {
		// How many people one people contacts with inside the district
		dailyContact: 50,

		// How many of contact with people outside the district
		outsideContact: 10,
	};

	// Disease configuration
	this.disease = {
		// Transmission configuration
		transmissionNoSymptoms: 0.005,

		// Transmission probability
		transmission: 0.03,

		// Probability of starting showing symptoms (applied on daily basis)
		symptomsProbability: 0.065,

		// Probability of recovery after being infected (applied on daily basis)
		recoveryProbability: 0.015,

		// Probability of death (applied on daily basis)
		deathProbability: 0.01,
	};

	// Hospital configuration
	this.hospital = {
		// Total hospital capacity
		capacity: 1000 // TODO <NOT BEING USED>

	};

	// Measures adopted to control the disease
	this.measures = {
		// Infected people movement restriction (how much movement is removed to these people)
		infectedMovementRestriction: 0.7,

		// Restrict movement between districts (how much is reduced)
		districtMovementRestriction: 0.0
	};
}

export {Configuration};
