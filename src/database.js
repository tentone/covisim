/**
 * Database is used to store and index data about countries and covid data.
 *
 * @constructor
 */
function Database()
{
	/**
	 * Country data available indexed by its 3 char country code.
	 */
	this.countries = new Map();

	/**
	 * Covid data available indexed by the country code it related to.
	 */
	this.data = new Map();
}

/**
 * Store country data on database.
 */
Database.prototype.setData = function(code)
{
	this.countries.set(country.code, country);
};


/**
 * Store country data on database.
 */
Database.prototype.storeCountry = function(country)
{
	this.countries.set(country.code, country);
};

/**
 * Check if a country exists in the database.
 */
Database.prototype.hasCountry = function(code)
{
	return this.countries.has(code);
};

/**
 * Get country by its code.
 */
Database.prototype.getCountry = function(code)
{
	if(this.countries.has(code))
	{
		this.countries.get(code);
	}

	return null;
};

/**
 * Load data base from JSON file.
 */
Database.prototype.load = function()
{
	// TODO <ADD CODE HERE>
};

/**
 * Store database data into a JSON object.
 *
 * Data is stored into array values.
 */
Database.prototype.store = function()
{
	// TODO <ADD CODE HERE>
};

export {Database};
