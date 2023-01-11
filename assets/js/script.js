const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e";
var baseURL = "https://api.themoviedb.org/3/";
var MediaType = "tv";

/********************************YOUTUBE API******************************************** */
var youtubeKey = "AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

//var youtubeKey = "AIzaSyDuOv_-6qlDSBsMKTT1hkvA-O2XzaLD8S8";

/******************************************************************************************* */


/*Get the daily trending items name array*/
function TopTVShowPickoftheDay() {
  var URLOption = `${baseURL}trending/${MediaType}/day?api_key=${TMDB_APIKey}`;
  let tempArr = [];
  return $.get(URLOption).then(
    function (data) {
      let showList = data.results;
      for (var i = 0; i < showList.length; i++) {
        tempArr.push(showList[i].name);
      }
      return tempArr;
    },
    function (data) {
      console.log(data.responseJSON["status_message"]);
    }
  );
}

/** Get the list of official genres for TV shows. */
function getCategoryList() {
  var categoryURL = `${baseURL}genre/${MediaType}/list?api_key=${TMDB_APIKey}`;
  let tempArr = [];

  return $.get(categoryURL).then(
    function (data) {
      let categoryList = data.genres;
      for (var i = 0; i < categoryList.length; i++) {
        tempArr.push(categoryList[i]["name"]);
      }
      return tempArr;
    },
    function (data) {
      console.log(data.responseJSON["status_message"]);
    }
  );
}



/** Create category buttons dynamically using jQuery */
function createCategoryButtons(categoryListArr) {
    const totalButtonReq = categoryListArr.length;
    const genreDiv = $(".genres");
    let tempButton;
    for (var i = 0; i < totalButtonReq; i++) {
      tempButton = $("<button>");
      tempButton.addClass("buttonstyle");
      tempButton.text(categoryListArr[i]);
      genreDiv.append(tempButton);
    }
  }
  /**Category button click handles here */
  $(".genres").on("click", "button", function () {
    getShowListforSelectedCategory($(this).text()).then(genreListCreation);
  });
  
  
  /**Get show list based n category selected */
  function getShowListforSelectedCategory(categoryName) {
    var categoryURL = `${baseURL}discover/${MediaType}?api_key=${TMDB_APIKey}&sort_by=popularity.desc&page=1&with_watch_monetization_types=flatrate&with_status=0&with_type=0&with_genres=${categoryName}`;
    let tempArr = [];
    const heading = $(".genre-title");
    heading.text(categoryName);
    heading.css('font-weight',700)
  
    return $.get(categoryURL).then(
      function (data) {
        let categoryList = data.results;
        for (var i = 0; i < categoryList.length; i++) {
          tempArr.push(categoryList[i]["name"]);
        }
        return tempArr;
      },
      function (data) {
        console.log(data.responseJSON["status_message"]);
      }
    );
  }
  
  function genreListCreation(tempArr) {
    const genreDiv = $(".genres");
    const len = tempArr.length;
    var ul = $("<ul>");
    genreDiv.empty();
    if (len) {
      for (var i = 0; i < len; i++) {
        var li = $("<li>");
        var tempDiv = $("<div>");
        li.append(`<p>${tempArr[i]}</p>`)
        li.addClass("genreList")
        tempDiv.addClass("selectedGenreShowPreviewDiv");
        
        //Gets video id 
        var movieId = getYoutubeVideo(tempArr[i]);
        
        //Generates url of full video with autoplay off
        var url = `https://www.youtube.com/embed/${movieId}?enablejsapi=1`;  

        tempDiv.prepend(`
        <iframe id="iframe-category" class='trailer'  width="300" height="150" 
        src="${url}" frameborder="0">
        </iframe>
        `)
       
        li.append(tempDiv);
        ul.append(li);
      }
      genreDiv.append(ul);
    }
  }
  
  
  

//Example of YouTube url using id from The MovieDB API 
//https://www.youtube.com/watch?v=uMIsXdoj2vU

//Example of embed functionality and start end params
//https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1&?start=0&end=10

//Example of url with embed functionality
//src="https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1"

//NOT TESTED -Example of embed functionality and start end params and autoplay -NOT TESTED
//https://www.youtube.com/embed/smTK_AeAPHs?enablejsapi=1&?start=0&end=10&autoplay=1;

//NOT TESTED- TRY watch_popup instead of watch -NOT TESTED

// src="http://www.youtube.com/embed/IsBInsOj8TY?modestbranding=1&autoplay=1&controls=0&fs=0&loop=1&rel=0&showinfo=0&disablekb=1&playlist=IsBInsOj8TY" 
 


