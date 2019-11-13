$('#submit').on('click', function () {
    event.preventDefault();

    var cityName = '';

    cityName = $('#city-name').val().trim();

    var queryURL = 'https://api.imgur.com/3/gallery/search/?q_all=' + cityName + ' sunset';

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": queryURL,
        "method": "GET",
        "headers": {
            "authorization": "Client-ID a9743c075a691c1"
        }
    }

    $.ajax(settings).done(function (response) {

        var imageArray = [];

        var photoHTML = '<ul class= column>';
        //Loop through JSON data

        $.each(response.data, function (i, obj) {

            if (obj.is_album) {
                if (obj.images[0].type === "image/jpeg" || obj.images[0].type === "image/png") {
                    imageArray.push(response.data[i])
                }
            }
            else {
                if (obj.type === "image/jpeg" || obj.type === "image/png") {
                    imageArray.push(response.data[i])
                }
            }
            
        })

        $.each(imageArray, function (i, obj) {
            if (!obj.is_album) {
                photoHTML += '<li>';
                photoHTML += '<img src="' + obj.link + '"></li>';
            }
            if (obj.is_album) {
                photoHTML += '<li>';
                photoHTML += '<img src="' + obj.images[0].link + '"></li>'
            }
        }); // end each

        photoHTML += '</ul>';
        $('#sunPictures').html(photoHTML);

    })
});