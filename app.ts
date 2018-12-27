import * as requests from "./requests";

// Global variables
var timeoutID:any;
var page:number = 1;
var query:string = ":popular";
var noScroll = false;

// Onload fetch default movies
window.onload = () => selectRequest(query);

// If reached the bottom of the page, fetch next page and APPEND results
$(window).scroll(function() {
    let winScroll = $(window).scrollTop();
    let winHeight = $(window).height();
    let docHeight = $(document).height();    
    if ( !noScroll && winScroll != undefined && winHeight != undefined && docHeight != undefined) {
        if(winScroll + winHeight > docHeight -100) { 
            selectRequest(query,"append");
        }
    }
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
        noScroll = false;
        selectRequest(query)
    }, 700);
});


/**
 * Select the type of request (by movie name or by filter) and then send it with AJAX
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

export function addEventListenerMovies() {
    $(".movie-container").click( function() {
        console.log("click");
        noScroll = true;
        let id = this.getAttribute("movie-id");
        query = ":"+id;        
        selectRequest(query);
    });
}