var  watchTrailerButton =$('.watch');
var loveButton=$('.love');
var clearFavouritesButton =$('.clear-list');
var newFavourite = [];

    
 //Adds event listener for trailer button
watchTrailerButton.click(displayYoutubeVideoFull);
//Adds event listener for love button
loveButton.click(addFavourite);

//Adds event listener for love button
clearFavouritesButton.click(removeFavourite);


/** Sets onScreenID data on local storage */
function storeOnScreenID(movieID, movieName){

    onScreenData ={
        id:movieID,
        name:movieName,
    }

  localStorage.setItem("onScreen", JSON.stringify(onScreenData)); 
}


//Gets onScreenID data from local storage
function getOnScreenID(){

   return JSON.parse(localStorage.getItem("onScreen")); 
}
 

function removeFavourite(){
    //Save on ScreenID data
    var saveOnScreen = getOnScreenID(); 
    //Cleans complete local storage
    localStorage.clear();
    //Creates local storage again for ScreenID
    storeOnScreenID(saveOnScreen.id,saveOnScreen.name);

    renderFavourites();

}


function addFavourite()
{

    var moviedata = getOnScreenID();
    //Store new favourite on localStorage
    storeFavourites(moviedata.id, moviedata.name);
    //Renders favourite using localStorage
    renderFavourites();
    //Change Love button to full when clicked
    loveButton.addClass('fas fa-heart love fa-2x grow')
  
}



// /** Display youtube video on page */
 function displayYoutubeVideoFull () {

    //Gets movie id from local storage
    var onScreenID = getOnScreenID();

    //Creates URL for full play
    var urlFullScreen=`https://www.youtube.com/embed/${onScreenID.id}?enablejsapi=1&autoplay=1&mute=1`  
    

    //Add iframe to screen
    console.log(urlFullScreen);
    // <iframe class="videoContainer__video" width="1920" height="1080" 
    // src= 'https://www.youtube.com/embed/smTK_AeAPHs??enablejsapi=1&start=0&end=15&autoplay=1&mute=1'
    // frameborder="0"></iframe>

   

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
            favouritesMenu.append(`<button class='buttonstyle' id='${favourite.id}'>${favourite.name}</button>`);
           
             //Adds listener for new history button
            var newButton = $(`#${favourite.id}`);   
       
            newButton.on('click', function () { 
            var url = `https://www.youtube.com/embed/${this.id}?enablejsapi=1&?start=0&end=15&autoplay=1&mute=1`
            displayYoutubeVideo(url);
            });
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



function getYoutubeVideo(movieName) {
   
    //  $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
    //     .then(function (data) {
          
    //         //Gets movie id from searched tv show or movie
    //         movieId=data.items[0].id.videoId;
        
    //        // Stores the video that is on screen to use as full mode
          
    //         storeOnScreenID(movieId,movieName);
            
    //         //If the tv show / movie was found calls function to show video on on page
    //      delete this   displayYoutubeVideo(`https://www.youtube.com/embed/${movieId}?enablejsapi=1&?start=0&end=15&autoplay=1&mute=1`);  
            //USE NEXT RETURN
    // return https://www.youtube.com/embed/${movieId}?enablejsapi=1&?start=0&end=15&autoplay=1&mute=1
    //     });
 
    //return`https://www.youtube.com/embed/smTK_AeAPHs??enablejsapi=1&start=0&end=15&autoplay=1&mute=1`;  
    
    var movieId ='smTK_AeAPHs?';
    return movieId;

}



/** Calls getYoutubeVideo for each video on the Array */
function showTopTVShow(tempArr){
    
    //If the param is not empty or undefined
    if (tempArr) {
    var TVShowNames = tempArr;    
    //Pick a random number from 0 to TVShowNames.length-1 and use to call next function
    var video= Math.floor(Math.random()* (TVShowNames.length-1));  
    //Gets url for video
    var movieId = getYoutubeVideo(TVShowNames[video]);
    //Generates url with autoplay on
    var url = `https://www.youtube.com/embed/${movieId}?enablejsapi=1&start=0&end=15&autoplay=1&mute=1`;  
    //Display video on page
    displayYoutubeVideo(url);
    }


  
}



/** Inits script calling  rendering favourites and calling showTopTVShow() function */
function init(){   

     //Show video recommendation  

    TopTVShowPickoftheDay().then(showTopTVShow);
    
    getCategoryList().then(createCategoryButtons);

    //Search and render favourites suing local storage
    renderFavourites();

}


init();
