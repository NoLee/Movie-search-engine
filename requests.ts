import {changeMovieTemplate, resetMovieTemplate, showLoading, hideLoading,showMovieNotFound} from './UI'
require('handlebars');

/**
 * Request movies from the server using "title" as a search filter
 * @param title movie title (partial)
 * @param page page number to load (defaults to 1 if omitted)
 */
export function requestMovieByTitle(title:string, page:number = 1, contentMethodSetting?:string) {
    let urlString:string = "https://api.themoviedb.org/3/search/movie?api_key=4e8e150788febd77a9f470586acbe5f3&language=en-US&query="+title+"&page="+page;
    ajaxRequest(urlString,contentMethodSetting);
}

/**
 * Request movies from the server using a specified filter
 * @param filter movie filter like "popular", "latest", "top_rated", movie by ID, etc
 * @param page page number to load (defaults to 1 if omitted)
 */
export function requestMovieByFilter(filter:string, page:number = 1, contentMethodSetting?:string) {
    let urlString:string = "https://api.themoviedb.org/3/movie/"+filter+"?api_key=4e8e150788febd77a9f470586acbe5f3&language=en-US&page="+page;
    ajaxRequest(urlString,contentMethodSetting);
};

// Send an async ajax request to the url specified
function ajaxRequest(url:string,contentMethodSetting?:string) {
    let req= $.ajax({
        url: url,
        beforeSend: function () { 
            if (contentMethodSetting !== "append") {
                resetMovieTemplate();
                showLoading(); 
            }
        }
    })
    .done(function(data) {
        if (!exceedPageCount(data)) {
            alterResults(data);
            console.log(data);
            changeMovieTemplate(data,contentMethodSetting);
        }    
    })
    .fail( () => showMovieNotFound() )
    .always( () => hideLoading() )
}

// Alters some attributes (adds "star_rating" array and adds date information) of the JSON object returned by themovieDB API 
function alterResults(data:any) {
    if (data.results) {
        // data.results.release_date = data.results.release_date.slice(0,3);
        data.results.forEach( (result:any) => {
            result.release_year = result.release_date.slice(0,4);
            addStarRatingArray(result);
        });
    }
    else {
        data.release_year = data.release_date.slice(0,4);
        addStarRatingArray(data);
    }
    
    function addStarRatingArray(result:any) {
        let avg = result.vote_average;
            result["star_rating"] = [];
            for (let i=0; i< 10; i++) {
                if (i <= avg - 1) result["star_rating"][i] = "selected"
                else result["star_rating"][i] = null
            }
    }
}

function exceedPageCount(data:any) {
    return (data.page > data.total_pages)
}