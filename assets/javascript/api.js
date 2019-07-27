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

  var favArray = [];

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

  // This function used to render favourite images from array.
  function renderFavourites() {
    $("#favourites").empty();
    for (var i = 0; i < favArray.length; i++) {
      var favImg = $("<img>");
      favImg.attr("src", favArray[i]);
      favImg.addClass("favImg");
      $("#favourites").append(favImg);
    }
  }

  // This function created to truncate titles to before the word GIF to fit in Bootstrap card
  function truncate(str1) {
    var pattern = "GIF";
    var str2 = "";
    if (str1.indexOf(pattern) >= 0) {
      str2 = str1.substr(0, str1.indexOf(pattern));
      return str2;
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

        for (i = 0; i < gifArray.length; i++) {
          // Targeting and saving the necessary response data for rendering the gif and related info
          var imageUrlStill = gifArray[i].images.fixed_height_still.url;
          var imageUrlAnimate = gifArray[i].images.fixed_height.url;
          var gifTitle = gifArray[i].title;
          var gifTitleShort = truncate(gifTitle);
          var gifRating = gifArray[i].rating;

          // Defining the elements that make up a BootStrap card in order
          var cardDiv = $("<div>");
          var animalImage = $("<img>");
          var cardBody = $("<div>");
          var cardTitle = $("<h5>");
          var p = $("<p>");

          //Setting the attribute of the card elements to assimilate Bootstrap classification
          cardDiv.addClass("card");
          cardDiv.attr("style", "width: 18rem;");
          animalImage.addClass("card-img-top");
          cardBody.addClass("card-body");
          cardTitle.addClass("card-title");
          p.addClass("card-text");

          // Setting the animalImage src attribute to imageUrl
          animalImage.attr("src", imageUrlStill);
          animalImage.attr("data-still", imageUrlStill);
          animalImage.attr("data-animate", imageUrlAnimate);
          animalImage.attr("data-state", "still");
          animalImage.attr("alt", "animal image");
          animalImage.addClass("gif");

          // Generates an icon to allow user to favourite the picture
          var favourites = $("<i>");
          favourites.addClass("fa fa-heart heart fa-2x");
          favourites.attr("aria-hidden", "true");
          favourites.attr("span-image", imageUrlAnimate);

          // Populating the empty card elements with response data variables defined above
          $("#images").prepend(cardDiv);
          cardDiv.append(animalImage);
          cardDiv.addClass("cardDiv");
          cardDiv.append(cardBody);
          cardBody.append(cardTitle);
          cardTitle.append(gifTitleShort);
          cardBody.append(p);
          p.append("Rating: " + gifRating);
          cardBody.append(favourites);
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

  function movetoFavourite() {
    // remove favourited image from pool to avoid duplication
    var grandparentDiv = $(this).parentsUntil("#images");
    grandparentDiv.remove();

    //add favourite to array
    var favGIF = $(this).attr("span-image");
    favArray.push(favGIF);
    renderFavourites(favArray);
    localStorage.setItem("Favourites", JSON.stringify(favArray));
  }

  // create on clicks to clear favourites
  $("#clearFavourites").click(function() {
    event.preventDefault();
    localStorage.removeItem("Favourites");
    favArray = [];
    $("#favourites").empty();
  });

  // This function handles events where the add abunak button is clicked
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    animal = $("#animal-input")
      .val()
      .trim();
    animalArray.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".animal-button", displayGif);

  //Clicking on the still image animates it and vice versa.
  $(document).on("click", ".gif", changeGifState);

  //Clicking on heart icon moves the gif to favourite section
  $(document).on("click", ".fa", movetoFavourite);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  favArray = JSON.parse(localStorage.getItem("Favourites"));
  if (!Array.isArray(favArray)) {
    favArray = [];
  }

  renderFavourites();
});
