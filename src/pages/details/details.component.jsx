import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import list from "../../assets/List.svg";
import star from "../../assets/Star.svg";
import tickets from "../../assets/TwoTickets.svg";

import "./details.styles.scss";
import SideBar from "../../components/sidebar/sidebar.component";

const DetailsPage = () => {
  const [details, setDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TOKEN,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();
      return setDetails((prev) => ({ ...prev, ...data }));
      // .then((json) => setDetails(json))
      // .catch((err) => console.error("error:" + err));
    };

    fetchDetails();
  }, [movieId]);

  console.log(details);
  // `http://api.themoviedb.org/3/movie/${
  //           details.id
  //         }/videos?api_key=${import.meta.env.VITE_API_KEY}`

  return (
    <section className="details">
      <SideBar />
      <article className="details__movie-info">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          className="details__movie-info__img"
        />
        <div className="details__movie-info__wrapper">
          <ul className="details__movie-info__header">
            <li
              data-testid="movie-title"
              className="details__movie-info__header__item"
            >
              {details.title}
            </li>
            <li
              data-testid="movie-release-date"
              className="details__movie-info__header__item"
            >
              {details.release_date}
            </li>
            <li className="details__movie-info__header__item">
              <span data-testid="movie-runtime">{details.runtime}</span>m
            </li>
            <li>
              {details?.genres?.map((item) => (
                <div key={item.id} className="genre-chip">
                  {item.name}
                </div>
              ))}
            </li>
          </ul>
          <p
            data-testid="movie-overtime"
            className="details__movie-info__overview"
          >
            {details.overview}
          </p>
        </div>
        <div className="details__movie-info__others">
          <div className="details__movie-info__others__rating">
            User Rating
            <img src={star} alt="star" />
            <span className="vote--average">
              {details.vote_average?.toFixed(1)}
            </span>
            <span className="vote--count"> | {details.vote_count}k</span>
          </div>
          <button className="showtime">
            <img src={tickets} alt="tickets" />
            See show times
          </button>
          <button className="watch-options">
            <img src={list} alt="list" />
            More watch options
          </button>
        </div>
      </article>
    </section>
  );
};

export default DetailsPage;
