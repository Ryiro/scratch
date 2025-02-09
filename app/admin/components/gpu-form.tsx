import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export function GPUForm() {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">GPU Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Chipset</FormLabel>
          <FormControl>
            <Input placeholder="e.g., RTX 4090" {...form.register("chipset")} />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Memory (GB)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="VRAM size"
              {...form.register("memory")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>TDP (W)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Power consumption"
              {...form.register("TDP")}
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
      </div>
    </div>
  );
}
