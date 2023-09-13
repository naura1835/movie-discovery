import { Link } from "react-router-dom";

import MovieListItem from "../movieListItem/movieListItem.components";

import "./movieList.styles.scss";

const MovieList = (prop) => {
  const { arr } = prop;
  return (
    <ul className="movie-list">
      {arr.map((item) => (
        <Link className="list__item" key={item.id} to={`details/${item.id}`}>
          <MovieListItem movie={item} />
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
