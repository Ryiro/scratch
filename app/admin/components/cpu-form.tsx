import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function CPUForm() {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">CPU Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Microarchitecture</FormLabel>
          <FormControl>
            <Input
              placeholder="e.g., Zen 3"
              {...form.register("microarchitecture")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Core Count</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Number of cores"
              {...form.register("coreCount")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Core Clock (MHz)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Base clock speed"
              {...form.register("coreClock")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Boost Clock (MHz)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Boost clock speed"
              {...form.register("boostClock")}
            />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
