document.getElementById("userData").onclick = function() {placeData()};
function placeData(){
    $('.placeDiv').append('<div class="container">\n' +
        '    <ul class="list-group">\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.Name}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.Category}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.Length}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.Grade}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.EstimatedTime}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.Likes}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.MapLatitude}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.MapLongitude}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.MarkerLatitude}}</div>\n' +
        '        </li>\n' +
        '        <li class="list-group-item">\n' +
        '            <div>{{place.MarkerLongitude}}</div>\n' +
        '        </li>\n' +
        '/images/national_park_{{place.NumberOfImage}}.jpg' +
        '    </ul>\n' +
        '</div>');

}