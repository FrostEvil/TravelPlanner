import validateAndAddTravel from "@/utils/validateAndAddTravel";
import { formSchema } from "@/schemas/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "./ui/form";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { TravelProps } from "@/types/type";
import CityInputField from "./CityInputField";
import DataPickerField from "./DataPickerField";
import { handleToast } from "@/utils/handleToast";

type NewTravelFormProps = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  refetchTravels: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TravelProps[], Error>>;
};

function NewTravelForm({ setOpenDialog, refetchTravels }: NewTravelFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: validateAndAddTravel,
    onSuccess: (data) => {
      handleToast(data);
      if (data.status === "success") {
        setOpenDialog(false);
        refetchTravels();
      }
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      toast({
        variant: "destructive",
        description: errorMessage,
      });
    },
    onSettled: () => setIsSubmitting(false),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    mutation.mutate({
      id: uuidv4(),
      city: values.city,
      date: values.date.toISOString().split("T")[0],
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* City Input */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => <CityInputField field={field} />}
        />
        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => <DataPickerField field={field} />}
        />
        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          className={`w-full ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
export default NewTravelForm;
