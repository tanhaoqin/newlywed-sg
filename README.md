
# Where to BTO

A simple web application that allows newlyweds to find the perfect location for them to live in. This project is done as part of 02.221 Making Maps module in SUTD. 

The application is made using ReactJS, materializeCSS, Leaflet and Turf.js. 
The data is parsed and processed with QGIS and R.

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


# 02.221 Making Maps Report

###
### Initial Problem
A couple choosing a location of their first house is a very important decision to make. To start their new lives as husband and wife, they no longer have the luxury make decisions based on their own indivual preferences.   


###
### Assumptions
We have made these assumptions whilst creating this map:
-  Having more facilities nearby implies that the location is better 
-  Newlyweds in general do not have a strong preference towards one particular facility 
(i.e. A particular secondary school over all secondary schools)
-  The locations specified are available

#
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
###
We did not include certain other facilities due to time contraint and availability of data:
- Bus Stops
- Mama Shops
- Restaurants
- Hawker Centres 
- Wet Markets

#
### Hexgrid
Adding the facilities mentioned above (with longitude and latitude) onto a map of Singapore (projected in SVY21), we were still unable to create the thematic map that was required for our project. This was because we were interested in best areas for newlyweds to stay in rather than specifying an exact longitude and latitude they should stay in.

Hence, we were faced with two choices to use as the basis for comparison between areas: 
the 2010 Singapore Planning Areas map or a hexgrid map

We chose the hexgrid map because each polygon is of equal size and is each polygon relatively small as compared to Singapore. Therefore the usage of a hexgrid map enables a fairer and better visualisation of the resultant chosen locations.
Readers can also better read the map with different clusters of information. Using the hexgrid instead of the planning areas has allowed us to garner much more information about each neighbourhood. 

#
### Graduated Colours
A thematic map was chosen to visualise our data so as to emphasise on the spatial variation of areas in Singapore. A constrast can be built between locations that are the most advantageous and most disadvantageous based on the user's preference. 

Moreover, after the user has decided on the characteristics that determine where the most suitable place to live in (based on the list of facilities given) they can still alter their decision by looking at the spatial layout of the map of Singapore. The surrounding areas near a hex grid could give them additional information about the location that are not provided in the list of facilities that we had chosen. Hence, this enables the user to effectively choose a location more carefully. 

#
### Buffers
After ploting the vector points in QGIS, we moved on to create a uniform buffer zones around the point vector. The buffer zones were created to give the same value for the surrounding areas of the point vector. The size of the buffer zones are based on the relative perception of the maximum distance for a faculity to be considered nearby and easily accessible to the residents. Hence, the buffer zones created for each type of facilities are different.

Since we are interested in the number of facilities in a particular area, we chose not to dissolve the boundaries of the buffer zones and keep the over lapping areas 

#
### Profiles & Weightages
The use of two profile types showed the two most common family plans a couple in Singapore would have. Studying and identifying the economical and social cultural context particularly in Singapore helps us to better communicate to our user and understand their needs. The two different profile types are family-focused and career-focused. 

However, if the user is not agreeable with the pre-selected weightage on the list of facilties, they are provided with an option to customise a new set of profile that suits their preferences perfectly. Allowing this customisation take off some of the limitations and assumptions of the map.  


#
### Changing Weights
However, our project has one fundamental assumption: all the couples in Singapore are classified into these two very specific profiles. 

In reality, that assumption is clearly false as every single couple would have their own priorities when it comes to where they want to live. A family-oriented couple might not care about primary schools because their kids might be already in Secondary schools.

As such, the team decided to push our project further and develop an web application with an interactive map for our project. 

The main functionality of the application would be to provide a series of sliders that users can use. Each couple can then make use of the sliders to determine how much they value each feature.

Upon adjusting these sliders, the application would perform simple spatial analysis and the thematic map will be updated based on the new weights given.

#
### Bringing the project online

