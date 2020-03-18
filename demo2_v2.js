mapboxgl.accessToken = 'pk.eyJ1IjoicmFpbjNmenkiLCJhIjoiY2s2dDFycDJuMDR0dzNsbzRicmpmODRhNiJ9.1_na-eXgpWP7DbxkbZyJ2Q';

// 初始化界面
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
    center: [103.81,1.35],
    zoom: 11.1 // 越大，初始显示范围越小，缩放级别高
});



var dates = ['-7 Days','-6 Days','-5 Days','-4 Days','-3 Days','-2 Days','-1 Day',
    'Today',
    '+1 Day','+2 Days','+3 Days','+4 Days','+5 Days','+6 Days','+7 Days',
    '+8 Day','+9 Days','+10 Days','+11 Days','+12 Days','+13 Days','+14 Days',
];

function filterBy(date) {
     
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

    // 新加坡行政区划线数据
    map.addSource("route", {
        type: 'geojson',
        // chrome访问本地文件：https://blog.csdn.net/zhang_zhenwei/article/details/102486992?tdsourcetag=s_pctim_aiomsg
        // 不然无法加载data，提示CORS跨域故障，只能在js里面加入data，很麻烦
        data: './data/MP14_PLNG_AREA_WEB_PL.geojson'   
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

    map.addLayer({
        'id': 'district-heat',
        'type': 'fill',
        'source': "route",
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'Number'],
                // -1,'rgb(255,255,255)',
                // 0, 'rgb(255,239,213)', // PapayaWhip
                // 5, 'rgb(255,222,273)', // NavajoWhite
                // 10, 'rgb(255,236,139)', // LightGoldenrod1
                // 15, 'rgb(255,215,0)', // gold 1
                // 20, 'rgb(233,150,122)', // DarkSalmon
                // 25, 'rgb(255,48,48)', // Firebrick1
                // 35, 'rgb(178,34,34)', // Firebrick4
                // 40, 'rgb(139,58,58)' // IndianRed4
                0, '#F2F12D',
                5, '#EED322',
                10, '#E6B71E',
                15, '#DA9C20',
                20, '#CA8323',
                25, '#B86B25',
                30, '#A25626',
                35, '#8B4225',
                40, '#723122'
            ],
            'fill-opacity': 0.4
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



