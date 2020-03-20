# COVID 19+1
 - Predict how the measures implemented to prevent the COVID-19 virus spread are affecting its evolution.
 - Compare the measures adopted by different countries, and predict how the virus is progressing on a daily basis.



### User Interface

- TODO



### Data sources

- Multiple data sources are used for this project, some of them related to the Covid19 virus others to country population data.
- Data is aggregated into single database with the duplicated information being discarded. This database can be used as basis for other Covid19 related projects.
    - [Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE (GitHub)](https://github.com/CSSEGISandData/COVID-19) 
    - [DSSG-PT Covid19 Portugal Data (GitHub)](https://github.com/dssg-pt/covid19pt-data)
    - [Comprehensive country codes: ISO 3166, ITU, ISO 4217  (datahub.io)](https://datahub.io/core/country-codes)
    - [GPS Coordinates of all countries (Google)](https://developers.google.com/public-data/docs/canonical/countries_csv)
    - [Population Figures By Country (datahub.io)](https://datahub.io/JohnSnowLabs/population-figures-by-country)



### Build and Run
 - The project is built using Python with a Flask based webserver and a client application.
 - Run the install.sh file to install dependencies on Linux based machines.



### Libraries
 - [Peewee ORM](http://docs.peewee-orm.com/en/latest/) 
 - [Flask Web Server](https://flask.palletsprojects.com/en/1.1.x/)
 - [Requets](https://requests.readthedocs.io/en/master/)



### License
 - The project is distributed under MIT license available on the github page.