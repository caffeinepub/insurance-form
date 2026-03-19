import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const insuranceTypes = [
  {
    value: "life",
    label: "Life Insurance",
    desc: "Financial protection for your family",
  },
  {
    value: "health",
    label: "Health Insurance",
    desc: "Medical expenses coverage",
  },
  {
    value: "vehicle",
    label: "Vehicle Insurance",
    desc: "Protect your vehicle",
  },
  {
    value: "property",
    label: "Property Insurance",
    desc: "Home and real estate coverage",
  },
];

export default function StepCoverage({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label className="field-label">Insurance Type *</Label>
        <RadioGroup
          value={data.insuranceType}
          onValueChange={(v) =>
            onChange({ insuranceType: v as FormData["insuranceType"] })
          }
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          data-ocid="coverage.radio"
        >
          {insuranceTypes.map((type) => (
            <label
              key={type.value}
              htmlFor={`type-${type.value}`}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                data.insuranceType === type.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 bg-card"
              }`}
            >
              <RadioGroupItem
                id={`type-${type.value}`}
                value={type.value}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {type.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {type.desc}
                </p>
              </div>
            </label>
          ))}
        </RadioGroup>
        {errors.insuranceType && (
          <p
            className="text-destructive text-xs mt-1"
            data-ocid="coverage.error_state"
          >
            {errors.insuranceType}
          </p>
        )}
      </div>

      <div className="form-input-group">
        <div>
          <Label htmlFor="coverageAmount" className="field-label">
            Coverage Amount ($) *
          </Label>
          <Input
            id="coverageAmount"
            type="number"
            placeholder="500000"
            min="10000"
            value={data.coverageAmount || ""}
            onChange={(e) =>
              onChange({ coverageAmount: Number(e.target.value) })
            }
            data-ocid="coverage.input"
          />
          {errors.coverageAmount && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="coverage.error_state"
            >
              {errors.coverageAmount}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="startDate" className="field-label">
            Start Date *
          </Label>
          <Input
            id="startDate"
            type="date"
            value={data.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            data-ocid="coverage.input"
          />
          {errors.startDate && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="coverage.error_state"
            >
              {errors.startDate}
            </p>
          )}
        </div>
      </div>

      <div className="form-input-group">
        <div>
          <Label className="field-label">Policy Duration *</Label>
          <Select
            value={data.policyDuration}
            onValueChange={(v) =>
              onChange({ policyDuration: v as FormData["policyDuration"] })
            }
          >
            <SelectTrigger data-ocid="coverage.select">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months (Annual)</SelectItem>
            </SelectContent>
          </Select>
          {errors.policyDuration && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="coverage.error_state"
            >
              {errors.policyDuration}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="beneficiaryName" className="field-label">
            Beneficiary Name *
          </Label>
          <Input
            id="beneficiaryName"
            placeholder="Jane Doe"
            value={data.beneficiaryName}
            onChange={(e) => onChange({ beneficiaryName: e.target.value })}
            data-ocid="coverage.input"
          />
          {errors.beneficiaryName && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="coverage.error_state"
            >
              {errors.beneficiaryName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
