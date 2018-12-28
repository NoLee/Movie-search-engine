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
        // Add a click event listener for each movie fetched by the API request
        addEventListenerMovies();
    }
} 

export function showLoading() {
    $('.loading').removeClass('hidden');
}

export function hideLoading() {
    $('.loading').addClass('hidden');
}

export function resetMovieTemplate() {
    $('#handlebars-movie-container').html("");
}

export function showMovieNotFound() {
    $('.no-movies').removeClass('hidden');
}

export function hideMovieNotFound() {
    $('.no-movies').addClass('hidden');
}

export function setSearchFieldValue(value:string) {
    $("#movie-query").val(value);
}