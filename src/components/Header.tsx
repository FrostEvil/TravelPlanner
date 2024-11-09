import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.setAttribute("style", "overflow:hidden");
    }

    return () => {
      document.body.setAttribute("style", "overflow:visible");
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isModalOpen) setIsModalOpen(false);
  };

  const handleCloseModalByEscapeKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") setIsModalOpen(false);
  };

  return (
    <header
      onClick={handleCloseModal}
      onKeyUp={handleCloseModalByEscapeKey}
      className="relative h-16 w-full z-10 bg-white"
    >
      <div className="container h-full">
        <div className="flex justify-between items-center h-full mx-4">
          <Link to="/" className="text-2xl font-serif">
            Travel Planner
          </Link>
          <Button onClick={handleOpenModal} size="lg">
            Add a new trip
          </Button>
        </div>
      </div>
      <div>{isModalOpen && <Modal {...{ setIsModalOpen }} />}</div>
    </header>
  );
}

export default Header;
