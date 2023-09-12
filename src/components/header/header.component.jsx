/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import movieBoxLogo from "../../assets/Logo.svg";
import playIcon from "../../assets/Play.svg";

import "./header.styles.scss";
import MovieListItem from "../movieListItem/movieListItem.components";

const Header = ({
  movie = { title: "", overview: "" },
  handleSearch,
  searchedMovies,
}) => {
  const { backdrop_path, title, overview } = movie;

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
            {searchedMovies.length !== 0 && (
              <section className="search-bar__result">
                <ul>
                  {searchedMovies.map((movie) => (
                    <Link
                      className="search-bar__result__item"
                      key={movie.id}
                      to={`details/${movie.id}`}
                    >
                      <MovieListItem movie={movie} />
                    </Link>
                  ))}
                </ul>
              </section>
            )}
          </li>
          <li>
            <a href="#">Sign In</a>
            <div className="nav__hamburger-menu">
              <span className="line"></span>
              <span className="line"></span>
            </div>
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
          href={`https://www.youtube.com/results?search_query=${title.replaceAll(
            " ",
            "+"
          )}`}
        >
          <img src={playIcon} alt="play icon" />
          Watch Trailer
        </a>
      </section>
    </header>
  );
};

export default Header;
