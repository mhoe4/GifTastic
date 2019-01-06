var artists = [ 
  "Young Thug" ,
  "Drake" ,
  "Lil Wayne",
  "Nicki Minaj",
  "Lil Baby"
];

// Function for displaying artist buttons
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#artist-buttons").empty();

  // Looping through the array of artists
  for (var i = 0; i < artists.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("artist");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", artists[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(artists[i]);
    // Adding the button to the HTML
    $("#artist-buttons").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-artist").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var movie = $("#movie-input").val().trim();
  // The movie from the textbox is then added to our array
  movies.push(movie);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();