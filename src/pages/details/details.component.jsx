import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  }, []);

  return (
    <div>
      <h1>{details.title}</h1>
      <p>{details.overview}</p>
    </div>
  );
};

export default DetailsPage;
