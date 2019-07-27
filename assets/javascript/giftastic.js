$(document).ready(function() {
  // Initialize the variables topic
  var topics = [
    "Burgers",
    "Tacos",
    "Salami",
    "Fries",
    "Pizza",
    "Noodles",
    "Rice",
    "Donuts",
    "Gelato"
  ];

  // Empty the buttons and populate buttons
  function createBtns() {
    $("#btns").empty();

    for (var i = 0; i < topics.length; i++) {
      var gifButton = $("<button>");

      gifButton.attr("ID", "gifArrayBtns");
      gifButton.attr("class", "btn btn-primary btn-space");
      gifButton.attr("data-food", topics[i].trim());
      gifButton.text(topics[i]);

      $("#btns").append(gifButton);
    }
  }

  createBtns();

  // Empty array to store favourites
  function renderFavs(favs) {
    $("#gif-favorites").empty();

    for (var i = 0; i < favs.length; i++) {
      var favsImg = $("<img>");
      favsImg.attr("src", favs[i]);
      favsImg.attr("style", "width: 150px; height: 150px"); // appends giphy to this size in favorites
      favsImg.addClass("btn-space");

      $("#gif-favorites").append(favsImg);
    }
  }

  // Create a choice for click or press
  // create on clicks to push new topic & button
  $("#add-keyword").click(function() {
    event.preventDefault();
    var keywordPush = $("#keyword-term").val();
    topics.push(keywordPush);
    createBtns();
    $("#keyword-term").val("");
  });

  // create keyup to push new topic & button
  $("#keyword-term").keyup(function(event) {
    if (event.keyCode === 13) {
      $("#add-keyword").click();
    }
  });

  // first build the ajax query based on current button clicked
  $(document).on("click", "#gifArrayBtns", function() {
    var searchQuery = $(this).attr("data-food");
    var apiKEY = "api_key=6mtnETzCO7QOxr1jLW6GpafrjE6NjLYL";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?" +
      apiKEY +
      "&q=" +
      searchQuery +
      "&limit=10"; // limited to 10 GIPHYs
    console.log(queryURL);
    // make the ajax query and stores the response
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var gifArray = response.data;

      for (var i = 0; i < gifArray.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("card btn-space mx-auto");
        gifDiv.attr("style", "width: 20em");
        var gifDivBody = $("<div>");
        gifDivBody.addClass("card-body");

        var gifRating = gifArray[i].rating;
        var gifTitle = gifArray[i].title;
        var gifTitleShort = gifTitle.slice(0, 15);

        // Displays the Ratings in div card-body
        var title = $("<strong>").text(gifTitleShort.toUpperCase() + "...");
        title.attr("class", "card-title");
        var rating = $("<p>").text("Rating: " + gifRating.toUpperCase());
        rating.attr("class", "card-body");

        var gifAnimate = gifArray[i].images.fixed_height.url;
        var gifStill = gifArray[i].images.fixed_height_still.url;
        var gifImage = $("<img>");
        gifImage.attr("src", gifStill);
        gifImage.attr("data-still", gifStill);
        gifImage.attr("data-animate", gifAnimate);
        gifImage.attr("data-state", "still");
        gifImage.addClass("card-img-top gif");

        // Create favourites
        var favourites = $("<i>");
        favourites.addClass("fa fa-heart-o heart fa-1x");
        favourites.attr("aria-hidden", "true");
        favourites.attr("span-image", gifAnimate);

        gifDiv.append(gifImage);
        gifDiv.append(gifDivBody);
        gifDivBody.append(title);
        gifDivBody.append(rating);
        gifDivBody.append(favourites);

        $("#gif-body").prepend(gifDiv);
      }
    });
  });

  // create on clicks to add favourites
  $(document).on("click", ".fa", function() {
    var favImg = $(this).attr("span-image");
    favs.push(favImg);
    renderFavs(favs);
    localStorage.setItem("favs-array", JSON.stringify(favs));
  });

  // create on clicks to clear favourites
  $("#clearFavs").click(function() {
    localStorage.removeItem("favs-array");
    renderFavs(favs);
    favs = [];
    $("#gif-favorites").empty();
  });

  // create on clicks for each image that has been displayed
  $(document).on("click", "img.gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // stores gif locally in the browser of the user
  var favs = JSON.parse(localStorage.getItem("favs-array"));
  if (!Array.isArray(favs)) {
    favs = [];
  }

  renderFavs(favs);
});
