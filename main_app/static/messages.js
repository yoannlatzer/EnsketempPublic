$(function() {
	// use wss (secured web socket) if https is used
	var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";

	var socket = new WebSocket(ws_scheme + '://' + window.location.host + "/sensor_data/");
		
	socket.onmessage = function(message){
		//var msg = JSON.parse(message.data);
		var msg_array = message.data.split(" ");
		var temp_device_id = msg_array[1];

		$("#datarows").append('<tr>' + '<th scope="row">' + msg_array[0] + '</th>' 
					+ '<td>' + msg_array[1] + '</td>' 
					+ '<td>' + msg_array[2] + '</td>'
					+ '<td>' + msg_array[3] + '</td>' 
					+ '<td>' + msg_array[4]	+ '</td>' 
					+ '<td>' + msg_array[5] + '/' + msg_array[6] + '/' + msg_array[7] + ', ' +
					msg_array[8] + ' : ' + msg_array[9] + '</td>' 
					+ '</tr>');

		$("#" + temp_device_id + "-tbody").append('<tr>' + '<th scope="row">' + msg_array[0] + '</th>' 
					+ '<td>' + msg_array[1] + '</td>' 
					+ '<td>' + msg_array[2] + '</td>'
					+ '<td>' + msg_array[3] + '</td>' 
					+ '<td>' + msg_array[4]	+ '</td>' 
					+ '<td>' + msg_array[5] + '/' + msg_array[6] + '/' + msg_array[7] + ', ' +
					msg_array[8] + ' : ' + msg_array[9] + '</td>' 
					+ '</tr>');

		//if(msg_array[2] <= 10){		
		var marker = L.marker([msg_array[3], msg_array[4]], {icon: window[msg_array[1]+"Icon"]}).addTo(mymap);
		//}
		//else {
			//var marker = L.marker([msg_array[3], msg_array[4]], {icon: OrangeIcon}).addTo(mymap);
		//}
		marker.bindPopup(" ").openPopup();
		marker.bindPopup("<b>Sensor:</b>" + " " + msg_array[1] + "<br> <b>Temperature:</b>" + " " + msg_array[2] + " °C").openPopup();
		
		console.log(message.data);

		for(i = 0; i < barChart.data[0].dataPoints.length; i++){
			if(msg_array[1] == barChart.data[0].dataPoints[i].label){
				lastMeasurements[i] = [];
				lastMeasurements[i].push( msg_array[1], msg_array[2], msg_array[3], msg_array[4] );
				console.log("lastMeasurement updated:", lastMeasurements[i]);
				barChart.data[0].dataPoints[i].y = parseFloat(msg_array[2]);
				barChart.render();
			} 
		}

		lineChart.data[0].dataPoints.push({toolTipContent: msg_array[5] + "/" + msg_array[6] + "/" + msg_array[7] + " " + msg_array[8] + ":" + msg_array[9] , y: parseFloat(msg_array[2])});
		lineChart.render();
	}

	/*socket.onopen = function() {
	    socket.send("Hello from messages.js!");
	}*/

	if (socket.readyState == WebSocket.OPEN) socket.onopen()

})
