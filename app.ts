import * as requests from "./requests";

// Global variables
var timeoutID:any;
var page:number = 1;
var query:string = ":popular";

// Listen for keystroke events in the search field
$("#movie-query").keyup( function () {
    let inputElement = <HTMLInputElement> this;    
    query = inputElement.value;
    // Reset page counter for a new search
    page = 1;
    makeRequest();
});

// Setup an ajax request after a set amount of time (to limit API requests)
function makeRequest(method?:string) {
        // Clear the timeout if it has already been set
        clearTimeout(timeoutID);
        // Make a new timeout
        timeoutID = setTimeout(function () {
            selectRequest(method)
        }, 700);
}

/**
 * Select the type of request (by movie name or by filter) and then send it with AJAX
 * @param method (optional) if it is set to "append" it does not replace the previous results
 */
function selectRequest(method?:string) {
    if ( $.inArray(query, [':now_playing', ':popular', ':top_rated']) >= 0 ) { 
        requests.requestMovieByFilter(query.slice(1),page,method); 
    }
    else requests.requestMovieByTitle(query,page,method);
    //Incement page counter for next page (if requested)
    page++;
}

// Onload fetch default movies
window.onload = () => makeRequest();


// If reached the bottom of the page, fetch next page and APPEND results
$(window).scroll(function () {
    let winScroll = $(window).scrollTop();
    let winHeight = $(window).height();
    let docHeight = $(document).height();
    
    if ( winScroll != undefined && winHeight != undefined && docHeight != undefined) {
        if(winScroll + winHeight > docHeight -100) { 
            makeRequest("append");
        }
    }
});