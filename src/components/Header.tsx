import { Link } from "react-router-dom";

import TravelDialog from "./TravelDialog";

function Header() {
  return (
    <header className="relative h-16 w-full z-10 bg-white">
      <div className="container h-full">
        <div className="flex justify-between items-center h-full mx-4">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-serif"
            aria-label="Travel Planner Home"
          >
            Travel Planner
          </Link>
          <div>
            <TravelDialog />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
