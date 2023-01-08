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

//Example of embed functionality and start end params
//https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1&?start=0&end=10

//Example of url with embed functionality
//src="https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1"






 
/** Store favourites into localStorage */
function storeFavourites(movieName) { 
    //Gets favourites searches from local storage
    var existingSearch = JSON.parse(localStorage.getItem("favourites"));
    if (existingSearch !== null) {
        newFavourite = existingSearch;
    }
    //Only stores favourites that are not on the local storage already
    if (!newFavourite.includes(movieName)) {
        newFavourite.push(movieName);
    }
    localStorage.setItem("favourites", JSON.stringify(newFavourite)); 
}



/** Display youtube video on page */
function displayYoutubeVideo (url){

var trailer = $('.trailer');


trailer.prepend(`

<iframe id="existing-iframe-example"  width="500" height="300"
src="${url}"
frameborder="0" style= border: solid 4px #37474F">
</iframe>

`)

};



/** Gets video data and url from youTube API */
function getYoutubeVideo(movieName) {
 
    /**DO NOT DELETE - COMMENTED FOR 403 ERROR */
    // $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
    //     .then(function (data) {
          
    //         //Gets movie id from searched tv show or movie
    //         movieId=data.items[0].id.videoId;

    //         //If the tv show / movie was found calls function to show video on on page
             
           
    //     });

        displayYoutubeVideo(`https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1&?start=0&end=10`);  
        

}



/** Calls getYoutubeVideo for each video on the Array */
function showTopTVShow(tempArr){
      
    var TVShowNames = tempArr;   
 
    //Passing only 1 element for testing
    getYoutubeVideo(TVShowNames[1]);

    /**DO NOT DELETE */
    // for (var i = 0; i < TVShowNames.length; i++){
    //     getYoutubeVideo(TVShowNames[i]);   
    // }

}

/** Inits script calling  showTopTVShow() function */
function init(){   
    showTopTVShow();
}


init();
