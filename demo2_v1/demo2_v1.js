mapboxgl.accessToken = 'pk.eyJ1IjoicmFpbjNmenkiLCJhIjoiY2s2dDFycDJuMDR0dzNsbzRicmpmODRhNiJ9.1_na-eXgpWP7DbxkbZyJ2Q';

// 初始化界面
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
    center: [103.81,1.35],
    zoom: 11.1 // 越大，初始显示范围越小，缩放级别高
});

// 数据点data
var points_data = []
for(i=0;i<22;i++){
    for(j=0;j<(i+1)*10;j++){
        var e_longitude = 103.66 + 0.27 * Math.random(); // 东经103.66-东经103.93
        var n_latitude = 1.3 + 0.11 * Math.random(); // 北纬1.39-北纬1.41
        points_data.push({"type": "Feature", "properties": {"date": i}, "geometry": {"type": "Point", "coordinates": [e_longitude,n_latitude]}})
    }
}

var dates = ['-7 Days','-6 Days','-5 Days','-4 Days','-3 Days','-2 Days','-1 Day',
    'Today',
    '+1 Day','+2 Days','+3 Days','+4 Days','+5 Days','+6 Days','+7 Days',
    '+8 Day','+9 Days','+10 Days','+11 Days','+12 Days','+13 Days','+14 Days',
];

function filterBy(date) {
 
    var filters = ['==', 'date', date];
    map.setFilter('heat', filters);
    map.setFilter('point', filters);
    
    // Set the label to the date
    document.getElementById('date').textContent = dates[date];
    // console.log(date)

    // 根据拖动条显示具体日期
    var day = new Date();
    day.setDate(day.getDate() + (date - 7));
    $("#getDate").html(day.getFullYear() + "." + (day.getMonth() + 1) 
    + "." + day.getDate() + " " + ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][day.getDay()]);
}


