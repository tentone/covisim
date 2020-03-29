/**
 * Utils to manipulate random data.
 */
function RandomUtils() {}

/**
 * Trow dice to check if a event happens
 */
RandomUtils.happens = function(probability) {
	return Math.random() <= probability;
};

/**
 * Get a random element from the array.
 */
RandomUtils.randomElement = function(array) {
	return array[Math.floor(Math.random() * array.length)];
};

export {RandomUtils};