The first approach the team took was to export every single feature layer as a geojson file. The application would read each feature layer and generate buffers for each feature using turf.js, a spatial analysis javascript library. For each grid in the hexgrid, we would then aggregate the number of buffers and multiply the aggregated sum with user submitted weights.

However, we shortly discovered that the spatial analysis took an extremely long time on javascript. As such, the team looked into ways to bringing as much spatial calculation offline as possible. 

Our second approach was to provide only one layer of data. For each hex in the Singapore hex-grid, we pre-calculated the number of buffer overlaps for each feature. With that, we only need to retrieve one geojson file in the application. When our users set their weights, a simple function will be run for each hex-grid; for each feature, the function will multiply the number of buffers overlaps with the desired weight of the feature and add the result to an overall score of the hex. 

During the calculation, the function would keep track of the highest possible score obtained with the given map. A colour map is then generated with equal quantiles. The map will then render the hex-grid on the map based on this calculated final score, and coloured based on the generated colour map. Lastly, we experimented with the appropriate colour scheme and appropriate transparency values for the map to highlight the colours without completely hiding the orignal map features in the application.

#### Screenshots of our initial prototype

**Adding the sliders**

![Demonstrating the sliders](https://www.dropbox.com/s/4m6uqvyehv1u6dz/Screenshot%202016-04-05%2020.05.42.png?dl=1)

**The moment where we got it functional**

![Initial prototype](https://www.dropbox.com/s/1iy1oa7cn1fmrhb/Screenshot%202016-04-18%2001.17.23.png?dl=1)

#
### Custom Features/ Weights

There was one more factor that our project did not consider. Oftentimes, couples often would choose where they would like to live based on the proximity to certain more personal locations in Singapore. For example, they would like to stay near their workplaces, or perhaps their parents' place. These data cannot be pre-calculated on our thematic map and in reality, would factor in their decisions a lot more than the features we have provided.

To this cause, we have decided to add a feature to add in custom features and weights to our web application.

We added a simple button that will add a leaflet marker to our map after the user has chosen an appriopriate weight they would like to assign to the feature as well as the buffer size they would like for the analysis. 

When the markers are initially added, a hidden buffer would be generated using turf.js's buffer function and saved in the application as a variable.

As our initial hex-grid is made up of Multi-Polygon, we could not use a simple overlap function to add points to each hex-grid accordingly. Instead, using turf.js, for each MultiPolygon in the hex-grid, we generated its centre-point and stored it as the multi-polygon's property. Using this centre-point, we were then able to check if the centre-point exists within the generated buffer for the custom feature, if it does, the user-added weight is added to the final score.

The latlng of the marker is then constantly tracked by the application. As the user drag the markers, the score is recalculated and the thematic map is then redrawn with this new features in place.

#### Screenshots

**Drawing out the invisible buffers**

![Drawing out the invisible buffers](https://www.dropbox.com/s/qg1t0x76dbl5b3x/Screenshot%202016-04-19%2023.52.00.png?dl=1)

**Hiding the invisible buffers**

![Hiding the invisible buffers](https://www.dropbox.com/s/3ndjyxuxelkont7/Screenshot%202016-04-19%2023.55.11.png?dl=1)

With that our project was complete, minor user interface and quality of life changes were then implemented to give our final product given. The final web application can be accessed at http://wheretobto.herokuapp.com/

#
## Credits
The project is made in conjunction with David Yam, Na Xiao Shuang, Tan Hao Qin, Tan Xiao Lei.

We would like to thank our professor Ate Poorthius for his guidance and help on the matter.

#
The data used above was taken from:
- https://data.gov.sg/
- https://www.data.gov/
- http://www.mytransport.sg/content/mytransport/home/dataMall.html
- http://www.shopping.sg/shopaglore/list-of-shopping-malls-in-singapore/
- http://www.shengsiong.com.sg/pages/Store-Locator.html
- http://www.fairprice.com.sg/webapp/wcs/stores/servlet/AjaxStoreLocatorDisplayView?storeId=10001
- http://www.giantsingapore.com.sg/store-locations/
- https://coldstorage.com.sg/store-locations


