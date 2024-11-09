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
import checkTravel from "@/utils/checkTravel";
import { ModalProps } from "@/types/type";
import { toast } from "@/hooks/use-toast";
import { ShowTravelContext } from "@/pages/TravelPlannerPage";
import { useContext } from "react";

function NewTravelForm({ setIsModalOpen }: ModalProps) {
  const { setKey, setShownTravels } = useContext(ShowTravelContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postStatus = await checkTravel({
      id: uuidv4(),
      place: values.place,
      date: values.date.toISOString().split("T")[0],
    });
    if (postStatus === "Success") {
      toast({
        description: "You have successfully added a new place!",
      });
      setKey((k) => k + 1);
      setShownTravels([]);
      setIsModalOpen(false);
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong... Try again.",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter city: </FormLabel>
              <FormControl>
                <Input placeholder="city name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of travel:</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
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
        <Button type="submit" variant="default" size="lg" className="w-full ">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default NewTravelForm;