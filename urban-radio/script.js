$.getScript("urban-radio/playlist.js", function(){


var songs = [
[52.3955048 , 13.1274601 ,"John W. Myers", "You're As Welcome As The Flowers In May", "https://archive.org/download/JohnW.Myers-YoureAsWelcomeAsTheFlowersInMay/JohnWMyers-YoureAsWelcomeAsTheFlowersInMay.mp3" , "Absolut geiler Song"] ,
[52.3924943 , 13.1175327 ,"Movement Museum", "April 16, 2009", "https://archive.org/download/20090416/20090416.mp3"                                                                                             , "Eskalieren!"] ,
[52.3844169 , 13.1159965 ,"Yerkes Southern Five", "Railroad Blues", "https://archive.org/download/YerkesSouthernFiveRailroadBlues1920/Yerkes_Southern_Five-Railroad_Blues-1920.mp3"                             , "Den hab ich immer mit meiner Tante gehört."] ,
[52.406968  , 13.0918544 ,"Carlo Serafini", "Someone to watch over me", "https://archive.org/download/someonetowatchoverme/someonetowatchoverme.mp3"                                                            , "Prüfungszeit"] ,
[52.406968  , 13.0918544 ,"Celin Dion", "If I Could", "https://ia600806.us.archive.org/15/items/Mp3Playlist_555/CelineDion-IfICould.mp3"                                                                        , "Celin <3"] ,
[52.206968  , 13.1018544 ,"Toni Gonzaga", "We Belong", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/ToniGonzaga-WeBelong.mp3"                                                                      , "Erstes Mal gehört, sofort verliebt."] ,
[52.400194  , 13.1374956 ,"Aaron Neville", "Crazy Love", "https://archive.org/download/Mp3Playlist_555/AaronNeville-CrazyLove.mp3"                                                                              , "Musik am See"] ,
[51.4089    , 12.09      ,"Martin Nievera", "The Road Of Our Lives", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/MartinNievera-TheRoadOfOurLives.mp3"                                             , "Warum finde ich das so gut?"],
[51.2       , 12.10      ,"John Pagano", "Change In my Life", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/JohnPagano-changeInMyLife.mp3"                                                          , "Wo bin ich?"],
[52.3918982 , 13.12999   ,"Eagle Eye Cherry", "Save Tonight", "http://8tracks.s3.amazonaws.com/tf/028/707/588/48436.mp3"                                                                                        , "Zu Hause"] ,
[40.3955048 , 8.1274601 ,"John W. Myers", "You're As Welcome As The Flowers In May", "https://archive.org/download/JohnW.Myers-YoureAsWelcomeAsTheFlowersInMay/JohnWMyers-YoureAsWelcomeAsTheFlowersInMay.mp3" , "Absolut geiler Song"] ,
[10.3924943 , 100.1175327 ,"Movement Museum", "April 16, 2009", "https://archive.org/download/20090416/20090416.mp3"                                                                                             , "Eskalieren!"] ,
[49.3844169 , -130.1159965 ,"Yerkes Southern Five", "Railroad Blues", "https://archive.org/download/YerkesSouthernFiveRailroadBlues1920/Yerkes_Southern_Five-Railroad_Blues-1920.mp3"                             , "Den hab ich immer mit meiner Tante gehört."] ,
[33.406968  , 21.0918544 ,"Carlo Serafini", "Someone to watch over me", "https://archive.org/download/someonetowatchoverme/someonetowatchoverme.mp3"                                                            , "Prüfungszeit"] ,
[10.406968  , -170.0918544 ,"Celin Dion", "If I Could", "https://ia600806.us.archive.org/15/items/Mp3Playlist_555/CelineDion-IfICould.mp3"                                                                        , "Celin <3"] ,
[52.206968  , 5.1018544 ,"Toni Gonzaga", "We Belong", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/ToniGonzaga-WeBelong.mp3"                                                                      , "Erstes Mal gehört, sofort verliebt."] ,
[26.400194  , 160.1374956 ,"Aaron Neville", "Crazy Love", "https://archive.org/download/Mp3Playlist_555/AaronNeville-CrazyLove.mp3"                                                                              , "Musik am See"] ,
[12.4089    , 55.09      ,"Martin Nievera", "The Road Of Our Lives", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/MartinNievera-TheRoadOfOurLives.mp3"                                             , "Warum finde ich das so gut?"],
[45.2       , -90.10      ,"John Pagano", "Change In my Life", "https://ia800806.us.archive.org/15/items/Mp3Playlist_555/JohnPagano-changeInMyLife.mp3"                                                          , "Wo bin ich?"],
[21.3918982 , 66.12999   ,"Eagle Eye Cherry", "Save Tonight", "http://8tracks.s3.amazonaws.com/tf/028/707/588/48436.mp3"                                                                                        , "Zu Hause"] ,
]
  var mocked_url = "http://8tracks.s3.amazonaws.com/tf/028/707/588/48436.mp3";
  var mocked_comment = "mein absoluter Lieblingssong";

  var initial_location = L.latLng([52.39241,13.11978]);


  var radius = 1000;
  var area = L.circle(initial_location, radius, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5

  })

  function addCuratedContent() {
    var new_song         = [];
    var current_location = area.getLatLng();
    artist               = $('input.add-content-artist-song').val().split('-')[0];
    name                 = $('input.add-content-artist-song').val().split('-')[1];
    comment              = $('input.add-content-text').val();
    new_song             = [current_location.lat, current_location.lng, artist, name, mocked_url, comment] ;
    songs.push(new_song);
    L.marker(current_location).addTo(mymap)
    updatePlaylist();
  }

  $('form.add-content').on('submit', function(event) {
    event.preventDefault();
    addCuratedContent();
  });

  function updatePlaylist () {
    $('#playlist').empty();
    $('#playlist').append( "<thead><tr><th></th><th>Artist </th><th> Title</th><th>Distance</th></tr></thead>");
    var closest_songs = _.filter(songs, function(song) {
      c = L.latLng(song.slice(0,2));
      return c.distanceTo(area.getLatLng()) <= radius;
    });

    $('#playlist').append( "<tbody>");
    _.each(closest_songs, function(song) {
      c = L.latLng(song.slice(0,2));
      distance = c.distanceTo(area.getLatLng());
      $('#playlist').append( "<tr data-comment='"+ song[5] +"' ><td><a class='playlist-item-link glyphicon glyphicon-play-circle' href='"+ song[4]+"'/></td><td class='playlist-item-artist'>"+ song[2] +"</td><td class='playlist-item-song'>" + song[3] + "</td><td class='playlist-item-distance'>"+ Math.round(distance) + " m</td></tr>" );
    });
    $('#playlist').append( "</tbody>");
    playlistInit();
    changeTitle();
  }

  function onMapClick(e) {
    area.setLatLng(e.latlng); 
    updatePlaylist();
  }

  var mymap = L.map('mapid').setView(initial_location, 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(mymap);

  _.each(songs, function(song) {
    L.marker(song).addTo(mymap)
  });

  area.addTo(mymap);
  updatePlaylist();

  mymap.on('click', onMapClick);



});
