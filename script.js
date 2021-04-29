const url = new URL('http://ws.audioscrobbler.com/2.0/');

// last.fm API key: 3f350f5eaa519a05c6b21c5afc810ec0
// giphy API key: jGXNQaBmzgNmpV5vrHUt2lcq0QMg7F1s

// test run of the API
url.search = new URLSearchParams({
	method: 'artist.getInfo',
	artist: 'cher',
	api_key: '3f350f5eaa519a05c6b21c5afc810ec0',
	format: 'json'
})

fetch(url)
	.then( (response) => {
		console.log(response)
		return response.json();
	}).then( (data) => {
		console.log(data);
	})

// MVP is to display similar artist recommendations to the user
// get user input for artist
// get artist search results from API
// display artist search results on page
// get user selection for artist
// get similar artist recommendations from API

// stretch goals
// autocomplete widget - when the user stops typing in the search input, display a drop down of suggested artist searches by making an API call with the value in the search input
// display the top 5 tracks of recommended artist when the user interacts with the displayed artist
// explore option - under the search bar there are genre tags listed. when the user clicks on a tag, display the top artists for that tag
// get bio by making another API call using the artist.getInfo method
// add artist images using the GIPHY API


/////////////////
// PSEUDO CODE //
/////////////////

// a landing page with the app heading " " and a welcome message " "

// under the heading there is a form with a search bar and a submit button

//// STRETCH GOAL-  under the search bar there are genre tags listed. when the user clicks on a tag, display the top artists for that tag

//// STRETCH GOAL - when the user stops typing in the search input, display a drop down of suggested artist searches by making an API call with the value in the search input

// add a submit event on the form to grab the value from the search input and make an API request for artist search

// store the user selection in a variable

// create <li> elements using forEach() for each artist and append to the page on the <ul>

// add a click event of the individual <li>'s to make an API call tog et similar artist recommendations based on which displayed artist was clicked

// store the user selection in a variable

// clear the <ul>

// using forEach() create <li> elements for each similar artist 

//// STRETCH GOAL - get bio by making another API call using the artist.getInfo method

// append the recommended artists to the page on the <ul>

//// STRETCH GOAL - display the top 5 tracks of recommended artist when the user interacts with the displayed artist

//// STRETCH GOAL - add gifs to each artist in the recommended artist results