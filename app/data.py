import csv
import requests
import io
import app.database as database

# Country names and identification list.
def country_list():
	url = "https://datahub.io/core/country-codes/r/country-codes.csv"
	request = requests.get(url)
	if request.status_code == 200:
		file = io.StringIO(request.text)
		reader = csv.reader(file, delimiter=',')
		line = 0
		for row in reader:
			if line > 1:
				print(row)
				c = database.Country(id=row[7], name=row[2], code=row[6], currency=row[9], continent=row[29], capital=row[28])
				c.create()
			line += 1
		print("Loaded country list.")

# Load metadata into the database, this data is only loaded once on the startup.
#
# All data loaded here should be assumed as static.
def load():
	country_list()
