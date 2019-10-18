# Giftastic

This is an app that starts with about 20 buttons containing names of animals. On clicking any of the buttons, it would bring up 10 gifs of the animals pulled from the Giphy API. The user can then add their own animal button to click on.

The gifs all come in stills and when the user clicks on the picture, it would cause the picture to animate. The user can toggle it back to a still on alternate clicks.

The user can then choose to favourite any of their gifs which are then stored at the bottom of the screen. The favourites are stored in local storage in the browser and would be available for the user on subsequent visits.

## Deployment

https://josephcheok.github.io/Giftastic/

## Technologies

Built with

- HTML
- Bootstrap v4.3
- fontAwesome
- jQuery
- AJAX
- Giphy API

## Lessons Learnt from Building This

1. What APIs actually do and how to plug into them using AJAX requests

2. How to construct API calls and execute with AJAX

3. Handling AJAX responses and access retrieved data

4. How to manipulate parsed JSON objects/properties to generate elements to html

5. How to introduce state change to toggle the gifs from a state of stillness to animated.

6. How to use Bootstrap card function to contain the gifs into an organised manner.

7. How to use substring to extract the name of a file before the extension (for titling cards).

## Future Feature

To have the previous collection clear (except favourites) everytime another button is pressed.
