const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e"
var baseURL = "https://api.themoviedb.org/3/"
var MediaType = "tv"


/********************************YOUTUBE API******************************************** */
var youtubeKey = "AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

//Hardcode Variables for testing
var movieName = "Kaguya-sama: Love Is War";
var movieId = 'uMIsXdoj2vU';

/******************************************************************************************* */
 TopTVShowPickoftheDay().then(test)

/*Get the daily trending items name array*/
function TopTVShowPickoftheDay() {
    var URLOption = `${baseURL}trending/${MediaType}/day?api_key=${TMDB_APIKey}`
    let tempArr = []
    return $.get(URLOption)
        .then(function (data)
         {
            let showList = data.results;            
            for (var i = 0; i < showList.length; i++) {
                tempArr.push(showList[i].name)
            }           
           return tempArr
        }, function (data) {
            console.log(data.responseJSON["status_message"])
        }
        )   
}
function test(tempArr)
{
    console.log("accessing the item:" ,tempArr)
}
/** Get the list of official genres for TV shows. */
function getCategoryList() {
    var categoryURL = `${baseURL}genre/tv/list?api_key=${TMDB_APIKey}`
    let tempArr = []

   return $.get(categoryURL)
        .then(function (data) {
            let categoryList = data.genres
            for (var i = 0; i < categoryList.length; i++) {
                tempArr.push(categoryList[i]["name"])
            }
            return tempArr
        }, function (data) {
            console.log(data.responseJSON["status_message"])
        }
        )    
}


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

