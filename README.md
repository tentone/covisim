# COVID 19+1
 - Visualize cases of COVID-19 virus around the world and compare them with simulation data of how the measures implemented to prevent the spread are affecting its evolution.
 - Compare the measures adopted by different countries, and predict how the virus is progressing on a daily basis.
 - Iterative multi-level simulation meant to be run on the country scale, the behavior of each person is simulated on a daily basis using probabilistic data.



### Simulation

- Simulation is composed by 7 logic elements, Country, District, Home, Person, Foreigners, Hospital and Governor. The country contains Districts that contain Homes with groups of Person.
- Each person movement behavior inside of its district and to the outside is simulated every day. Persons that live in the same home have contact with each other everyday.
- The governor is an outside looker. That analyses data every X days and activate measure to reduce contact contamination (e.g block movement to surrounding districts, reduce allowed foreigners in the country, etc)
- Foreigners enter the country everyday they visit random districts and may be infected (with out without symptoms with the disease).
- Hospital take care of Persons they have a bed limit and a effectiveness ratio that reduces the chance of the Person dying / increases change of recovery.
- In the simulation model recovered Persons are (a ton) more resistant to the virus but they can infected again with really small chance.
- The simulation configuration is based on real data from countries including the population age and district count (based on city count). The simulation does not consider gender of the Person being simulated.



### Data sources

- Multiple data sources are used for this project, some of them related to the Covid19 virus others to country population data.
- Data is aggregated into single database with the duplicated information being discarded.
    - [Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE (GitHub)](https://github.com/CSSEGISandData/COVID-19) 
    - [DSSG-PT Covid19 Portugal Data (GitHub)](https://github.com/dssg-pt/covid19pt-data)
    - [PCM-DPC COVID-19 Italia Monitoraggio situazione (GitHub)](https://github.com/pcm-dpc/COVID-19)
    - [Comprehensive country codes: ISO 3166, ITU, ISO 4217  (datahub.io)](https://datahub.io/core/country-codes)
    - [GPS Coordinates of all countries (Google)](https://developers.google.com/public-data/docs/canonical/countries_csv)
    - [Population Figures By Block (datahub.io)](https://datahub.io/JohnSnowLabs/population-figures-by-country)
    - Population Age distribution by Block (datahub.io) [(0-14)](https://datahub.io/world-bank/sp.pop.0014.to.zs) [(15-64)](https://datahub.io/world-bank/sp.pop.1564.to.zs) [(65+)](https://datahub.io/world-bank/sp.pop.65up.to.zs)



### License

 - The project is distributed under MIT license available on the github page.

