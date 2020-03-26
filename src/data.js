import {FileUtils} from "./utils/file-utils";
import CSV from "csv-js";

/**
 * Stores data for the covid 19 disease on a daily basis.
 */
function Data()
{
	/**
	 * Date of this data entry.
	 */
	this.date = date;

	/**
	 * Total number of currently infected people.
	 */
	this.infected = null;

	/**
	 * Amount of people that recovered.
	 */
	this.recovered = null;

	/**
	 * Number of deaths cause by the virus.
	 */
	this.deaths = null;

	/**
	 * Suspect cases waiting for test results/isolated.
	 */
	this.suspects = null;
}

// Read covid 19 data from DSSG-PT
Data.getDSSGPT = function() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
};

// Italia Covid 19 data
Data.getPCMDPCITA = function() {
	var data = FileUtils.readFile("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", true);
	var rows = CSV.parse(data);
	console.log(rows);
};

export {Data};

/*
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

 */
