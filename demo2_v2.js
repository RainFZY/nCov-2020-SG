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

    district_center = {
        "1":[103.82274838244598, 1.2749684425470633],
        "2":[103.74817602891096, 1.3846583982316076],
        "3":[103.78957541982544, 1.3285417039798233],
        "4":[103.79974939342134, 1.3794621339721118],
        "5":[103.99730858626111, 1.351221042311991],
        "6":[103.7295968044445, 1.3638428426347105],
        "7":[103.9463758847267, 1.3755593405924884],
        "8":[103.81856363373589, 1.4546570727938786],
        "9":[103.92747632881674, 1.3233597964841834],
        "10":[103.7014076363119, 1.314525274193457],
        "11":[103.69211802415697, 1.382984756178118],
        "12":[103.8362362903257, 1.4134547469185748],
        "13":[103.85336957871476, 1.283350728290472],
        "14":[103.83878805667746, 1.3081329769294427],
        "15":[103.83295544787694, 1.3037596565919074],
        "16":[103.7877527295708, 1.4400577741308922],
        "17":[103.86503479633978, 1.2800707066957102],
        "18":[103.7360034336092, 1.3222111943267407],
        "19":[103.71902586647309, 1.4303795228347553],
        "20":[103.77171305533938, 1.3657143075377434],
        "21":[103.89565599260851, 1.3004796613457614],
        "22":[103.96370457205313, 1.4101449156813146],
        "23":[103.67353879962286, 1.315165768413479],
        "24":[103.78483642515857, 1.2891818673922444],
        "25":[103.83404906203452, 1.2432612902683218],
        "26":[103.62869239576975, 1.2808990986125792],
        "27":[103.8657638724369, 1.3103196342413241],
        "28":[103.85008873626595, 1.441515465321686],
        "29":[103.9540638396681, 1.3422542391259356],
        "30":[103.6930790184622, 1.2684092632562738],
        "31":[103.85774403532122, 1.2709595136241632],
        "32":[103.83988167083504, 1.354781247826807],
        "33":[103.75421522888979, 1.3566034278823764],
        "34":[104.02027614702439, 1.320991014953833],
        "35":[103.76114145187188, 1.3157862691688962],
        "36":[103.88909430771093, 1.3208884509507755],
        "37":[103.83587175228917, 1.3234395379276123],
        "38":[103.91370207619406, 1.358266364454849],
        "39":[103.87590296437406, 1.4133472575323083],
        "40":[103.88711456534259, 1.3906105326837093],
        "41":[103.86693368359505, 1.364350944319682],
        "42":[103.84133982305315, 1.380291643036486],
        "43":[103.86211849195149, 1.3372882498369307],
        "44":[103.87159648126135, 1.2880885298208682],
        "45":[103.84607881769608, 1.2961063277299303],
        "46":[103.88743489680729, 1.3617890178194898],
        "47":[103.80342786576574, 1.421836555767996],
        "48":[103.91017843018801, 1.4053413937046173],
        "49":[103.70461095087433, 1.3427068634843664],
        "50":[103.75618431533576, 1.4182831395329032],
        "51":[103.8154576214273, 1.307039647552699],
        "52":[103.84097528499268, 1.281892941432389],
        "53":[103.833684523974, 1.2975641064343222],
        "54":[103.85118235042353, 1.3037596565919074],
        "55":[103.84279797524732, 1.2906396500863195],
    }

    move_to = {
        "1":[2,3,4],
        "2":[10,11],
        "3":[],
        "4":[1,2,3,5,6]
    }
    // console.log(district_center["1"][0])



    layer_index = 0 // 给move箭头的layer计数，从1开始一直累加
    move_num = 0 // 每个区域向外指的箭头的个数，初始化为0
    // 点击区域显示信息
    map.on('click', "district", function (e) {

        // console.log(e.features[0].properties.lng)
        // console.log(typeof(e.features[0].properties.lng))


        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
            '<font size="2" color="blue">' + e.features[0].properties.Name + '</font>'+ '<br>' + 
            'Number of infected cases: ' + 
            '<font size="2" color="red">' + e.features[0].properties.Number + '</font>' + '<br>'
            // 'Crowd moved to: ' + e.features[0].properties.move
        )
        .addTo(map);
        
        // alert(e.lngLat); // 点击地图后显示当前经纬度
        // console.log(e.features[0].properties.Center)
        
        // 清除上一次点击生成的layer
        for(i = 0; i < move_num; i++){
            if (map.getLayer('arrow' + (layer_index - i).toString())) {
                console.log("yes")
                console.log(layer_index - i)
                map.removeLayer('arrow' + (layer_index - i).toString());
            }
        }
        

        // var line = turf.lineString([
        //     [103.79974939342134, 1.3794621339721118],
        //     [103.81,1.35],
        //   ]);
          
        // var curved = turf.bezierSpline(line);
        // console.log(move_to[e.features[0].properties.Number].length)
        move_num = move_to[e.features[0].properties.Number].length
        for(i = 0; i < move_num; i++){
            layer_index += 1;
            console.log(layer_index)
            map.addLayer({
                "id": "arrow" + layer_index.toString(),
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {"Number":e.features[0].properties.Number},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [district_center[e.features[0].properties.Number][0], district_center[e.features[0].properties.Number][1]],
                                [district_center[move_to[e.features[0].properties.Number][i]][0], district_center[move_to[e.features[0].properties.Number][i]][1]]
                                // [103.66 + 0.27 * Math.random(), 1.3 + 0.11 * Math.random()],
                                // [(e+1).features[0].properties.lng, (e+1).features[0].properties.lat]
                                // [103.79974939342134, 1.3794621339721118]
                            ],                                                    
                        }
                    },
                    "lineMetrics": true
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                // "paint": {
                //     "line-color": "#FF4040",
                //     "line-width": 8,
                //     'line-opacity': .5
                // }
                'paint': {
                    'line-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'Number'],
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
                    'line-opacity': 1,
                    "line-width": 8
                }
            });
        }

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



