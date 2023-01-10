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

//NOT TESTED -Example of embed functionality and start end params and autoplay -NOT TESTED
//https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1&?start=0&end=10&autoplay=1;

//NOT TESTED- TRY watch_popup instead of watch -NOT TESTED

var  watchTrailerButton =$('.watch');
var loveButton=$('.love');
var newFavourite = [];





//Sets onScreenID to local storage
function storeOnScreenID(movieID, movieName){

    onScreenData ={
        id:movieID,
        name:movieName,
    }

  localStorage.setItem("onScreen", JSON.stringify(onScreenData)); 
}

//Gets onScreenID from local storage
function getOnScreenID(){

   return JSON.parse(localStorage.getItem("onScreen")); 
}
 

function addFavourite()
{

    var moviedata = getOnScreenID();
   
    //Store new favourite on localStorage
    storeFavourites(moviedata.id, moviedata.name);
    //Renders favourite using localStorage
    renderFavourites();

    //Change Love button to full when clicked
   // console.log(loveButton);
}



/** Display youtube video on page */
function displayYoutubeVideoFull () {

    //Gets movie id from local storage
    var onScreenID = getOnScreenID();

    //Creates URL for full play
    var urlFullScreen=`https://www.youtube.com/embed/${onScreenID}?enablejsapi=1&start=0&end=15&autoplay=1&mute=1`  
    

    //play in full screen
    //console.log(urlFullScreen);

};


//Render favourites using localStorage
function renderFavourites() {

    //Get favourites from localStorage
    var existingFavourites = JSON.parse(localStorage.getItem("favourites"));

    //Gets Menu section
    favouritesMenu= $('#dropdownMenuButton');
    //Cleans html to show buttons
    favouritesMenu.html('');

    //If there is any search stored on localStorage creates a button for each of them
    if (existingFavourites) {
        for (var i = 0; i < existingFavourites.length; i++) {
            var favourite= existingFavourites[i];
            //Uses the name of the city as id for future searches
            favouritesMenu.append(`<button class='buttonstyle' id='favourite-button${favourite.id}'>${favourite.name}</button>`);
           
             //Adds listener for new history button
            var newButton = $(`#favourite-button${favourite.id}`);
            newButton.click(getYoutubeVideo(favourite.name));
        }
    }
   

}


/** Store favourites into localStorage */
function storeFavourites(movieID, movieName) { 

    var newF ={
        id:movieID,
        name:movieName,
    };

    //Gets favourites searches from local storage
    var existingSearch = JSON.parse(localStorage.getItem("favourites"));
    if (existingSearch !== null) {
        newFavourite = existingSearch;
    }
    //Only stores favourites that are not on the local storage already
    if (!newFavourite.includes(newF)) {
        newFavourite.push(newF);
    }
    localStorage.setItem("favourites", JSON.stringify(newFavourite)); 
}



/** Display youtube video on page */
function displayYoutubeVideo (url){
    
    var hero = $('.hero');
  
    hero.html('');

    hero.prepend(`
    <iframe id="existing-iframe-example" class='trailer'  width="800" height="450" 
    src="${url}" frameborder="0">
    </iframe>
    `)

};



/** Gets video data and url from youTube API */
function getYoutubeVideo(movieName) {
 
   
     $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
        .then(function (data) {
          
            //Gets movie id from searched tv show or movie
            movieId=data.items[0].id.videoId;

          // Stores the video that is on screen to use as full mode
          
           //HARDCODE VARS for TESTING
           //  var movieId = 'tqVVrTvrI8U';
            // movieName= "The Glory";
             storeOnScreenID(movieId,movieName);
            
            //If the tv show / movie was found calls function to show video on on page
            displayYoutubeVideo(`https://www.youtube.com/embed/${movieId}?enablejsapi=1&?start=0&end=15&autoplay=1&mute=1`);  
           
        });

    // displayYoutubeVideo(`https://www.youtube.com/embed/smTK_AeAPHs??enablejsapi=1&start=0&end=15&autoplay=1&mute=1`);  
        

}



/** Calls getYoutubeVideo for each video on the Array */
function showTopTVShow(tempArr){
    
    //If the param is not empty or undefined
    if (tempArr) {
    var TVShowNames = tempArr;    
    //Pick a random number from 0 to TVShowNames.length-1 and use to call next function
    var video= Math.floor(Math.random()* (TVShowNames.length-1));  
    //Passing only 1 element for testing
    getYoutubeVideo(TVShowNames[video]);

    }
    /**DO NOT DELETE FOR NOW IN CASE WE SHOW MORE THAN 1 VIDEO*/
    // for (var i = 0; i < TVShowNames.length; i++){
    //     getYoutubeVideo(TVShowNames[i]);   
    // }

}

/** Inits script calling  rendering favourites and calling showTopTVShow() function */
function init(){   
    
    //Search and render favourites suing local storage
    renderFavourites();
    //Show video recommendation  
    showTopTVShow();
    //Adds event listener for trailer button
    watchTrailerButton.click(displayYoutubeVideoFull);
    //Adds event listener for love button
    loveButton.click(addFavourite);

}


init();
