import { Link } from "react-router-dom";
import Logo from "../components/ui/svg/logo.svg";

function Header() {
  return (
    <header className="relative h-16 w-full z-10 bg-white shadow-md">
      <div className="container h-full">
        <nav className="flex justify-between items-center h-full mx-4">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-serif"
            aria-label="Travel Planner Home"
          >
            Travel Planner
          </Link>
          <Link to="/">
            <img
              src={Logo}
              alt="Travel Planner Logo"
              width="64"
              height="64"
              loading="lazy"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
