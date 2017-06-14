$(function () {
    
    //Getting the listing of films on document ready
    getFilmsData();

    $(document).on('click', '.open-details', function () {
        var url = $(this).data("url")
        getFilmsDataById(url)

    });

    //For closing modal
    $(document).on('click', '.modal .close', function () {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    });

    //For detecting escape key clicked
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
        }

    });

})

var getFilmsData = function () {
    var xmlRequest = new XMLHttpRequest();
    xmlRequest.type = "GET";

    xmlRequest.onload("",)
    $.ajax({
        type: "GET",
        url: "https://ghibliapi.herokuapp.com/films/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (filmData) {
            var container = $('#app'),
                table = $('<table class="table-films">');

            var tr = $('<tr>');

            tr.append('<th>Title</th><th>Description</th><th>Director</th><th>Producer</th><' +
                    'th>Release Date</th><th>Score</th>')

            table.append(tr);

            filmData.forEach(function (film) {
                var tr = $('<tr>');
                [
                        'title',
                        'description',
                        'director',
                        'producer',
                        'release_date',
                        'rt_score'
                    ].forEach(function (attr) {
                    if (attr === "title") {
                        tr.append('<td class="open-details" data-url=' + film["url"] + '><a href="#">' + film[attr] + '</a></td>');
                    } else {
                        tr.append('<td>' + film[attr] + '</td>');
                    }
                });
                table.append(tr);
            });
            container.append(table);

        }
    });
}

var getFilmsDataById = function (url) {
    return ($.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (filmData) {
            var modal = document.getElementById('myModal');
            modal.style.display = "block";

            var container = $('#film-details');
            container.html("")
            for (var i in filmData) {
                var Title = i.toUpperCase()
                var div = $("<div class='film-detail-row'><span class='film-title'>" + Title + "</span>&nbsp;&nbsp;" + filmData[i] + "</div>")

                container.append(div)
            }

        }
    });
}

function Parent() {

  this.eyeColor= "black";

}

Parent.prototype.getChild = function() {

}

 
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
