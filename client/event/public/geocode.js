function initMap(){
var lat = Center.lat
var lng = Center.lng
var center = {lat:lat, lng:lng}
var map = new google.maps.Map(document.getElementById('map'), {
    zoom:8,
    center: center,
    scrollwheel:false
})
var marker = new google.maps.Marker({
    position: center,
    map: map
})
marker.addListener('click', function(){
    infowindow.open(map, marker)
})
}