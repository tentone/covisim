import csv
import requests
import io
import database
import os

# Country names and identification list.
def country_list():
	file = open("../data/countries.csv", newline="", encoding="utf8")
	reader = csv.reader(file, delimiter=",")
	line = 0
	for row in reader:
		if line > 1:
			try:
				database.Country.create(id=row[7], name=row[2], code=row[6], currency=row[9], continent=row[29], capital=row[28])
			except:
				pass
		line += 1
	print("Loaded country list.")

# Country names and identification list.
def country_gps_location():
	file = open("../data/gps.csv", newline="", encoding="utf8")
	reader = csv.reader(file, delimiter=",")
	print("Loaded country GPS list.")

# Load metadata into the database, this data is only loaded once on the startup.
#
# All data loaded here should be assumed as static.
def load():
	country_list()
	country_gps_location()
