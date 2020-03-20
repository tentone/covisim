import csv
import requests
import timeloop
import datetime

timer = timeloop.Timeloop()

# Retrieve data for the portugal DSSG-PT
@timer.job(interval=datetime.timedelta(minutes=10))
def dssg_pt():
    url = "https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv"
    data = requests.get(url)
    reader = csv.reader(data, delimiter=' ', quotechar='|')
    for row in reader:
        print(', '.join(row))

# Start task timer
def start():
    timer.start(block=True)