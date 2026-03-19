import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData } from "../../pages/HomePage";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
  "Germany",
  "France",
  "Other",
];

export default function StepAddress({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <Label htmlFor="address" className="field-label">
          Street Address *
        </Label>
        <Input
          id="address"
          placeholder="123 Main Street, Apt 4B"
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          data-ocid="address.input"
        />
        {errors.address && (
          <p
            className="text-destructive text-xs mt-1"
            data-ocid="address.error_state"
          >
            {errors.address}
          </p>
        )}
      </div>

      <div className="form-input-group">
        <div>
          <Label htmlFor="city" className="field-label">
            City *
          </Label>
          <Input
            id="city"
            placeholder="New York"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            data-ocid="address.input"
          />
          {errors.city && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="address.error_state"
            >
              {errors.city}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="state" className="field-label">
            State / Province *
          </Label>
          <Input
            id="state"
            placeholder="NY"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            data-ocid="address.input"
          />
          {errors.state && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="address.error_state"
            >
              {errors.state}
            </p>
          )}
        </div>
      </div>

      <div className="form-input-group">
        <div>
          <Label htmlFor="zipCode" className="field-label">
            ZIP / Postal Code *
          </Label>
          <Input
            id="zipCode"
            placeholder="10001"
            value={data.zipCode}
            onChange={(e) => onChange({ zipCode: e.target.value })}
            data-ocid="address.input"
          />
          {errors.zipCode && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="address.error_state"
            >
              {errors.zipCode}
            </p>
          )}
        </div>
        <div>
          <Label className="field-label">Country *</Label>
          <Select
            value={data.country}
            onValueChange={(v) => onChange({ country: v })}
          >
            <SelectTrigger data-ocid="address.select">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="address.error_state"
            >
              {errors.country}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
