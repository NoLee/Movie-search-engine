//handle the XLMhttpreuqest (jquery or js)

function requestMovieByTitle(title:string, page:number = 1) {
    let urlString:string = "https://api.themoviedb.org/3/search/movie?api_key=4e8e150788febd77a9f470586acbe5f3&language=en-US&query="+title+"&page="+page+"&include_adult=false";

    let req= $.ajax({
        url: urlString
    })

    req.done(function( data ) {
       showResults(data);
    });
}


function showResults(data:any) {
    console.log(data);
}

// IMAGE LINK: https://image.tmdb.org/t/p/w500/ + poster path

requestMovieByTitle("captain")