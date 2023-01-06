const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e"
var baseURL = "https://api.themoviedb.org/3/"
var MediaType = "tv"
let TVShowNames = [];

/********************************YOUTUBE API******************************************** */
const youtubeKey="AIzaSyBAZxo00SckKfCeUq3uTe55UtdhB6__VuQ";

//Hardcode Variables for testing
var movieName="Kaguya-sama: Love Is War";
var movieId='uMIsXdoj2vU';

var TVlist =['Kaleidoscope', 'Star Wars: The Bad Batch', 'The Lying Life of Adults'];

/******************************************************************************************* */

/*Get the daily trending items name array*/
function TopTVShowPickoftheDay() {
    var URLOption = `${baseURL}trending/${MediaType}/day?api_key=${TMDB_APIKey}`
    let tempArr=[];
    $.get(URLOption)
        .then(function (data) {
            let showList = data.results;
           
            for (var i = 0; i < showList.length; i++) {
                tempArr.push( showList[i].name)
             
            }
            // console.log ('TopTVShowPickoftheDay');
            // console.log(tempArr);
            // console.log(tempArr[1]);
            // console.log(tempArr.length);

        }, function (data) {
            console.log(data.responseJSON["status_message"])
        }

        )

console.log ('BeforeReturn');
console.log(tempArr);
        
return tempArr
}
/** Get the list of official genres for TV shows. */
function getCategoryList()
{
    var categoryURL = `${baseURL}genre/tv/list?api_key=${TMDB_APIKey}`
    let tempArr = []

   return $.get(categoryURL)
    .then(function (data) {
        let categoryList = data.genres
        for(var i = 0; i< categoryList.length;i++)
        {
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



function displayYoutubeVideo (url){

//Get html tag to show video
//Example with one video only

console.log(url);
var hero = $('.class');
console.log(hero);
hero.append(`
<div>
<p>
${url};
</p>
</div>
`)




};




function getYoutubeVideo(movieName) {
   console.log(`movie name inside getYoutubeVideo${movieName}`)
    $.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName}trailer&type=video&key=${youtubeKey}`)
        .then(function (data) {
          
            //console.log(data);
            //If the movie was found calls function to show video
            displayYoutubeVideo(`https://www.youtube.com/watch?v=${movieId}`);    
           
        });

}

function showTopTVShow(){
    

    var  TVShowNames= TVlist;
  // let TVShowNames = TopTVShowPickoftheDay();   
    
    console.log ('insideShowTopTVShow3');
    console.log(TVShowNames);
    console.log(TVShowNames[1]);
    console.log(TVShowNames.length);

    for (var i = 0; i < TVShowNames.length; i++){
        getYoutubeVideo(TVShowNames[i]);
       
    }

}

function init(){
    
    showTopTVShow();
}

init();