/**
 * Represents a person in the simulation.
 */
function Person() {
	// Status of the person regarding its health
	this.status = PersonStatus.HEALTHY;

	// How many days the person if running in the simulation
	this.days = 0;

	// Days since the person was infected.
	this.daysInfection = 0;
}

var PersonStatus = {
	HEALTHY: 0,
	INFECTED_NO_SYMPTOMS: 1,
	INFECTED: 2,
	RECOVERED: 3,
	DEATH: 4
};

export {Person, PersonStatus};
