/**
 * Structure to store population age data.
 *
 * @param min Min age range of this entry.
 * @param max Max age range of this entry.
 * @param percentage Percentage of population in this Age range.
 */
function AgeRange(min, max, percentage)
{
	// Min age range of this entry.
	this.min = min;

	// Max age range of this entry.
	this.max = max;

	// Percentage of population in this category
	this.percentage = percentage;
}

/**
 * Receives an array of age range values and calculates a age based on the distribution probability.
 *
 * These are assumed to be sorted by age e.g (0-10, 10-20, etc)
 *
 * @param ranges Array of age ranges.
 */
AgeRange.getRandomAge = function(ranges)
{

};

export {AgeRange};
