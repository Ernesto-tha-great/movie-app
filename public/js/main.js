$(document).ready(() => {
    //creating an event for when the form is submitted
    $('#searchForm').on ('submit', (e) => {
        let searchText = $(`#searchText`).val();
        //calling the function get movies
        getMovies(searchText);
        e.preventDefault(); //prevents it from submitting to a file
    })
})


function getMovies (searchText) {
   axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=90c3d50c&s='+searchText)
   .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output ='';
        $.each(movies, (index, movie) => {
            output += `
            <div class="col-md-3">
                <div class="well text-center"> 
                <img src="${movie.Poster}">
                    <h5> ${movie.Title} </h5>   
                <a onclick="movieSelected('${movie.imdbID}')" class= "btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            
            `;

        })

        $('#movies').html(output) // passing the output
      })
 .catch((err) => {
     console.log(err)
 })
}

function movieSelected(id) {  //creating the function for what occurs when movie detailsis clicked
    sessionStorage.setItem('movieId', id); //passing data from one page to another
    window.location= 'movie.html'; //changing the page
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    axios.get('https://www.omdbapi.com/?apikey=90c3d50c&i='+movieId)
    .then((response) => {
         console.log(response);

         let movie = response.data;

         let output = `
         <div class= "row">
         <div class="col-md-4"> 
         <img src="${movie.Poster}" class="thumbnail">
         </div>
         <div class="col-md-8"> 
            <h2> ${movie.Title}</h2>

            <ul class="list-group">
                <li class="list-group-item"> <strong> Genre: </strong> ${movie.Genre} </li>
                <li class="list-group-item"> <strong> Released: </strong> ${movie.Released} </li>
                <li class="list-group-item"> <strong> Rated: </strong> ${movie.Rated} </li>
                <li class="list-group-item"> <strong> IMDB Rating: </strong> ${movie.imdbRating} </li>
                <li class="list-group-item"> <strong> Director: </strong> ${movie.Director} </li>
                <li class="list-group-item"> <strong> Writer: </strong> ${movie.Writer} </li>
                <li class="list-group-item"> <strong> Actors: </strong> ${movie.Actors} </li>

            </ul>

         </div>
         </div>

         <div class="row"> 
            <div class="well"> 
                <h3> Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB </a>
                <a href="index.html" class="btn btn-primary">HOME</a>

            </div>
         
         
         </div>
         
         `;
         $('#movie').html(output);
       })
  .catch((err) => {
      console.log(err)
  })
}
