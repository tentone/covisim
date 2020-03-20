import csv
import io
import requests
import timeloop
import datetime
import app.database as database

timer = timeloop.Timeloop()


# Retrieve data for the portugal DSSG-PT
@timer.job(interval=datetime.timedelta(minutes=29))
def dssg_pt():
	url = "https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv"
	request = requests.get(url)
	if request.status_code == 200:
		file = io.StringIO(request.text)
		reader = csv.reader(file, delimiter=",")
		line = 0
		for row in reader:
			if line > 1:
				date = datetime.datetime.strptime(row[0], "%d-%m-%Y")
				data = database.Cases(country="PRT", date=date, infected=int(row[2]), recovered=int(row[12]), deaths=int(row[13]), suspects=int(row[17]))
				try:
					data.save()
				except:
					pass
			line += 1
		print("Updated data from DSSG-PT")

# Start task timer
def start():
	timer.start(block=False)
