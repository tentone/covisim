/**
 * Utils to handle environment related checks.
 */
function EnvUtils() {}

/**
 * Check if code is running on a browser. (Otherwise should be running in node).
 */
EnvUtils.browser = function()
{
	return typeof window !== "undefined";
};

export {EnvUtils};
