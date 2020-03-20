import requests
import timeloop
import datetime

timer = timeloop.Timeloop()

# Retrieve data for the portugal DSSG-PT
@timer.job(interval=datetime.timedelta(minutes=10))
def dssg_pt():
    url = "https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv"
    r = requests.get(url)
    #print(r.content)
    #TODO <ADD CODE HERE>

def start():
    timer.start(block=True)