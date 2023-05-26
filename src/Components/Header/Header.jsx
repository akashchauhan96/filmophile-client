import logo from "../../assets/icons/filmophile-icon.svg";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__content-container">
        <Link to="/" className="header__logo-link">
          <div className="header__logo-container">
            <img
              className="header__logo-icon"
              src={logo}
              alt="Filmophile Website Logo"
            />
            <h2 className="header__logo-name">Filmophile</h2>
          </div>
        </Link>
        <div className="header__user-section">
          <nav className="nav">
            <ul className="nav__lists">
              <Link to="/movie-lists" className="nav__list-link">
                <li className="nav__list-item">Movie Lists</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
