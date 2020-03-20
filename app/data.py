import csv
import requests
import io
import app.database as database


# Load country list from DataHub
#
# Gets a list with the country name and its code.
def country_list():
	url = "https://datahub.io/core/country-codes/r/country-codes.csv"
	request = requests.get(url)
	if request.status_code == 200:
		file = io.StringIO(request.text)
		reader = csv.reader(file, delimiter=',')
		line = 0
		for row in reader:
			if line > 1:
				country = database.Country(name=row[0], code=row[1])
				country.update()
			line += 1

# Load average age and population


# Load metadata into the database, this data is only loaded once on the startup.
#
# All data loaded here should be assumed as static.
def load():
	country_list()
