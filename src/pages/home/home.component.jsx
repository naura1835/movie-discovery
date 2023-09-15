import { useEffect, useState } from "react";

import Header from "../../components/header/header.component";
import MovieCard from "../../components/movieCard/movieCard.components";
import Footer from "../../components/footer/footer.component";

import CheveronArrow from "../../assets/Right.svg";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
      try {
        const url =
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
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

        setMovies(movieArr);
      } catch (err) {
        if (err instanceof TypeError) {
          notify("Failed to fetch");
        }
        if (err instanceof SyntaxError) {
          notify("There was a syntax error");
        }
      }
    }

    fetchMovies();
  }, []);

  //return search result
  const handleSearch = async (e) => {
    const { value } = e.target;
    let searchArrResult = "";

    if (!value) setSearchedMovies([]);

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!value) {
      setIsLoading(true);

      try {
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

        if (data.results.length == 0) throw new Error("no movie found");
        console.log(data);

        setIsLoading(false);
        searchArrResult = data.results;

        setSearchedMovies(searchArrResult);
      } catch (err) {
        if (err instanceof TypeError) {
          notify("Failed to fetch");
        }
        if (err instanceof SyntaxError) {
          notify("There was a syntax error");
        }
        if (err.message == "no movie found") {
          notify("Movie not found, try searching with a different keyword");
        }

        setIsLoading(false);
      }
    }
  };

  const addToFavourites = (movie) => {
    const doesMovieExists = favoriteMovies.find((item) => item.id == movie.id);

    if (doesMovieExists) return;

    return setFavouriteMovies((prev) => [...prev, movie]);
  };

  const notify = (message) => toast.error(message);

  return (
    <>
      <Header
        movie={movies[0]}
        handleSearch={handleSearch}
        searchedMovies={searchedMovies}
        loading={isLoading}
        favoriteMovies={favoriteMovies}
      />
      <ToastContainer />

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
      <Footer />
    </>
  );
};

export default HomePage;
