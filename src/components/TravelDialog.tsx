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
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TravelProps } from "@/types/type";

type TravelDialogProps = {
  refetchTravels: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TravelProps[], Error>>;
};

function TravelDialog({ refetchTravels }: TravelDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="cta"
          className="text-sm sm:text-base px-6 sm:px-8 w-full uppercase"
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
        <NewTravelForm
          setOpenDialog={setOpenDialog}
          refetchTravels={refetchTravels}
        />
      </DialogContent>
    </Dialog>
  );
}

export default TravelDialog;
