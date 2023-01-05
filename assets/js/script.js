var youtubeKey="AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

//Hardcode Variables for testing
var movieName="Kaguya-sama: Love Is War";
var movieId='uMIsXdoj2vU';

//Example of youtube API call with Name of movie + trailer
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=Kaguya-sama: Love Is Wartrailer&type=video&key=AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ

//Example of YouTube url using id from The MovieDB API 
//https://www.youtube.com/watch?v=uMIsXdoj2vU


function getYoutubeVideo(movieName) {
   
    $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
        .then(function (data) {
          
            console.log(data);
            //If the movie was found calls function to show video
            displayYoutubeVideo(`https://www.youtube.com/watch?v=${movieId}`);    
           
        });






}

