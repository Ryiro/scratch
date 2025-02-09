import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export function StorageForm() {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Storage Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Capacity</FormLabel>
          <FormControl>
            <Input placeholder="e.g., 1TB" {...form.register("capacity")} />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Type</FormLabel>
          <Select onValueChange={(value) => form.setValue("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SSD">SSD</SelectItem>
              <SelectItem value="HDD">HDD</SelectItem>
              <SelectItem value="NVME">NVMe</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        <FormItem>
          <FormLabel>Cache (MB)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Cache size"
              {...form.register("cache")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Form Factor</FormLabel>
          <FormControl>
            <Input
              placeholder="e.g., 2.5-inch"
              {...form.register("formFactor")}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Interface</FormLabel>
          <FormControl>
            <Input
              placeholder="e.g., SATA III"
              {...form.register("interface")}
            />
          </FormControl>
        </FormItem>
      </div>
    </div>
  );
}
