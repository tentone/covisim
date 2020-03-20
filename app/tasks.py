import csv
import io
import requests
import timeloop
import datetime

timer = timeloop.Timeloop()


# Retrieve data for the portugal DSSG-PT
@timer.job(interval=datetime.timedelta(minutes=10))
def dssg_pt():
	url = "https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv"
	request = requests.get(url)
	if request.status_code == 200:
		file = io.StringIO(request.text)
		reader = csv.reader(file, delimiter=',')
		for row in reader:
			print(row)


# Start task timer
def start():
	timer.start(block=False)
