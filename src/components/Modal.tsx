import ReactDOM from "react-dom";
import NewTravelForm from "./NewTravelForm";
import { IoMdClose } from "react-icons/io";
import { Button } from "./ui/button";
import { ModalProps } from "@/types/type";

function Modal({ setIsModalOpen }: ModalProps) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed p-10 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col  gap-y-6 z-50 bg-white rounded-lg min-w-96"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3 className="text-base text-black mt-2 px-2 font-semibold uppercase flex self-center">
          Add your trip below!
        </h3>
        <Button
          onClick={handleCloseModal}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
        >
          <IoMdClose />
        </Button>
        <NewTravelForm setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="fixed inset-0 bg-white opacity-80 z-20"></div>
    </>,
    document.getElementById("portal")!
  );
}

export default Modal;
