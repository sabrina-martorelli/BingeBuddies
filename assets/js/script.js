const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e";
var baseURL = "https://api.themoviedb.org/3/";
var MediaType = "tv";

/********************************YOUTUBE API******************************************** */
//var youtubeKey = "AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

//var youtubeKey = "AIzaSyDuOv_-6qlDSBsMKTT1hkvA-O2XzaLD8S8";

//var youtubeKey = "AIzaSyBHYmzQQ233ybl_cfSWrZ0d4idz2_xZrR0";

 //var youtubeKey = "AIzaSyCm6HEMuVqhQCJ9cgt2NxCE6UBeMeVJivE";

 var youtubeKey = "AIzaSyDoUpq4Y32DjmSt6qgJyNf5QGeMQxJFy1s";

/******************************************************************************************* */


var loveButton = $('.love');
var newFavourite = [];



//Adds event listener for love button
loveButton.click(addFavourite);

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
     
      const error = $(".alert");
      error.css("display", "block")
      error.text(data.responseJSON["status_message"]);
      
      console.log(`in toptvshow ${data.responseJSON["status_message"]}`);
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
    heading.css('font-weight', 700)

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

/**Creates genre List show  */
function genreListCreation(tempArr) {
  const genreDiv = $(".genres");
  //const len = tempArr.length;
  const len = 5;
  var ul = $("<ul>");
  genreDiv.empty();
  const button = $(".backBtn");
  button.css("visibility","visible");
  
  if (len) {
    for (var i = 0; i < len; i++) {
      var li = $("<li>");
      var tempDiv = $("<div>");
      li.append(`<p>${tempArr[i]}</p>`);
      li.addClass("genreList");

    
      //Removes spaces on names
      var classID=tempArr[i].trim();
            
            //Adds _ between words on movie names
            classID=classID.replace(/ /g,"_");
            console.log(classID);
            // Create class based on movie name
            tempDiv.addClass(`selectedGenreShowPreviewDiv${classID}`);
            console.log(`selectedGenreShowPreviewDiv${classID}`)
      

        li.append(tempDiv);
        ul.append(li);

         //Gets video id to generate url
         getYoutubeVideo(tempArr[i]).then(getShortUrl);



    }
    genreDiv.append(ul);
  }
}




$(".watch").click(()=>{
 
  createFullScreen()
  
})


function createFullScreen()
{ 
  
  const fullScreenDiv = $(".fullscreen");
  fullScreenDiv.css("width","100%");
  displayYoutubeVideoFull();

}
$(".closebtn").click(()=>{
  
  const fullScreenDiv = $(".fullscreen")  
  fullScreenDiv.css("width","0%") 
  var video=$("#popup") 
  video.remove();

})
$(".backBtn").click(()=>
{
  const title = $(".genre-title")
  title.text("What genre would you like?")
  const genreDiv = $(".genres");
  genreDiv.empty();
  $(".backBtn").css("visibility","hidden")
  getCategoryList().then(createCategoryButtons); 
})




/** Generates url of full video with autoplay off  and creates iframe for list*/
function getShortUrl(movieData) {

  
    //Removes spaces on names
    var classID= movieData[1].trim();

    //Adds _ between words on movie names
    classID=classID.replace(/ /g,"_");
    
    //Gets div to insert iframe
    var tempDiv = $(`.selectedGenreShowPreviewDiv${classID}`);
   
    //Creates url base on movieId
    var url = `https://www.youtube.com/embed/${movieData[0]}?enablejsapi=1&modestbranding=1&showinfo=0`;
  
    //Appends iframe to div
    tempDiv.append(`
    <iframe id="iframe-category" class='trailer'  width="350" height="200" 
    src="${url}" frameborder="0">
    </iframe>
    `)
    
}



/** Sets onScreenID data on local storage */
function storeOnScreenID(movieID, movieName) {

    onScreenData = {
        id: movieID,
        name: movieName,
    }

    localStorage.setItem("onScreen", JSON.stringify(onScreenData));
}

/**Gets onScreenID data from local storage */
function getOnScreenID() {
    return JSON.parse(localStorage.getItem("onScreen"));
}

/**Cleans Favourites list */
function removeFavourite() {

    console.log('entra');
    //Save on ScreenID data
    var saveOnScreen = getOnScreenID();

    //Cleans complete local storage
    localStorage.clear();

    //Creates local storage again for ScreenID
    storeOnScreenID(saveOnScreen.id, saveOnScreen.name);

    //Renders favourites menu using localStorage
    renderFavourites();

}

