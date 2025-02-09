import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CaseForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Case Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATX_FULL">ATX Full Tower</SelectItem>
              <SelectItem value="ATX_MID">ATX Mid Tower</SelectItem>
              <SelectItem value="MATX">Micro ATX</SelectItem>
              <SelectItem value="ITX">Mini ITX</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            <Input placeholder="e.g., Black" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Power Supply Shroud</FormLabel>
          <FormControl>
            <Input type="number" placeholder="PSU shroud size" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Side Panel</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TEMPERED_GLASS">Tempered Glass</SelectItem>
              <SelectItem value="ACRYLIC">Acrylic</SelectItem>
              <SelectItem value="MESH">Mesh</SelectItem>
              <SelectItem value="SOLID">Solid</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>External Volume (L)</FormLabel>
          <FormControl>
            <Input type="number" step="0.1" placeholder="Volume in liters" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Internal 3.5&quot; Bays</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Number of drive bays" />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
