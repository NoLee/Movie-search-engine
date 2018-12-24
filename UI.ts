/**
 * Updates the HTML Handlebars template for the movie search
 * @param data The JSON object returned by themovieDB API
 * @param method (optional) If equals "append", then we append the data instead of updating
 */
export function changeMovieTemplate(data:any, method?:string):void {    
    let source   = $("#movie-template").html();
    let template = Handlebars.compile(source);      
    var theCompiledHtml = template(data);
    if (method === "append") $('#handlebars-movie-container').append(theCompiledHtml);
    else $('#handlebars-movie-container').html(theCompiledHtml);
}
