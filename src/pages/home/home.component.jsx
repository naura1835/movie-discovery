import { useEffect, useState } from "react";

import Header from "../../components/header/header.component";
import MovieCard from "../../components/movieCard/movieCard.components";

import CheveronArrow from "../../assets/Right.svg";

import "./home.styles.scss";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavouriteMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const faves = JSON.parse(localStorage.getItem("favourites"));

    if (faves) {
      setFavouriteMovies((prev) => [...prev, ...faves]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  useEffect(() => {
    async function fetchMovies() {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TOKEN,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();
      const movieArr = await data.results;

      return setMovies(movieArr);
    }

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    const { value } = e.target;

    setIsLoading(true);

    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TOKEN,
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    const searchArrResult = data.results;

    setIsLoading(false);

    return setSearchedMovies(searchArrResult);
  };

  //   console.log(searchedMovies);
  const addToFavourites = (movie) => {
    const doesMovieExists = favoriteMovies.find((item) => item.id == movie.id);

    if (doesMovieExists) return;

    return setFavouriteMovies((prev) => [...prev, movie]);
  };

  return (
    <>
      <Header
        movie={movies[0]}
        handleSearch={handleSearch}
        searchedMovies={searchedMovies}
        loading={isLoading}
        favoriteMovies={favoriteMovies}
      />

      <section aria-labelledby="featured movies" className="featured-movies">
        <div>
          <h2 id="featured-movies">Featured Movie</h2>
          <a>
            See more <img src={CheveronArrow} alt="right arrow" />
          </a>
        </div>
        <div className="featured-movies__section">
          {movies
            .filter((movie, index) => index > 0 && index <= 10)
            .map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToFavourites={addToFavourites}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
