import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PowerSupplyForm() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Power Supply Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Wattage</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Power in watts" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATX">ATX</SelectItem>
              <SelectItem value="SFX">SFX</SelectItem>
              <SelectItem value="TFX">TFX</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Efficiency</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="80PLUS">80 PLUS</SelectItem>
              <SelectItem value="80PLUS_BRONZE">80 PLUS Bronze</SelectItem>
              <SelectItem value="80PLUS_SILVER">80 PLUS Silver</SelectItem>
              <SelectItem value="80PLUS_GOLD">80 PLUS Gold</SelectItem>
              <SelectItem value="80PLUS_PLATINUM">80 PLUS Platinum</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Modular</FormLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL">Full</SelectItem>
              <SelectItem value="SEMI">Semi</SelectItem>
              <SelectItem value="NO">No</SelectItem>
            </SelectContent>
          </Select>
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
