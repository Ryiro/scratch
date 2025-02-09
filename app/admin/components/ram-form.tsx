import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function RAMForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Memory Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Speed</FormLabel>
          <FormControl>
            <Input placeholder="e.g., DDR4-3200" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Modules</FormLabel>
          <FormControl>
            <Input placeholder="e.g., 2x8GB" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>First Word Latency</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter latency" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>CAS Latency</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter CAS latency" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
