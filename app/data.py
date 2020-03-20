import requests


# Load base data to database.
def loadPopulationData():
	url = "https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv"
	request = requests.get(url)
	if request.status_code == 200:
		rows = request.text.split("\n")
		for row in rows:
			cols = row.split(",")
			print(cols)
