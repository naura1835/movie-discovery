/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import MovieList from "../movieList/movieList.components";

import movieBoxLogo from "../../assets/Logo.svg";
import playIcon from "../../assets/Play.svg";

import "./header.styles.scss";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState("");
  const {
    movie = { title: "", overview: "" },
    handleSearch,
    searchedMovies,
    loading,
    favoriteMovies,
  } = props;
  const { backdrop_path, title, overview, id } = movie;

  useEffect(() => {
    //fecth youtube key for trailer video
    const fetchVideo = async () => {
      const url = `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${
        import.meta.env.VITE_API_KEY
      }`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TOKEN,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();
      const trailer = await data.results?.find(
        (res) => res.name.toLowerCase() == "main trailer"
      );

      return setYoutubeKey(trailer.key);
    };

    fetchVideo();
  }, [movie, id]);

  return (
    <header className="hero-section">
      <img
        className="hero-section__img"
        src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
        alt={title}
      />
      <nav>
        <ul className="hero-section__nav-bar">
          <li className="logo">
            <img src={movieBoxLogo} alt="movie box logo" />
            <h1>MovieBox</h1>
          </li>

          <li className="search-bar">
            <div className="search-bar__input">
              <input
                type="search"
                name="movie-search"
                placeholder="what do you want to watch?"
                onChange={handleSearch}
              />
            </div>

            {loading ? (
              <section className="search-bar__result">
                <p>eee</p>
              </section>
            ) : (
              searchedMovies.length !== 0 && (
                <section className="search-bar__result">
                  <MovieList arr={searchedMovies} />
                </section>
              )
            )}
          </li>

          <li className="menu">
            <a href="#">Sign In</a>
            <div
              className="nav__hamburger-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="line"></span>
              <span className="line"></span>
            </div>
            {isOpen && (
              <section aria-labelledby="favorites" className="favorites">
                <h2 id="favorites">Favorites</h2>
                <MovieList arr={favoriteMovies} />
              </section>
            )}
          </li>
        </ul>
      </nav>

      <section
        aria-labelledby="movie-title"
        className="hero-section__description"
      >
        <h2 id="movie-title">{title}</h2>
        <p>{overview}</p>
        <a
          className="watch-trailer"
          href={`https://www.youtube.com/watch?v=${youtubeKey}`}
        >
          <img src={playIcon} alt="play icon" />
          Watch Trailer
        </a>
      </section>
    </header>
  );
};

export default Header;
