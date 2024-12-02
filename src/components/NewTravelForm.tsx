import validateAndAddTravel from "@/utils/validateAndAddTravel";
import { formSchema } from "@/schemas/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

type ValidationResult = {
  status: "success" | "exist" | "error";
  message: string;
};

type ToastProps = {
  variant: "default" | "destructive" | null | undefined;
  description: string;
};

function NewTravelForm({
  setOpenDialog,
}: {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleToast = (result: ValidationResult) => {
    const toastConfig = {
      success: { variant: "default", description: result.message },
      exist: { variant: "destructive", description: result.message },
      error: { variant: "destructive", description: result.message },
    };
    toast(toastConfig[result.status] as ToastProps);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const addTravelResult: ValidationResult = await validateAndAddTravel({
        id: uuidv4(),
        city: values.city,
        date: values.date.toISOString().split("T")[0],
      });

      handleToast(addTravelResult);

      if (addTravelResult.status === "success") {
        setOpenDialog(false);
        form.reset();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* City Input */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">Enter city: </FormLabel>
              <FormControl>
                <Input
                  id="city"
                  placeholder="city name..."
                  {...field}
                  value={field.value || ""}
                  aria-label="City name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="date">Date of travel:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      aria-label="Select travel date"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
export default NewTravelForm;
