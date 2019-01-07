var artists = [
  "Young Thug",
  "Drake",
  "Lil Wayne",
  "Nicki Minaj",
  "Lil Baby"
];

$(document).ready(function () {
  $(document).on("click", ".gif", gifState);
  $(document).on("click", "#add-artist", addArtist);
  $(document).on("click", ".artist", search);
  // Calling the renderButtons function at least once to display the initial list of artists
  renderButtons();
});


// Function for displaying artist buttons
function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#artist-buttons").empty();

  // Looping through the array of artists
  for (var i = 0; i < artists.length; i++) {

    // Then dynamicaly generating buttons for each artist in the array.
    var a = $("<button>");
    // Adding a class
    a.addClass("artist");
    // Adding a data-attribute with a value of the artist at index i
    a.attr("data-name", artists[i]);
    // Providing the button's text with a value of the artist at index i
    a.text(artists[i]);
    // Adding the button to the HTML
    $("#artist-buttons").append(a);
  }
}

// This function handles events where one button is clicked
function addArtist() {
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This line will grab the text from the input box
  var artist = $("#artist-input").val().trim();
  // The artist from the textbox is then added to our array
  artists.push(artist);

  // calling renderButtons which handles the processing of our artist array
  renderButtons();
}



// Event listener for all button elements
function search() {
  // In this case, the "this" keyword refers to the button that was clicked
  var artist = $(this).attr("data-name");

  // Constructing a URL to search Giphy for the name of the artist 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    artist + "&api_key=w68DeMrJ6mJxHAX7mW3vCQrbMJ5HNDiC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          var gifDiv = $("<div>");
          gifDiv.addClass("gif-div");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);
          p.addClass("rating");

          // Creating an image tag
          var artistImage = $("<img>");
          artistImage.addClass("gif");
          artistImage.attr("data-state", "still");
          artistImage.attr("data-still", results[i].images.fixed_height_still.url);
          artistImage.attr("data-animate", results[i].images.fixed_height.url);
          artistImage.attr("src", results[i].images.fixed_height_still.url);

          // Appending the paragraph and artistImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(artistImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
}

function gifState() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}