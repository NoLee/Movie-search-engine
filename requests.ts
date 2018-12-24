import {changeMovieTemplate} from './UI'
require('handlebars');

/**
 * Request movies from the server using "title" as a search
 * @param title movie title (partial)
 * @param page page number to load (defaults to 1 if omitted)
 */
export function requestMovieByTitle(title:string, page:number = 1, method?:string) {
    let urlString:string = "https://api.themoviedb.org/3/search/movie?api_key=4e8e150788febd77a9f470586acbe5f3&language=en-US&query="+title+"&page="+page;
    ajaxRequest(urlString,method);
}

/**
 * Request movies from the server using a specified filter
 * @param filter movie filter like "popular", "latest", "top_rated", etc
 * @param page page number to load (defaults to 1 if omitted)
 */
export function requestMovieByFilter(filter:string, page:number = 1, method?:string) {
    let urlString:string = "https://api.themoviedb.org/3/movie/"+filter+"?api_key=4e8e150788febd77a9f470586acbe5f3&language=en-US&page="+page;
    ajaxRequest(urlString,method);
};

/**
 * Send an async ajax request to the url specified
 */
function ajaxRequest(url:string,method?:string) {
    let req= $.ajax({
        url: url
    })
    req.done(function( data ) {
        addStarRating(data);
        changeMovieTemplate(data,method);        
    });
}

/**
 * Adds an attribute ("star_rating" array) to the JSON object returned by themovieDB API 
 */
function addStarRating(data:any) {
    data.results.forEach( (result:any) => {
        let avg = result.vote_average;
        result["star_rating"] = [];

        for (let i=0; i< 10; i++) {
            if (i <= avg - 1) result["star_rating"][i] = "selected"
            else result["star_rating"][i] = null
        }
    });
}