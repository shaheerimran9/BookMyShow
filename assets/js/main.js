const movieList = document.querySelector('.movies-list');
const apiKey = '820d6db8746f3de6a93c6c922bf8074e';

const loadMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(movie => {
                createMovieContainer(movie);
            })
        });
};

const createMovieContainer = (movieData) => {
    // Create elements
    const movieContainer = document.createElement('div');
    const moviePoster = document.createElement('div');
    const movieInfo = document.createElement('div');
    const movieTitle = document.createElement('h2');
    const movieRatingWrapper = document.createElement('div');
    const movieRating = document.createElement('p');
    const ratingIcon = document.createElement('i');
    const movieGenreWrapper = document.createElement('div');

    // Append Elements
    movieRatingWrapper.append(ratingIcon, movieRating);
    movieInfo.append(movieTitle, movieRatingWrapper, movieGenreWrapper);
    movieContainer.append(moviePoster, movieInfo);

    // Apply class names
    movieContainer.classList.add('movie-container');
    moviePoster.classList.add('movie-poster');
    movieInfo.classList.add('movie-information');
    movieTitle.classList.add('movie-title');
    movieRatingWrapper.classList.add('movie-rating-wrapper');
    movieRating.classList.add('movie-rating')
    ratingIcon.classList.add('fas', 'fa-star');
    movieGenreWrapper.classList.add('movie-genre');

    // Apply styles
    moviePoster.style.background = `url('https://image.tmdb.org/t/p/w500${movieData.poster_path}') center center/cover`

    // Add text
    movieTitle.innerHTML = `${movieData.original_title}`;
    movieRating.innerHTML += `${movieData.vote_average}/10 IMDb`;

    // Add Genres
    fetch('../assets/js/genres.json')
        .then(res => res.json())
        .then(data => {
            movieData.genre_ids.forEach(id => {
                data.genres.forEach(genre => {
                    if (genre.id === id) {
                        const movieGenre = document.createElement('div');
                        movieGenre.classList.add('genre');
                        movieGenre.innerHTML = genre.name;
                        movieGenreWrapper.appendChild(movieGenre);
                    };
                });
            });
        });

    // Add event listener
    movieContainer.addEventListener('click', () => {
        sessionStorage.setItem('movieID', movieData.id);
        window.location = 'booking.html'
    })

    // Append movie container to movie list
    movieList.appendChild(movieContainer);
};

loadMovies();