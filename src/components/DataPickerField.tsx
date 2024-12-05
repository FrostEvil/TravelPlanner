import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ControllerRenderProps } from "react-hook-form";

type DataFieldType = {
  field: ControllerRenderProps<
    {
      city: string;
      date: Date;
    },
    "date"
  >;
};

function DataPickerField({ field }: DataFieldType) {
  return (
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
  );
}

export default DataPickerField;
