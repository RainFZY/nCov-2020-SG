# nCov-2020-SG
## Table of Contents

- [Background](#background)
- [Demo1 - Contact Tracing](#demo1)
- [Demo2 - Pandemic Prediction](#demo2)
- [Demo3 - Heat Map of Infected](#demo3)
- [中文版本](README-CN.md)

## Background

*2020 Coronavirus in Singapore*

- Developed a COVID-19 map to visualize the information of confirmed cases, including their locations, the places they have been to, the transportation facilities they used, etc. and to track active cases; 

- Web-based;

- Data Support: data of demo1 and demo3 are simulative, data of demo2 are from NCS




## Demo1

**Dependencies**: 

Baidu Map API

**Functions**: 

1）Click a red point (represents a confirmed case) to view its information including their locations, the places they have been to, the transportation facilities they used, etc.

2）Click a blue blue point (represents a place a confirmed case had been to) to view the location information.

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo1.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo1.gif)





## Demo2
**Dependencies**: 

MapBox API

**Functions**: 

1）Add Singapore's region dividing line, fill each region with color based on the number of its confirmed cases. The darker the color, the more severe the epidemic situation.

2）Place a scrollbar at the top-left corner to check the epidemic information from a week ago to two weeks later by scrolling the bar.

3）Click a certain region to view the number of its confirmed cases, suspected cases as well as the estimated outbreak time. Also the total number of cases (for the past week) and the estimated level of risk (for the following two weeks) are provided.

4）Click a certain region to view its most related three regions, which are connected with lines. The darker the color of the line, the higher the correlation coefficient. 

5）The info box at the top-right corner shows the date, total population and the summary of the epidemic situation. The information change synchronously with the scrollbar.

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_1.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_2.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2.gif)




## Demo3
**Dependencies**: 

MapBox API

**Functions**: 

1）Locate every confirmed case on the map and make thermodynamic diagrams based on the density of confirmed cases.

2）Add Singapore's region dividing line, click a certain region to view the number of its confirmed cases.

3）Place a scrollbar at the top-left corner to check the epidemic information from a week ago to two weeks later by scrolling the bar.

4）The info box at the top-right corner shows the date, total population and the summary of the epidemic situation. The information change synchronously with the scrollbar.

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo3.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo3.gif)