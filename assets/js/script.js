const TMDB_APIKey = "d47e2f7ee2ff79fef6594d007321597e"
var baseURL = "https://api.themoviedb.org/3/"
var MediaType = "tv"



/*Get the daily trending items name array*/
function TopTVShowPickoftheDay() {
    var URLOption = `${baseURL}trending/${MediaType}/day?api_key=${TMDB_APIKey}`
    let tempArr=[]
    $.get(URLOption)
        .then(function (data) {
            let showList = data.results;
           
            for (var i = 0; i < showList.length; i++) {
                tempArr.push( showList[i].name)
            }
        }, function (data) {
            console.log(data.responseJSON["status_message"])
        }
        )
        
return tempArr
}
/** Get the list of official genres for TV shows. */
function getCategoryList()
{
    var categoryURL = `${baseURL}genre/tv/list?api_key=${TMDB_APIKey}`
    let tempArr = []

    $.get(categoryURL)
    .then(function (data) {
        let categoryList = data.genres
        for(var i = 0; i< categoryList.length;i++)
        {
            tempArr.push(categoryList[i]["name"])
        }
       
    }, function (data) {
        console.log(data.responseJSON["status_message"])
    }
    )
return tempArr
}