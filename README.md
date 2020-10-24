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

1）添加新加坡区域划分线，根据每个区的确诊人数对区域进行填充，颜色越深表示疫情越严重

2）左上角设置日期滑条，可以拖动滑条查看前7天以及未来14天任意一天的疫情信息

3）点击某个区域显示该天该区域的确诊人数、疑似人数、总人数（前7天）或预计风险等级（未来14天），以及	  预计疫情爆发时间

4）点击某个区域显示与该区域相关系数最高的三个区域，并用连线进行连接，连线颜色深浅代表相关系数的高低

5）右上角展示当前日期，总人口，当天全国确诊人数、疑似人数、确诊 + 疑似总人数以及较昨日的增值，支持随日期滑条拖动同步改变

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_1.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_2.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2.gif)




## Demo3
**Dependencies**: 

MapBox API

**Functions**: 

1）将每个感染者的地理位置坐标点展示在地图上，根据密度形成热区

2）添加新加坡区域划分线，点击区域显示每个区感染人数

3）左上角设置日期滑条，可以拖动滑条查看前7天以及未来14天任意一天的感染者分布情况

4）右上角展示当前日期，总人口，当天全国确诊人数、疑似人数以及较昨日的增值，支持随日期滑条拖动同步改变

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo3.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo3.gif)