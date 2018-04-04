var mymap = L.map('mapid').setView([52.231774, 6.875124], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoieW9hbm5sYXR6ZXIiLCJhIjoiY2pjYnd6d3Q1MGw1bzJxcnFkNWczcTRsMCJ9.4nL1fGhpM_MyLDZJJHyQxQ'
}).addTo(mymap);

var nodeIcon = L.Icon.extend({
    options: {
        iconSize:     [25, 41], // size of the icon
    	iconAnchor:   [13, 41], // point of the icon which will correspond to marker's location
    	popupAnchor:  [0, -31] // point from which the popup should open relative to the iconAnchor
    }
});

var node_1Icon = new nodeIcon({iconUrl: node_1_img}),
	node_2Icon = new nodeIcon({iconUrl: node_2_img}),
	node_3Icon = new nodeIcon({iconUrl: node_3_img}),
	node_4Icon = new nodeIcon({iconUrl: node_4_img}),
	node_5Icon = new nodeIcon({iconUrl: node_5_img}),
	node_6Icon = new nodeIcon({iconUrl: node_6_img});

for(i = 0; i < 6; i++){
	if(lastMeasurements[i][0] != undefined){
		var name_Icon = lastMeasurements[i][0]+"Icon";
		var marker = L.marker([lastMeasurements[i][2], lastMeasurements[i][3]], {icon: window[name_Icon]}).addTo(mymap);
		marker.bindPopup("<b>Sensor:</b>" + " " + lastMeasurements[i][0] + 
					"<br> <b>Temperature:</b>" + " " + lastMeasurements[i][1] + " °C").openPopup();
		}		
}

var barChart = new CanvasJS.Chart("barchart", {
	animationEnabled: true,
	exportEnabled: true,
	backgroundColor: null,
	theme: "light2",
	title:{
		text: "Urban Heat Island"              
	},
	subtitles:[
		{
			text: "Latest measurements, each sensor represents a different zone",
			//Uncomment properties below to see how they behave
			//fontColor: "red",
			fontSize: 16
		}
	],
	axisY: {
		title: "Temperatures (°C)"
	},
	data: [              
	{
		// Change type to "doughnut", "line", "splineArea", etc.
		type: "column",
		dataPoints: [
			{ label: lastMeasurements[5][0],  y: parseFloat(lastMeasurements[5][1]), color: "#66ba6a", toolTipContent: "{y}, Rural"},
			{ label: lastMeasurements[4][0],  y: parseFloat(lastMeasurements[4][1]), color: "#ff8260", toolTipContent: "{y}, Suburban Residential"},
			{ label: lastMeasurements[0][0],  y: parseFloat(lastMeasurements[0][1]), color: "#ff7676", toolTipContent: "{y}, Urban Residential"},
			{ label: lastMeasurements[2][0],  y: parseFloat(lastMeasurements[2][1]), color: "#ee5250", toolTipContent: "{y}, Downtown/Commercial"},
			{ label: lastMeasurements[1][0],  y: parseFloat(lastMeasurements[1][1]), color: "#ff8260", toolTipContent: "{y}, Suburban Residential"},
			{ label: lastMeasurements[3][0],  y: parseFloat(lastMeasurements[3][1]), color: "#93ca63", toolTipContent: "{y}, Park"}
			
			]
	}
		]
	});
barChart.render();

last50data = []
for(i=0; i < past50Measurements.length; i++){
	last50data.push( {toolTipContent: past50Measurements[i][2] + ' ' + past50Measurements[i][1], y: parseFloat(past50Measurements[i][0]) } );
}

var lineChart = new CanvasJS.Chart("linechart", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light2",
	backgroundColor: null,
	title:{
		text: "Latest Temperature Measurements"
	},
	axisY:{
		title: "Temperatures (°C)",
		includeZero: false
	},
	data: [{        
		type: "line", 
		color: "#ee5250",      
		dataPoints: last50data
		
	}]
});
lineChart.render();


