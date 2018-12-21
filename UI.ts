//handlebars template functions

// Init a timeout variable to be used below
var timeoutID:number;

// Listen for keystroke events in the search field
$("#movie-query").keyup( function () {
    // Clear the timeout if it has already been set
    clearTimeout(timeoutID);

    let inputElement = <HTMLInputElement> this;

    // Make a new timeout
    timeoutID = setTimeout(function () {
        // here we will call the "XMLHttpRequest"
        console.log('Input Value:', inputElement.value);
    }, 700);
});