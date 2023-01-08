const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e";
var baseURL = "https://api.themoviedb.org/3/";
var MediaType = "tv";

/********************************YOUTUBE API******************************************** */
var youtubeKey = "AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

/******************************************************************************************* */

init();
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

function displayYoutubeVideo(url) {
  //Get html tag to show video
  //Example with one video only

  var trailer = $(".trailer");
  trailer.append(`
<div>
<p>
${url};
</p>
</div>
`);
}

function getYoutubeVideo(movieName) {
  $.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`
  ).then(function (data) {
    //Gets movie id from searched movie
    movieId = data.items[0].id.videoId;

    //If the movie was found calls function to show video
    displayYoutubeVideo(`https://www.youtube.com/watch?v=${movieId}`);
  });
}

function showTopTVShow(tempArr) {
  var TVShowNames = tempArr;

  //Passing only 1 element for testing
  getYoutubeVideo(TVShowNames[1]);
}

function init() {
  TopTVShowPickoftheDay().then(showTopTVShow);
  getCategoryList().then(createCategoryButtons);
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
      
      li.append(tempDiv);
      ul.append(li);
    }
    genreDiv.append(ul);
  }
}
