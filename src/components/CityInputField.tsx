import { ControllerRenderProps } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type CityFieldType = {
  field: ControllerRenderProps<
    {
      city: string;
      date: Date;
    },
    "city"
  >;
};

function CityInputField({ field }: CityFieldType) {
  return (
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
  );
}

export default CityInputField;
