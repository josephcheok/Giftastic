$(document).ready(function() {
  // Event listener for our animal button
  var animalArray = [
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "skunk",
    "goldfish",
    "bird",
    "ferret",
    "turtle",
    "sugar glider",
    "chinchilla",
    "hedgehog",
    "hermit crab",
    "gerbil",
    "pygmy goat",
    "chicken",
    "capybara",
    "teacup pig",
    "serval",
    "salamander",
    "frog"
  ];

  function renderButtons() {
    $("#buttons").empty();
    for (i = 0; i < animalArray.length; i++) {
      var newButton = $("<button>");
      $("#buttons").append(newButton);
      newButton.text(animalArray[i]);
      newButton.attr("data-name", animalArray[i]);
      newButton.addClass("animal-button");
    }
  }

  function displayGif() {
    var animal = $(this).attr("data-name");
    var apiURL = "https://api.giphy.com/v1/gifs";
    var apiKey = "api_key=zz7pjXXmpaTVF3Q0omxtafzrE3CEU7Du";
    var limit = 10;
    var queryURL =
      apiURL + "/search?" + apiKey + "&q=" + animal + "&limit=" + limit;

    console.log(queryURL);
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After the data from the AJAX request comes back
      .then(function(response) {
        var gifArray = response.data;
        console.log(response);
        for (i = 0; i < gifArray.length; i++) {
          // Saving the image_original_url property
          var imageUrlStill = gifArray[i].images.fixed_height_still.url;
          var imageUrlAnimate = gifArray[i].images.fixed_height.url;
          // var imageUrl = gifArray[i].url;
          console.log(imageUrlStill);
          // Creating and storing an image tag
          var gifDiv = $("<div>");
          var animalImage = $("<img>");
          var rating = gifArray[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          // Setting the animalImage src attribute to imageUrl
          animalImage.attr("src", imageUrlStill);
          animalImage.attr("data-still", imageUrlStill);
          animalImage.attr("data-animate", imageUrlAnimate);
          animalImage.attr("data-state", "still");
          animalImage.attr("alt", "animal image");
          animalImage.addClass("gif");

          // Prepending the catImage to the images div

          $("#images").prepend(gifDiv);
          gifDiv.prepend(animalImage);
          gifDiv.addClass("gifDiv");
          gifDiv.prepend(p);
        }
      });
  }

  function changeGifState() {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      // Else set src to the data-still value
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    animal = $("#animal-input")
      .val()
      .trim();

    // Adding movie from the textbox to our array
    animalArray.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".animal-button", displayGif);

  //Clicking on the still image animates it and vice versa.
  $(document).on("click", ".gif", changeGifState);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});