map.on('load', function() {

    var data =  points_data
    
    map.addSource('nCov-sg', {
    type: 'geojson',
    data: {
        "type": "FeatureCollection",
        "features": data // 初始设置为加载最早日期的数据
        //    [
        //        {"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": [103.81,1.35]}},
        //        {"type": "Feature", "properties": {}, "geometry": {"type": "Point", "coordinates": [103.84,1.37]}}
    }
    });

    // 热层
    map.addLayer({
        "id": "heat", 
        "type": "heatmap",
        "source": "nCov-sg",
        "maxzoom": 20, // 改这里
        "paint": {
            // Increase the heatmap weight based on frequency and property magnitude
            // 获取一个要素的mag属性的值来设置每一个点对热力图强度的贡献
            // 当mag的数值在0~6之间的时候对热力图强度贡献为从0到1进行线性贡献，大于6表示贡献为1，小于0表示无贡献
            "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0, 0,
                6, 1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            // 根据地图的缩放级别类设置热力图的强度
            // 当缩放级别在0~9之间进行线性变化的时候，热力图的强度从1~3进行线性变化，小于0是 强度为0，大于9时强度为3
            "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                20, 3 // 改这里，后面的数越大效果越明显
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            // 设置热力图的颜色，热力图是颜色在强度在给定的两个范围进颜色记性线性变化
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
            ],
            // Adjust the heatmap radius by zoom level
            // 设置在不同缩放级别的时候更改热力图计算的半径
            "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 20,
                20, 30 // 红色热区的大小
            ],
            // Transition from heatmap to circle layer by zoom level
            // 设置热力图的透明度，是整体图形的透明度，在zoom处于7~9间将热力图逐渐的透明，在zoom大于9的时候完全透明
            "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11.1, 1,
                20, 0 // 改这里
            ],
        }
    }, 'waterway-label');
    

    // 点层
    map.addLayer({
        "id": "point",
        "type": "circle",
        "source": "nCov-sg",
        "minzoom": 7,
        "paint": {
            // Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, [
                    "interpolate",
                    ["linear"],
                    ["get", "mag"],
                    1, 1,
                    6, 4
                ],
                16, [
                    "interpolate",
                    ["linear"],
                    ["get", "mag"],
                    1, 5,
                    6, 50
                ]
            ],
            // Color circle by earthquake magnitude
            "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, "rgba(33,102,172,0)",
                2, "rgb(103,169,207)",
                3, "rgb(209,229,240)",
                4, "rgb(253,219,199)",
                5, "rgb(239,138,98)",
                6, "rgb(178,24,43)"
            ],
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            // Transition from heatmap to circle layer by zoom level
            "circle-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 0,
                8, 1
            ]
        }
    }, 'waterway-label');

    // 新加坡行政区划线数据
    map.addSource("route", {
        type: 'geojson',
        // chrome访问本地文件：https://blog.csdn.net/zhang_zhenwei/article/details/102486992?tdsourcetag=s_pctim_aiomsg
        // 不然无法加载data，提示CORS跨域故障，只能在js里面加入data，很麻烦
        data: '../data/MP14_PLNG_AREA_WEB_PL.geojson'   
    })
    // 区域划分线层
    map.addLayer({                 /* 为地图添加layer */
        "id": "district",             /* layer id是route */
        "type": "fill",            /* line类型layer*/
        "source": "route",         /* 资源引用的是上面定义的source*/
        // "layout": {
        //     "line-join": "round",  /* 线条相交的形状 */
        //     "line-cap": "round"    /* 线条末端形状 */
        // },
        "paint": {
            'fill-color': 'rgba(255,0,0, 0)', // 最后一个是alpha透明度
            "fill-outline-color": "rgba(255,255,0,1)",  /* 线条颜色 */
            // "line-width": 2        /* 线条宽度 */
        }
    });

    
    count = 0
    // 点击区域显示信息
    map.on('click', "district", function (e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<font size="2" color="blue">' + e.features[0].properties.Name + '</font>'+ '<br>' + 
            'Number of infected cases: ' + 
            '<font size="2" color="red">' + e.features[0].properties.Number + '</font>'
        )
        .addTo(map);
        
        // alert(e.lngLat); // 点击地图后显示当前经纬度
        // console.log(e.features[0].properties.Center)
        
        // 清除上一次点击生成的layer
        if (map.getLayer('arrow' + (count - 1).toString())) map.removeLayer('arrow' + (count - 1).toString());

        // var line = turf.lineString([
        //     [103.79974939342134, 1.3794621339721118],
        //     [103.81,1.35],
        //   ]);
          
        // var curved = turf.bezierSpline(line);
        // console.log(curved.geometry.coordinates)

        map.addLayer({
            "id": "arrow" + count.toString(),
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [
                            [Number(e.features[0].properties.lng), Number(e.features[0].properties.lat)],
                            [103.66 + 0.27 * Math.random(), 1.3 + 0.11 * Math.random()],
                            [Number(e.features[0].properties.lng), Number(e.features[0].properties.lat)],
                            [103.66 + 0.27 * Math.random(), 1.3 + 0.11 * Math.random()],
                            [Number(e.features[0].properties.lng), Number(e.features[0].properties.lat)],
                            [103.66 + 0.27 * Math.random(), 1.3 + 0.11 * Math.random()]
                            // [103.79974939342134, 1.3794621339721118]
                        ]
                    }
                },
                "lineMetrics": true
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#FF4040",
                "line-width": 8,
                'line-opacity': .5
            }
        });

        count += 1
    });
        
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', "district", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
        
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', "district", function () {
        map.getCanvas().style.cursor = '';
    });

    filterBy(7);
    // 滑条拖动事件
    document.getElementById('slider').addEventListener('input', function(e) {
        var date = parseInt(e.target.value, 10);
        filterBy(date);
        if(date > 7){
            $("#text1").html("cases predicted:");
            $("#text2").html("cases predicted:");
        }
        else{
            $("#text1").html("cases:");
            $("#text2").html("cases:");
        }
        // console.log(date)
    });

});



