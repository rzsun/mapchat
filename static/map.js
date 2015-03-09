function initialize() {
    var mapOptions = {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
	});
}
google.maps.event.addDomListener(window, 'load', initialize);


function placeMarker(location) {
	//Make new marker
	var marker = new google.maps.Marker({
    	position: location,
    	map: map
    });

	//Create the popup
	var contentString = '<div id="content">'
					+ '<form id="mform">'
					+ 'Title: <input id="mtitle" type="text">'
					+ 'Text: <input id="mtext" type="text">'
					+ '<input type="submit" id="mform" value="Post" />'
					+ '</form>'
					+ '</div>';

	var popup = new google.maps.InfoWindow({
    	content: contentString
	});

	//Add listner to open popup when marker is clicked
	google.maps.event.addListener(marker, 'click', function(event){
        popup.open(map, this);
	});

	//When popup is loaded, add listener to submit button
	google.maps.event.addListener(popup, 'domready', function() {
    	$("#mform").submit(function(event){
    		event.preventDefault();
    		var data = {
    			title: $('#mtitle').val(),
    			text: $('#mtext').val(),
    			lat: location.lat(),
    			lng: location.lng(),
    			created: currentTime()
    		};

    		$.ajax({
    			url: "/api/messages/",
    			type: 'post',
    			dataType: 'json',
    			success: function(data){
    				console.log(data);
    			},
    			data: JSON.stringify(data)
    		})
    	});
	});
}

function currentTime(){
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
				+ (currentdate.getMonth()+1) + "-"
				+ currentdate.getDate() + "T"
				+ currentdate.getHours() + ":"
				+ currentdate.getMinutes() + ":"
				+ currentdate.getSeconds();
    return datetime;
}