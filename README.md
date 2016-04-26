
# Where to BTO

A simple web application that allows newlyweds to find the perfect location for them to live in. This project is done as part of 02.221 Making Maps module in SUTD. 

The final web application can be accessed at http://wheretobto.herokuapp.com/.
The application was made using ReactJS, materializeCSS, Leaflet and Turf.js. 
The data was parsed and processed with QGIS and R.

[TOC]

## Installation
```
$ npm install
```

## Development

Run gulp to browserify and compiled es6 javascript.
```
$ gulp
```

Open a new terminal and start the express server.

```
$ npm start
```

You can now visit the application on localhost:3000

####
# 02.221 Making Maps Report 

######
### Initial Problem
Choosing the location of their first home is a very important decision to make for newlyweds. In starting their new lives as husband and wife, they no longer have the luxury to make decisions based on their own indivual preferences and a compromise has to be made. 

Moreover, starting a new life inevitably creates a lot of stress on the couple and they might be overwhelmed by the situation. There are also many factors to consider in choosing an ideal location. 

Hence, we would like to provide an fun and interactive map that makes planning their first home an easy and effective task. 


######
### Assumptions
We have made these assumptions whilst creating the thematic map:
-  Having more facilities nearby implies that the location is better 
-  Newlyweds in general do not have a strong preference towards one particular facility 
(i.e. A particular secondary school over all secondary schools)
-  The locations specified are available

######
### Facilities Chosen
We chose the following 6 Categories as the possible facilities that newlyweds would want nearby:
- Medical Care Centres
    - Polyclinics
    - General Hospitals
- Shopping Locations
    - Super Markets
    - Shopping Malls
- Educational Institutions
    - Primary Schools
    - Secondary Schools
    - Tertiary Schools
- Care Facilities
    - Childcare
    - Eldercare
- Transportation Facilities
    - MRT Stations
- Other Facilities
    - Libraries
    - Police Stations
    - Fire Stations

