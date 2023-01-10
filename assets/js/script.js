const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e"
var baseURL = "https://api.themoviedb.org/3/"
var MediaType = "tv"


/********************************YOUTUBE API******************************************** */
var youtubeKey = "AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";


/******************************************************************************************* */
 TopTVShowPickoftheDay().then(showTopTVShow)

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



/** Display youTube video on page. */
function displayYoutubeVideo (url){

//Get html tag to show video
//Example with one video only
var trailer = $('.trailer');
console.log(url);
trailer.append(`

<iframe id="existing-iframe-example"
width="640" height="360"
src="https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1"
frameborder="0"
style="border: solid 4px #37474F"
>
</iframe>



`)
};

/** Gets youTube video data  from API and creates video url  */
function getYoutubeVideo(movieName) {
   
    $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
        .then(function (data) {
          
        //Gets movie id from searched movie
            movieId=data.items[0].id.videoId;

            //If the movie was found calls function to show video
            displayYoutubeVideo(`https://www.youtube.com/watch?v=${movieId}`);    
           
        });
}

/** Gets youTube video data  from API and creates video url  */
function showTopTVShow(tempArr){
   
   var TVShowNames = tempArr;   
 
    //Passing only 1 element for testing
    getYoutubeVideo(TVShowNames[1]);

}

/** Init   */
function init(){
    
    showTopTVShow();
}

init();
//Test