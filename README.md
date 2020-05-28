# nCov-2020-SG
## Table of Contents

- [Background](#background)
- [Demo1 - Contact Tracing（接触者追踪）](#demo1)
- [Demo2 - Pandemic Prediction（疫情爆发预测）](#demo2)
- [Demo3 - Heat Map of Infected（感染者热力图）](#demo3)



## Background

2020 Coronavirus in Singapore

研究新型冠状病毒(nCov)在新加坡的传播情况——追踪与预测

web端开发

数据支持：demo1、demo3数据为模拟值，demo2数据来自NCS 新加坡电信集团



## Demo1

**Dependencies**: 

百度地图 API

**Functions**: 

1）点击红色点（感染者）显示其信息（感染者所处区域、去过的地方、交通工具等）

2）点击蓝色点（感染者去过的区域）显示地点信息

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo1.png)



## Demo2
**Dependencies**: 

MapBox API

**Functions**: 

1）添加新加坡区域划分线，根据每个区的确诊人数对区域进行填充，颜色越深表示疫情越严重

2）左上角设置时间滑条，可以拖动滑条查看前7天以及未来14天任意一天的疫情信息

3）点击某个区域显示该天该区域的确诊人数、疑似人数、总人数（前7天）或预计风险等级（未来14天），以及	  预计疫情爆发时间

4）点击某个区域显示与该区域相关系数最高的三个区域，并用连线进行连接，连线颜色深浅代表相关系数的高低

5）右上角展示当前日期，总人口，当天全国确诊人数、疑似人数、确诊 + 疑似总人数以及较昨日的增值

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_1.png)

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo2_2.png)




## Demo3
**Dependencies**: 

MapBox API

**Functions**: 

1）将每个感染者的地理位置坐标点展示在地图上，根据密度形成热区

2）添加新加坡区域划分线，点击区域显示每个区感染人数

3）左上角设置时间滑条，可以拖动滑条查看前7天以及未来14天任意一天的感染者分布情况

4）右上角展示当前日期，总人口，当天全国确诊人数、疑似人数以及较昨日的增值

![](https://github.com/RainFZY/nCov-2020-SG/blob/master/images/demo3.png)
