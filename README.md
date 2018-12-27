# Movie search engine
### This is version 1, in which you can only see bulk movie details after a search. In later versions you could check each individual movie for more details.

A simple website that acts as a search engine for movies.
Movie information taken by the themoviedb.org API


Instructions:
- Download dependencies with with  ```npm install```
- If you want to run in the browser (recommended), use a module bundler tool (like *browserify* or webpack) to bundle Typescript files into one Javascript file (bundle.js) <br/>
Run the following command
```
browserify requests.ts app.ts UI.ts -p [ tsify --noImplicitAny ] >  bundle.js
```
<!-- - If you want to run tests in the browser, do the same bundling process as above. -->

*Please use your own free API key from themoviedb.org if you intend to work on this project*
