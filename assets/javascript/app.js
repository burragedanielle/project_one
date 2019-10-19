
        var latitude;
        var longitude;

        $('#submit').on('click', function () {

            var cityName = $('#city-name').val();
            var stateID = $('#state-id').val();

            var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAsfStslT5FG6pcTk0tkIZrCzWXkwC6964&address=" + cityName + "|components=state:" + stateID;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)

                var latitude = response.results[0].geometry.location.lat;
                var longitude = response.results[0].geometry.location.lng;

                console.log(latitude);
                console.log(longitude);
                
                $("#lat").html(latitude);
                $("#long").html(longitude);
            
            callTimes();
            });
        });

       function callTimes() {
            var lat;
            var long;

            var lat = $("#lat").html();
            var long = $("#long").html();
            console.log(lat);
            console.log(long);
            // construct queryURL with latitude and longitude from Google
            var queryURL = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + long + "&formatted=0";
            // Sunrise-Sunset API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // console.log the JSON object response
                console.log(response);
                // instantiate the moment.js "moment" object for sunrise
                var localRiseTime = moment(response.results.sunrise).format("h:mm a");
                // console.log local sunrise time
                console.log("Local Sunrise at: " + localRiseTime);
                // instantiate the moment.js "moment" object for sunset
                var localSetTime = moment(response.results.sunset).format("h:mm a");
                // console.log local sunset time
                console.log("Local Sunset at: " + localSetTime);
                // instantiate the moment.js "moment" object for first golden hour, add one hour to localRiseTime
                var localGoldenRise = moment(response.results.sunrise).add(1, "hour").format("h:mm a");
                // instantiate the moment.js "moment" object for second golden hour, subtract one hour from localSetTime
                var localGoldenSet = moment(response.results.sunset).subtract(1, "hour").format("h:mm a");
                // write sunrise and sunset golden hours into the HTML
                $("#results").html(`<p>Local Morning Golden Hour is from: ${localRiseTime} - ${localGoldenRise}`);
                $("#results").append(`<p>Local Evening Golden Hour is from: ${localGoldenSet} - ${localSetTime}`);
            });
        };