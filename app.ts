import * as requests from "./requests";
import {setSearchFieldValue} from "./UI"

// Global variables
var timeoutID:any;
var page = 1;
var query = ":popular";
var canScroll = true;

// Onload page fetch default movies
window.onload = () => {
    let state = {query,canScroll};
    history.pushState(state, "");
    selectRequest(query);
}

// If reached the bottom of the page, fetch next page and APPEND results
$(window).scroll(function() {    
    let winScroll = $(window).scrollTop();
    let winHeight = $(window).height();
    let docHeight = $(document).height();    
    if ( canScroll && winScroll != undefined && winHeight != undefined && docHeight != undefined) {
        if(winScroll + winHeight > docHeight -100) { 
            selectRequest(query,"append");
        }
    }
});

// When browser back button is pressed, request previous query from the API
window.addEventListener('popstate', function(e) {
    // Reset page counter 
    page = 1;
    query = e.state.query;
    canScroll = e.state.canScroll
    setSearchFieldValue(query);
    selectRequest(query);
});

// Listen for keystroke events in the search field
$("#movie-query").keyup( function() {
    let inputElement = <HTMLInputElement> this;    
    query = inputElement.value;
    // Reset page counter for a new search
    page = 1;
    // Clear the timeout if it has already been set
    clearTimeout(timeoutID);
    // Make a new timeout
    timeoutID = setTimeout(function() {
        canScroll = true;
        let historyState = {query,canScroll}
        history.pushState(historyState, "");
        selectRequest(query)
    }, 700);
});

// Event listener for clicking a movie
export function addEventListenerMovies() {
    $(".movie-container").off("click");
    $(".movie-container").click( function(ev) {
        ev.stopPropagation();
        let id = this.getAttribute("movie-id");
        query = ":"+id;                
        canScroll = false;
        let historyState = {query,canScroll};
        history.pushState(historyState, "");
        setSearchFieldValue(query);
        selectRequest(query);
    });
}

/**
 * Select the type of request (by movie name or by filter) and then send it with AJAX
 * @param q Query for the request (movie title or ":" followed by filter)
 * @param contentMethodSetting (optional) if it is set to "append" it does not replace the previous results
 */
function selectRequest(q:string, contentMethodSetting?:string) {    
    if ( q[0] === ":" ) { 
        requests.requestMovieByFilter(q.slice(1),page,contentMethodSetting); 
    }
    else requests.requestMovieByTitle(q,page,contentMethodSetting);
    //Incement page counter for next page (when requested)
    page++;
}