Some of the facilities found did not have longitude and latitude preassigned.
For these facilities we had to geocode it using it's local address through Googlemaps.
##### Screenshot of Facilities plotted as Point Vectors (in QGIS)
![Adding All Points in QGIS](https://www.dropbox.com/s/gfau3lz8vf0fi5x/all%20points.png?dl=1)

We did not include these other facilities due to time contraint and availability of data:
- Bus Stops
- Mama Shops
- Restaurants
- Hawker Centres 
- Wet Markets

######
### Usage of a Hexgrid map of Singapore
Adding the facilities mentioned above as Point Vectors (with longitude and latitude) onto a map of Singapore (projected in SVY21), we were still unable to create the thematic map that was required for our project. This was because we were interested in best areas for newlyweds to stay in rather than specifying an exact longitude and latitude they should stay at.

Hence, we were faced with two choices to use as the basis for comparison between areas: 
the 2010 Singapore Planning Areas map or a hexgrid map of Singapore

We chose a hexgrid map because each polygon is of equal size and each polygon is relatively small as compared to Singapore. Therefore, the usage of a hexgrid map enables a fairer and better visualisation of the resultant chosen locations.

Readers can also better read the map when there are different clusters of information. Using a hexgrid map of Singapore instead of the 2010 Singapore Planning Areas map has allowed us to garner much more information about each neighbourhood. 

##### Screenshots of Facilities plotted as Point Vectors with a Hex Grid of Singapore (in QGIS)
![Hex Grid](https://www.dropbox.com/s/y4aanwiq7lnyhhz/hex.png?dl=1)

######
### Usage of Graduated Colours
A thematic map was chosen to visualise our data so as to emphasise on the spatial variation of areas in Singapore. Using a thematic map, a constrast can be built between locations that are the most advantageous and most disadvantageous based on the user's preference.

Moreover, after the user has decided on the desired characteristics (based on the list of facilities given) and seen which locations as most suitable, they can still alter their decision by looking at the spatial layout of the hexgrid map of Singapore. The surrounding areas near a hex grid could give them additional information about the location that are not provided in the list of facilities that we had chosen. 

Hence, this enables the user to effectively choose a location more carefully. 

######
### Usage of Buffers
After ploting the vector points in QGIS, we decided to create uniform buffer zones around the point vectors. The buffer zones were added to give an score to facilities that are "nearby" but not directly within that particular hexgrid polygon considered.

The buffer zones give the same score for the surrounding areas as that of the point vector. The size of the buffer zones are based on the relative perception of the maximum distance for a faculity to be considered nearby and easily accessible to the residents. Hence, the buffer zones created for each type of facilities are different.

The maximum distance to be considered nearby is as follows:
- 300m:
    - Supermarkets
    - Childcare
- 500m: 
    - Polyclinics
    - Shopping Malls
    - MRT Stations
- 1000m:
    - General Hospitals
    - Primary Schools
- 2000m:
    - Secondary Schools
    - Tertiary Schools
    - Eldercare
    - Police Stations
- 5000m:
    - Libraries
    - Fire Stations

##### Screenshots of the Buffer Zones of Facilities plotted (in QGIS)
![All buffer zones in QGIS](https://www.dropbox.com/s/frtnp0rdy0rfhm4/all%20buffers.png?dl=1)
Since we are interested in the number of facilities reachable in a particular area, we chose not to dissolve the boundaries of the buffer zones but decided keep the overlapping areas intact.

######
### Usage of Profiles & Weightages
We used two profile types as the two most common family plans a couple in Singapore would have. The two different profile types are: family-oriented and career-oriented. 


##### Family Orientated vs Work Oriented Couples
![Family Oriented vs Work Oriented](https://www.dropbox.com/s/o3nwhfekzdk5qyc/Screen%20Shot%202016-04-26%20at%203.59.48%20PM.jpg?dl=1)

Studying and identifying the economical and social cultural context particularly in Singapore helped us to better communicate with our user and understand their needs. 

From here, we gave relative weights to each facility based on the percieved importance of that facility by each of the two profile types.  Next, we added the various relative weights as scores of the various buffers.

##### Screenshots of the Buffer Zones of Facilities plotted with relative weights (in QGIS)
![Weighted Buffer](https://www.dropbox.com/s/q4y346xlw3q807n/Weighted%20Buffer.jpg?dl=1)

######
### Static Thematic Map in QGIS
Next we calculated a Spatial Joint between the buffers and the hexgrid map of Singapore and summed up the scores of each polygon on the hexgrid. The visualized results are as follows: 
(the darker green a polygon is the better it is based on the weights provided, red coloured polygons are areas which are out of bounds)

##### Screenshots of the Thematic Maps
**Family Oriented**
![Family Oriented](https://www.dropbox.com/s/ecelpyfh732uz0g/A%20copy.jpg?dl=1)

**Work Oriented**
![Work Oriented](https://www.dropbox.com/s/c6ibyr5e256ggzg/B.1%20copy.jpg?dl=1)

####

## Further Improvements
### Changing Weights
In selecting the relative weights of facilities we have made a very fundamental assumption: 
All the couples in Singapore are classified into these two very specific profile types (family-oriented and career-oriented). 

In reality, that assumption is clearly false(REALLY?) as every single couple would have their own priorities when it comes to where they want to live. A family-oriented couple might not care about primary schools because their kids might be already in Secondary schools.

As such, the team decided to push our project further and develop an web application with an interactive map for our project. 

The main functionality of the application would be to provide a series of sliders that users can use. Each couple can then make use of the sliders to determine how much they value each facility.

Upon adjusting these sliders, the application would perform simple spatial analysis and the thematic map will be updated based on the new weights given.

######
### Bringing the project online
The first approach the team took was to export every single feature layer as a geojson file. The application would read each feature layer and generate buffers for each feature using turf.js, a spatial analysis javascript library. For each grid in the hexgrid, we would then aggregate the number of buffers and multiply the aggregated sum with user submitted weights.

However, we shortly discovered that the spatial analysis took an extremely long time on javascript. As such, the team looked into ways to bringing as much spatial calculation offline as possible. 

Our second approach was to provide only one layer of data. For each hex in the Singapore hex-grid, we pre-calculated the number of buffer overlaps for each feature. With that, we only need to retrieve one geojson file in the application. When our users set their weights, a simple function will be run for each hex-grid; for each feature, the function will multiply the number of buffers overlaps with the desired weight of the feature and add the result to an overall score of the hex. 

During the calculation, the function would keep track of the highest possible score obtained with the given map. A colour map is then generated with equal quantiles. The map will then render the hex-grid on the map based on this calculated final score, and coloured based on the generated colour map. Lastly, we experimented with the appropriate colour scheme and appropriate transparency values for the map to highlight the colours without completely hiding the orignal map features in the application.

##### Screenshots of our initial prototype
**Adding the sliders**
![Demonstrating the sliders](https://www.dropbox.com/s/4m6uqvyehv1u6dz/Screenshot%202016-04-05%2020.05.42.png?dl=1)

**The moment where we got it functional**
![Initial prototype](https://www.dropbox.com/s/1iy1oa7cn1fmrhb/Screenshot%202016-04-18%2001.17.23.png?dl=1)

######
### Custom Features/ Weights
There was one more factor that our project did not consider. Oftentimes, couples often would choose where they would like to live based on the proximity to certain more personal locations in Singapore. For example, they would like to stay near their workplaces, or perhaps their parents' place. These data cannot be pre-calculated on our thematic map and in reality, would factor in their decisions a lot more than the features we have provided.

To this cause, we have decided to add a feature to add in custom features and weights to our web application.

We added a simple button that will add a leaflet marker to our map after the user has chosen an appriopriate weight they would like to assign to the feature as well as the buffer size they would like for the analysis. 

When the markers are initially added, a hidden buffer would be generated using turf.js's buffer function and saved in the application as a variable.

As our initial hex-grid is made up of Multi-Polygon, we could not use a simple overlap function to add points to each hex-grid accordingly. Instead, using turf.js, for each MultiPolygon in the hex-grid, we generated its centre-point and stored it as the multi-polygon's property. Using this centre-point, we were then able to check if the centre-point exists within the generated buffer for the custom feature, if it does, the user-added weight is added to the final score.

The latlng of the marker is then constantly tracked by the application. As the user drag the markers, the score is recalculated and the thematic map is then redrawn with this new features in place.

##### Screenshots
**Drawing out the invisible buffers**

![Drawing out the invisible buffers](https://www.dropbox.com/s/qg1t0x76dbl5b3x/Screenshot%202016-04-19%2023.52.00.png?dl=1)

**Hiding the invisible buffers**

![Hiding the invisible buffers](https://www.dropbox.com/s/3ndjyxuxelkont7/Screenshot%202016-04-19%2023.55.11.png?dl=1)

######
### Final Product: Interactive Thematic Map
With the above edits our project was complete, minor user interface and quality of life changes were then implemented to give us our final product. The final web application can be accessed at http://wheretobto.herokuapp.com/.

####
# Credits
This project was made in conjunction with David Yam, Na Xiao Shuang, Tan Hao Qin & Tan Xiao Lei.

We would like to thank our Professor Ate Poorthius for his guidance and help on the matter.
Thank you Professor!

######
The data used above was taken from:
- https://data.gov.sg/
- https://www.data.gov/
- http://www.mytransport.sg/content/mytransport/home/dataMall.html
- http://www.shopping.sg/shopaglore/list-of-shopping-malls-in-singapore/
- http://www.shengsiong.com.sg/pages/Store-Locator.html
- http://www.fairprice.com.sg/webapp/wcs/stores/servlet/AjaxStoreLocatorDisplayView?storeId=10001
- http://www.giantsingapore.com.sg/store-locations/
- https://coldstorage.com.sg/store-locations


