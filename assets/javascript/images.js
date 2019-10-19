$('#submit').on('click', function () {
    event.preventDefault();

    var cityName = ''; 

    cityName = $('#city-name').val().trim();

    console.log(cityName);

    var queryURL = 'https://api.imgur.com/3/gallery/search/?q_all=' + cityName + ' sunset';

    console.log(queryURL);


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

        var photoHTML = '<ul class= images>';
        //Loop through JSON data
        $.each(response.data, function (i, images) {
            if (!images.is_album) {
                photoHTML += '<li>';
                photoHTML += '<img src="' + images.link + '"></li>';
            }
            if (images.is_album) {
                $.each(images.images, function (i, albumImages) {
                    photoHTML += '<li>';
                    photoHTML += '<img src="' + albumImages.link + '"></li>';
                });
            }
        }); // end each

        photoHTML += '</ul>';
        $('#lat').html(photoHTML);

    })
});