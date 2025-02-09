import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function MotherboardForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Motherboard Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Socket</FormLabel>
          <FormControl>
            <Input placeholder="e.g., AM4" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Form Factor</FormLabel>
          <FormControl>
            <Input placeholder="e.g., ATX" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Memory Support (GB)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Maximum memory" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Memory Slots</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Number of slots" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            <Input placeholder="e.g., Black" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
