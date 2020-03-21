import csv
import io
import requests
import timeloop
import datetime
import database

timer = timeloop.Timeloop()

# Retrieve data for the portugal DSSG-PT
@timer.job(interval=datetime.timedelta(minutes=30))
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

@timer.job(interval=datetime.timedelta(minutes=30))
def pcm_dpc_ita():
	url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv"
	request = requests.get(url)
	if request.status_code == 200:
		file = io.StringIO(request.text)
		reader = csv.reader(file, delimiter=",")
		line = 0
		for row in reader:
			if line > 1:
				date = datetime.datetime.strptime(row[0], "%Y-%m-%d %H:%M:%S")
				data = database.Cases(country="ITA", date=date, infected=int(row[10]), recovered=int(row[8]), deaths=int(row[9]), suspects=int(row[11]))
				try:
					data.save()
				except:
					pass
			line += 1
		print("Updated data from PCM-DPC-ITA")

# Start task timer
def start():
	timer.start(block=False)
