/**
 * Math utils to simplify expressions used multiple times.
 */
function MathUtils() {}

/**
 * Apply percentage of reduction to a value.
 */
MathUtils.reduction = function(value, reduction) {
	return value * (1.0 - reduction);
};

export {MathUtils};
