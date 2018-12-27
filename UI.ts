import {addEventListenerMovies} from "./app"

/**
 * Updates the HTML Handlebars template for the movie search
 * @param data The JSON object returned by themovieDB API
 * @param contentMethodSetting (optional) If equals "append", then we append the data instead of updating
 */
export function changeMovieTemplate(data:any, contentMethodSetting?:string):void {    
    let source   = $("#movie-template").html();
    let template = Handlebars.compile(source);  
    if (data.total_results === 0) {
        showMovieNotFound();
    }   
    else {
        hideMovieNotFound();
        var theCompiledHtml = template(data);
        if (contentMethodSetting === "append") $('#handlebars-movie-container').append(theCompiledHtml);
        else $('#handlebars-movie-container').html(theCompiledHtml);
        addEventListenerMovies();
    }
} 

// Show loading indication before fetching the results
export function showLoading() {
    $('.loading').removeClass('hidden');
}

// Hide loading indication after fetching the results
export function hideLoading() {
    $('.loading').addClass('hidden');
}

// Delete all the movies from screen 
export function resetMovieTemplate() {
    $('#handlebars-movie-container').html("");
}

export function showMovieNotFound() {
    $('.no-movies').removeClass('hidden');
}

export function hideMovieNotFound() {
    $('.no-movies').addClass('hidden');
}