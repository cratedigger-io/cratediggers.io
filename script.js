const app = {};

// selectors
const form = document.querySelector('form');
const button = document.querySelector('button');
const searchInput = document.querySelector('input[type=text]');
const resultsList = document.getElementById('results');

// global variables
const url = new URL('http://ws.audioscrobbler.com/2.0/');
// last.fm API key: 3f350f5eaa519a05c6b21c5afc810ec0
// giphy API key: jGXNQaBmzgNmpV5vrHUt2lcq0QMg7F1s

app.getArtistsInfo = (query, searchMethod) => {
	url.search = new URLSearchParams({
		method: searchMethod,
		artist: query,
		api_key: '3f350f5eaa519a05c6b21c5afc810ec0',
		limit: 10,
		format: 'json'
	})

	fetch(url)
		.then((response) => {
			return response.json();
		}).then((data) => {
			app.displayArtistsInfo(data, searchMethod);
		})
}

const giphyURL = new URL('https://api.giphy.com/v1/gifs/search')

app.getArtistPicture = (artist, query, artistContainer) => {
	giphyURL.search = new URLSearchParams({
		api_key: 'jGXNQaBmzgNmpV5vrHUt2lcq0QMg7F1s',
		q: query,
		limit: 1
	})

	fetch(giphyURL)
		.then((response) => {
			return response.json();
		}).then((data) => {
			console.log(data);
			const picture = data.data[0].images.original.url;
			app.displayArtistRecommendations(artist, picture, artistContainer);
		});
		
}

app.displayArtistRecommendations = (artist,picture, artistContainer) =>{
	const artistInfo = `${artist.name} 
			<img src="${picture}" alt="${artist.name}">
			<a href="${artist.url}">check out their last.fm page</a> `
	artistContainer.innerHTML = artistInfo;
	resultsList.append(artistContainer);
}


app.displayArtistsInfo = (data, searchMethod) => {
	let artistsResults;
	if(searchMethod === 'artist.search'){
		artistsResults = data.results.artistmatches.artist
	} else if (searchMethod === 'artist.getSimilar'){
		artistsResults = data.similarartists.artist
	}
	resultsList.innerHTML = '';

	artistsResults.forEach( (artist) => {
		const artistContainer = document.createElement('li');
		artistContainer.classList.add('artist')
		let artistInfo;

		if(searchMethod === 'artist.search'){
			artistInfo = artist.name;
			artistContainer.addEventListener('click', function() {
				app.getArtistsInfo(this.textContent, 'artist.getSimilar');
			})
			artistContainer.innerHTML = artistInfo;
			resultsList.append(artistContainer);
		}else if(searchMethod === 'artist.getSimilar'){
			app.getArtistPicture(artist, artist.name, artistContainer);
		}
		
	})
}

app.transformHeader = () => {
	// select the headerFlexContainer
	const headerFlexContainer = document.querySelector('.headerFlexContainer');

	// add the class to move header to top of screen
	headerFlexContainer.classList.add('topPosition');
}

app.transformMain = () => {
	// select the headerFlexContainer
	const main = document.querySelector('main');

	// add the class to move header to top of screen
	main.classList.add('bigMain');
}





app.init = () => {
	button.addEventListener('click', (event) => {
		event.preventDefault();

		const searchValue = searchInput.value;
		app.transformHeader();
		app.transformMain();
		app.getArtistsInfo(searchValue,'artist.search');
	})
}

app.init();