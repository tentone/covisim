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
	this.countriesMap = new Map();

	/**
	 * Country data availabble stored in array form.
	 */
	this.countries = [];

	/**
	 * Real covid data available indexed by the country code it related to.
	 */
	this.covidCases = new Map();
}

/**
 * Store covid cases data and associate to a country by its 3 char code.
 */
Database.prototype.storeCovidCases = function(code, data)
{
	var cases = this.getCovidCases(code);
	if(cases !== null)
	{
		for(var i = 0; i < data.length; i++)
		{
			var exists = false;
			for(var j = 0; j < cases.length; j++)
			{
				if(data[i].day === cases[j].day)
				{
					exists = true;
				}
			}

			if(!exists)
			{
				cases.push(data[i]);
			}
		}

		this.covidCases.set(code, cases);
	}
	else
	{
		this.covidCases.set(code, data);
	}
};

/**
 * Get covid cases for country.
 */
Database.prototype.getCovidCases = function(code)
{
	if(this.covidCases.has(code))
	{
		return this.covidCases.get(code);
	}

	return null;
};

/**
 * Get covid cases for country.
 */
Database.prototype.hasCovidCases = function(code)
{
	return this.covidCases.has(code);
};

/**
 * Store country data on database.
 */
Database.prototype.storeCountry = function(country)
{
	this.countriesMap.set(country.code, country);
	this.countries.push(country);
};

/**
 * Remove country from database
 */
Database.prototype.removeCountry = function(country)
{
	var index = this.countries.indexOf(country);
	if(index !== -1)
	{
		this.countries.slice(index, 0);
		this.countriesMap.delete(country.code);
	}
};


/**
 * Check if a country exists in the database by its 3 char code.
 */
Database.prototype.hasCountry = function(code)
{
	return this.countriesMap.has(code);
};

/**
 * Get country by 3 char code, name or 2 char code.
 */
Database.prototype.getCountry = function(code)
{
	if(this.countriesMap.has(code))
	{
		this.countriesMap.get(code);
	}

	for(var i = 0; i < this.countries.length; i++)
	{
		if(this.countries[i].code === code || this.countries[i].codeAlt === code || this.countries[i].name === code)
		{
			return this.countries[i];
		}
	}

	return null;
};

/**
 * Load data base from JSON file.
 */
Database.prototype.fromJSON = function(data)
{
	for(var i = 0; i < data.countries; i++)
	{
		this.storeCountry(data.countries[i]);
	}

	for(var i in data.covidCases)
	{
		this.storeCovidCases(i, data.covidCases[i]);
	}
};

/**
 * Store database data into a JSON object.
 *
 * Data is stored into array values.
 */
Database.prototype.toJSON = function()
{
	var data = {
		countries: this.countries,
		covidCases: {}
	};

	this.covidCases.forEach(function(value, key)
	{
		data.covidCases[key] = value;
	});

	return data;
};

export {Database};