/**Adds a new favourite to the list and display on menu */
function addFavourite() {
    //Gets id of current video from local storage
    var moviedata = getOnScreenID();

    //Store new favourite on localStorage
    storeFavourites(moviedata.id, moviedata.name);

    //Renders favourites menu using localStorage
    renderFavourites();

    //Change Love button to full version
    loveButton.addClass('fas fa-heart love fa-2x grow')

}

/** Display youtube video on page */
function displayYoutubeVideoFull() {

    //Gets id of current video from local storage
    var onScreenID = getOnScreenID();

    //Creates URL for full play 
    var urlFullScreen = `https://www.youtube.com/embed/${onScreenID.id}?enablejsapi=1&modestbranding=1&showinfo=0&autoplay=1&mute=1`

    //Add iframe to popup screen
    var layer = $(".fullscreen")  
    layer.append(`
    <iframe id="popup" class='trailer'  width="1920" height="1080" 
    src="${urlFullScreen}" frameborder="1">
    </iframe>
    `);
};

/** Render favourites using localStorage */
function renderFavourites() {
 
    //Get existing favourites data from localStorage
    var existingFavourites = JSON.parse(localStorage.getItem("favourites"));

    //Gets Menu section
    favouritesMenu = $('.dropdown-menu');

    //Cleans html on menu to show buttons
    favouritesMenu.html('');

    //If there is any data creates a button for each movie
    if (existingFavourites) {
        for (var i = 0; i < existingFavourites.length; i++) {

            //Gets data of movie 
            var favourite = existingFavourites[i];

            //Adds new button to Menu
            favouritesMenu.append(`<a class='dropdown-item' id='${favourite.id}'>${favourite.name}</a>`);

            //Adds listener for new button
            var newlink = $(`#${favourite.id}`);

            newlink.on('click', function () {
                //Send id as array
                displayYoutubeVideo([this.id])
            });
        }

        //Adds clear favourites as last button on the list
        favouritesMenu.append(`<a class="dropdown-item" id="clear-list">Clear Favourites</a>`);
        
        var clearFavouritesButton = $('#clear-list');
        //Adds event listener for love button
        clearFavouritesButton.click(removeFavourite);

    }
    else{

        favouritesMenu.html('Use the heart icon to add favourites to your list');
    }

}

/** Store favourites into localStorage */
function storeFavourites(movieID, movieName) {

    //Use of object to store movie id and movie name
    var newF = {
        id: movieID,
        name: movieName,
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
function displayYoutubeVideo(movieData) {

    //Creates url base on movieData : id and name
    var url = `https://www.youtube.com/embed/${movieData[0]}?enablejsapi=1&start=0&end=15&autoplay=1&mute=0`;

    //Gets div to show video
    var hero = $('.hero');

    //Cleans html of div
    hero.html('');

    //Adds iframe to div
    hero.prepend(`
    <iframe id="iframe-example" class='trailer'  width="800" height="450" 
    src="${url}" frameborder="0">
    </iframe>
    `)

};

/** Gets movie information from youTube API using movieName */
function getYoutubeVideo(movieName) {

  //Calls youTube API
  return $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
      .then(function (data) {

          //Gets movieId from searched tv show or movie
          movieId = data.items[0].id.videoId;

          //Stores the video that is on screen to save future searchs
          storeOnScreenID(movieId, movieName);

          return [movieId,movieName];
      }
          ,
          function (data) {
              console.log(data.responseJSON["status_message"]);
          }
      );

}



/** Show video on main screen base on a random search */
function showTopTVShow(TVShowNames) {

  //If the array of movies is not empty or undefined
  if (TVShowNames) {

      //Pick a random number from 0 to TVShowNames.length-1
      var video = Math.floor(Math.random() * (TVShowNames.length - 1));

      //Call the function using the random number
      getYoutubeVideo(TVShowNames[video]).then(displayYoutubeVideo);

  }

}



/** Inits function */
function init() {

  //Show video recommendation  
  TopTVShowPickoftheDay().then(showTopTVShow);

  //Gets and show category list
  getCategoryList().then(createCategoryButtons);

  //Search and render favourites using local storage
  renderFavourites();

}

init();

