import facebook from "../../assets/fa-brands_facebook-square.svg";
import instagram from "../../assets/fa-brands_instagram.svg";
import youtube from "../../assets/fa-brands_youtube.svg";
import twitter from "../../assets/fa-brands_twitter.svg";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <footer>
      <ul className="socials">
        <li className="socials_li">
          <img src={facebook} alt="facebook" />
        </li>
        <li className="socials_li">
          <img src={instagram} alt="instagram" />
        </li>
        <li className="socials_li">
          <img src={youtube} alt="youtube" />
        </li>
        <li className="socials_li">
          <img src={twitter} alt="twitter" />
        </li>
      </ul>
      <ul className="links">
        <li>Conditions of use</li>
        <li>Privacy & Policy</li>
        <li>Press room</li>
      </ul>
      <p className="copyright">© 2021 MovieBox by Adriana Eka Prayudha</p>
    </footer>
  );
};

export default Footer;
