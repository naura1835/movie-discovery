import { Link } from "react-router-dom";
import calender from "../../assets/Calendar.svg";
import home from "../../assets/Home.svg";
import logo from "../../assets/Logo.svg";
import logout from "../../assets/Logout.svg";
import movieProjector from "../../assets/MovieProjector.svg";
import tVShow from "../../assets/TvShow.svg";

import "./sidebar.styles.scss";

const SideBar = () => {
  const navItemsArr = [
    { title: "home", url: "/", icon: home, altText: "moviebox logo" },
    {
      title: "movies",
      url: "/",
      icon: movieProjector,
      altText: "movie projector",
    },
    { title: "tv series", url: "/", icon: tVShow, altText: "tvshow" },
    { title: "upcoming", url: "/", icon: calender, altText: "calender" },
    { title: "logout", url: "/", icon: logout, altText: "logout" },
  ];
  return (
    <nav className="side-bar">
      <div className="logo">
        <img src={logo} alt="moviebox logo" />
        <span>MovieBox</span>
      </div>
      <ul>
        {navItemsArr.map((item, index) => (
          <Link key={index} to={item.url}>
            <li className="side-bar__item">
              <img src={item.icon} alt={item.altText} />
              <span>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default SideBar;
