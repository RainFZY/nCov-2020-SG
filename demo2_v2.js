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

var move_data_array = [{},{},{},{},{},{},{}]
var move_data = null;

// 添加数据
for(i = 0; i <= 1; i++){
    $.ajax({
        url: './data/day' + i.toString() + '.json',
        async: false,
        success: function (data) {
            move_data = data;
        }
    });
    move_data = JSON.parse(move_data); // 把读取到的string格式转化成json对象
    move_data_array.push(move_data)
}


// console.log(district_center["1"][0])

// 根据滑条的date的filter
function filterBy(date) {
     
    // Set the label to the date
    document.getElementById('date').textContent = dates[date];
    // console.log(date)

    // 根据拖动条显示具体日期
    var day = new Date();
    day.setDate(day.getDate() + (date - 7));
    $("#getDate").html(day.getFullYear() + "." + (day.getMonth() + 1) 
    + "." + day.getDate() + " " + ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][day.getDay()]);

    move_data = move_data_array[date]

    var filters = ['==', 'date', date];
    // 分别对两个层进行filt
    map.setFilter('district-heat', filters);
}


map.on('load', function() {

    // 新加坡行政区划线数据
    map.addSource("route", {
        type: 'geojson',
        // chrome访问本地文件：https://blog.csdn.net/zhang_zhenwei/article/details/102486992?tdsourcetag=s_pctim_aiomsg
        // 不然无法加载data，提示CORS跨域故障，只能在js里面加入data，很麻烦
        // data: './data/MP14_PLNG_AREA_WEB_PL.geojson' 
        data: './data/areas.geojson'  
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
    // 区域热力层
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
        "3":[103.82274838244598, 1.2749684425470633],
        "9":[103.74817602891096, 1.3846583982316076],
        "5":[103.78957541982544, 1.3285417039798233],
        "6":[103.79974939342134, 1.3794621339721118],
        "7":[103.99730858626111, 1.351221042311991],
        "22":[103.7295968044445, 1.3638428426347105],
        "13":[103.94637588472671, 1.3755593405924884],
        "16":[103.81856363373589, 1.4546570727938786],
        "17":[103.92747632881674, 1.3233597964841834],
        "18":[103.7014076363119, 1.314525274193457],
        "24":[103.69211802415697, 1.382984756178118],
        "25":[103.8362362903257, 1.4134547469185748],
        "26":[103.85336957871476, 1.283350728290472],
        "28":[103.83878805667746, 1.3081329769294427],
        "29":[103.83295544787694, 1.3037596565919074],
        "30":[103.7877527295708, 1.4400577741308922],
        "31":[103.86503479633978, 1.2800707066957102],
        "34":[103.7360034336092, 1.3222111943267407],
        "35":[103.71902586647309, 1.4303795228347553],
        "4":[103.77171305533938, 1.3657143075377434],
        "37":[103.89565599260851, 1.3004796613457614],
        "38":[103.96370457205313, 1.4101449156813146],
        "39":[103.67353879962286, 1.315165768413479],
        "41":[103.78483642515857, 1.2891818673922444],
        "42":[103.83404906203452, 1.2432612902683218],
        "43":[103.62869239576975, 1.2808990986125792],
        "45":[103.8657638724369, 1.3103196342413241],
        "46":[103.85008873626595, 1.441515465321686],
        "48":[103.9540638396681, 1.3422542391259356],
        "49":[103.6930790184622, 1.2684092632562738],
        "55":[103.85774403532122, 1.2709595136241632],
        "1":[103.83988167083504, 1.354781247826807],
        "2":[103.75421522888979, 1.3566034278823764],
        "8":[104.02027614702439, 1.320991014953833],
        "10":[103.76114145187188, 1.3157862691688962],
        "11":[103.88909430771093, 1.3208884509507755],
        "12":[103.83587175228917, 1.3234395379276123],
        "14":[103.91370207619406, 1.358266364454849],
        "15":[103.87590296437406, 1.4133472575323083],
        "19":[103.88711456534259, 1.3906105326837093],
        "20":[103.86693368359505, 1.364350944319682],
        "21":[103.84133982305315, 1.380291643036486],
        "23":[103.86211849195149, 1.3372882498369307],
        "27":[103.87159648126135, 1.2880885298208682],
        "32":[103.84607881769608, 1.2961063277299303],
        "33":[103.88743489680729, 1.3617890178194898],
        "36":[103.80342786576574, 1.421836555767996],
        "40":[103.91017843018801, 1.4053413937046173],
        "44":[103.70461095087433, 1.3427068634843664],
        "47":[103.75618431533576, 1.4182831395329032],
        "50":[103.8154576214273, 1.307039647552699],
        "51":[103.84097528499268, 1.281892941432389],
        "52":[103.833684523974, 1.2975641064343222],
        "53":[103.85118235042353, 1.3037596565919074],
        "54":[103.84279797524732, 1.2906396500863195],
    }

    district_name = {
        "3":"BUKIT MERAH",
        "9":"CHOA CHU KANG",
        "5":"BUKIT TIMAH",
        "6":"CENTRAL WATER CATCHMENT",
        "7":"CHANGI",
        "22":"TENGAH",
        "13":"PASIR RIS",
        "16":"SEMBAWANG",
        "17":"BEDOK",
        "18":"BOON LAY",
        "24":"WESTERN WATER CATCHMENT",
        "25":"YISHUN",
        "26":"DOWNTOWN CORE",
        "28":"NEWTON",
        "29":"ORCHARD",
        "30":"WOODLANDS",
        "31":"MARINA SOUTH",
        "34":"JURONG EAST",
        "35":"LIM CHU KANG",
        "4":"BUKIT PANJANG",
        "37":"MARINE PARADE",
        "38":"NORTH-EASTERN ISLANDS",
        "39":"PIONEER",
        "41":"QUEENSTOWN",
        "42":"SOUTHERN ISLANDS",
        "43":"TUAS",
        "45":"KALLANG",
        "46":"SIMPANG",
        "48":"TAMPINES",
        "49":"WESTERN ISLANDS",
        "55":"STRAITS VIEW",
        "1":"BISHAN",
        "2":"BUKIT BATOK",
        "8":"CHANGI BAY",
        "10":"CLEMENTI",
        "11":"GEYLANG",
        "12":"NOVENA",
        "14":"PAYA LEBAR",
        "15":"SELETAR",
        "19":"SENGKANG",
        "20":"SERANGOON",
        "21":"ANG MO KIO",
        "23":"TOA PAYOH",
        "27":"MARINA EAST",
        "32":"MUSEUM",
        "33":"HOUGANG",
        "36":"MANDAI",
        "40":"PUNGGOL",
        "44":"JURONG WEST",
        "47":"SUNGEI KADUT",
        "50":"TANGLIN",
        "51":"OUTRAM",
        "52":"RIVER VALLEY",
        "53":"ROCHOR",
        "54":"SINGAPORE RIVER",
    }


    var popup = new mapboxgl.Popup({className: 'popup', closeOnMove: false, closeOnClick: false})


    layer_index = 0 // 给move箭头的layer计数，从1开始一直累加
    // 点击区域显示信息
    map.on('click', "district", function (e) {

        // alert(e.lngLat); // 点击地图后显示当前经纬度
        // console.log(e.features[0].properties.Center)
        
        // 清除上一次点击生成的layer
        for(i = 0; i < 3; i++){
            if (map.getLayer('arrow' + (layer_index - i).toString())) {
                // console.log("yes")
                // console.log(layer_index - i)
                map.removeLayer('arrow' + (layer_index - i).toString());
            }
        }
        
        district_index = e.features[0].properties.Index
        console.log("--------------------")
        console.log("District", district_index, ":")


        // 提取该区域对应的人流移动字典中相关系数最大的三个的区域（不包括自己）的标号，放入一个数组中
        var dict = move_data[district_index]
        // Create items array
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        // 取出value最大的2-4（排除自己）
        max_move_array = items.slice(1, 4)
        // console.log(max_move_array
        var max_move_index = []
        for(i = 0; i < 3; i++){
            max_move_index.push(max_move_array[i][0])
        }
        // console.log(max_move_index);

        popup_inf = '' // popup框的内容
        // 每次添加一条直线作为一个layer
        for(i = 0; i < 3; i++){
            layer_index += 1;

            // move_to_district_index = Object.keys(move_data[district_index])[i]
            move_to_district_index = max_move_index[i]
            correlation_coefficient = move_data[district_index][move_to_district_index]
            console.log("To No.", move_to_district_index, "Correlation Coefficient: ", correlation_coefficient)
            
            popup_inf += '<font size="2" color="black">' + "To " + '</font>' +
                '<b>' + district_name[move_to_district_index] + '</b>' + ": " +
                '<font size="2" color="orange">' + (correlation_coefficient * 100).toFixed(2).toString() + "%" + '</font>' + '<br>'

            map.addLayer({
                "id": "arrow" + layer_index.toString(),
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {"Correlation Coefficient": correlation_coefficient},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [district_center[district_index][0], district_center[district_index][1]],
                                // [district_center[move_data[district_index][i]][0], district_center[move_data[district_index][i]][1]]
                                [
                                    district_center[move_to_district_index][0], 
                                    district_center[move_to_district_index][1]
                                ]
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
                        ['get', 'Correlation Coefficient'],
                        0, 'rgba(255,255,255,0)',
                        0.02, 'rgba(255,255,255,0)',
                        0.02001, '#F2F12D',
                        0.03, '#EED322',
                        0.04, '#E6B71E',
                        0.05, '#DA9C20',
                        0.06, '#CA8323',
                        0.07, '#B86B25',
                        0.08, '#A25626',
                        0.09, '#8B4225',
                        0.1, '#723122'
                    ],
                    'line-opacity': 1,
                    "line-width": 8
                }
            });
        }

        popup
            .setLngLat(e.lngLat)
            .setHTML(
            // '<font size="2" color="blue">' + 'District No: ' + e.features[0].properties.Index + '<br>' + 
            '<font size="2" color="blue">' + e.features[0].properties.Name + '</font>'+ '<br>' + 
            'Number of infected cases: ' + 
            '<font size="2" color="red">' + e.features[0].properties.Number + '</font>' + '<br>' +
            popup_inf
            // 'Crowd moved to: ' + e.features[0].properties.move
        )
            .setMaxWidth("500px")
            .addTo(map)
    });
    
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', "district", function () {
        map.getCanvas().style.cursor = 'pointer';
    });
        
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', "district", function () {
        map.getCanvas().style.cursor = '';
        // popup.remove();
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
        
        // 拖动滑条删除上一天的连线和popup框
        for(i = 0; i < 3; i++){
            if (map.getLayer('arrow' + (layer_index - i).toString())) {
                // console.log("yes")
                // console.log(layer_index - i)
                map.removeLayer('arrow' + (layer_index - i).toString());
            }
        }
        popup.remove();
    });

});



