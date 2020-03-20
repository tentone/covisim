import app.database
import app.tasks

database.connect()
tasks.start()
api.start()

# WorldWide cases
# https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-17.xlsx

# Portugal
# https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv