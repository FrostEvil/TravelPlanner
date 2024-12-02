import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewTravelForm from "./NewTravelForm";

function TravelDialog() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="text-sm sm:text-base px-6 sm:px-8"
          aria-label="Add a new trip"
        >
          Add a new trip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base text-black mt-2 px-2 font-semibold uppercase flex self-center">
            Add your trip below!
          </DialogTitle>
        </DialogHeader>
        <NewTravelForm setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default TravelDialog;
