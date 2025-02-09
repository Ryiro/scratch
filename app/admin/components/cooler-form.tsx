import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CoolerForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Cooler Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>TDP (W)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Thermal Design Power" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>RPM</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Fan speed in RPM" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Noise Level (dB)</FormLabel>
          <FormControl>
            <Input type="number" step="0.1" placeholder="Noise in decibels" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Size (mm)</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Size in millimeters" />
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
