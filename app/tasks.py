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
		rows = request.text.split("\n")
		for row in rows:
			cols = row.split(",")
			# print(cols)


# Start task timer
def start():
	timer.start(block=False)
