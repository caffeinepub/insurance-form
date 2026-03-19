import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FormData } from "../../pages/HomePage";

interface Props {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export default function StepAdditional({ data, onChange, errors }: Props) {
  const type = data.insuranceType;

  const handleAdditionalChange = (key: string, value: string) => {
    const parsed: Record<string, string> = {};
    try {
      Object.assign(parsed, JSON.parse(data.additionalDetails || "{}"));
    } catch {
      // ignore
    }
    parsed[key] = value;
    onChange({ additionalDetails: JSON.stringify(parsed) });
  };

  const getAdditional = (key: string) => {
    try {
      const parsed = JSON.parse(data.additionalDetails || "{}");
      return parsed[key] || "";
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {type === "health" && (
        <>
          <div>
            <Label htmlFor="preExisting" className="field-label">
              Pre-existing Medical Conditions
            </Label>
            <Textarea
              id="preExisting"
              placeholder="List any pre-existing conditions (e.g., diabetes, hypertension)..."
              rows={3}
              value={getAdditional("preExisting")}
              onChange={(e) =>
                handleAdditionalChange("preExisting", e.target.value)
              }
              data-ocid="additional.textarea"
            />
          </div>
          <div>
            <Label htmlFor="currentMedications" className="field-label">
              Current Medications
            </Label>
            <Textarea
              id="currentMedications"
              placeholder="List current medications if any..."
              rows={2}
              value={getAdditional("currentMedications")}
              onChange={(e) =>
                handleAdditionalChange("currentMedications", e.target.value)
              }
              data-ocid="additional.textarea"
            />
          </div>
        </>
      )}

      {type === "vehicle" && (
        <>
          <div className="form-input-group">
            <div>
              <Label htmlFor="vehicleMake" className="field-label">
                Vehicle Make *
              </Label>
              <Input
                id="vehicleMake"
                placeholder="Toyota"
                value={getAdditional("make")}
                onChange={(e) => handleAdditionalChange("make", e.target.value)}
                data-ocid="additional.input"
              />
            </div>
            <div>
              <Label htmlFor="vehicleModel" className="field-label">
                Vehicle Model *
              </Label>
              <Input
                id="vehicleModel"
                placeholder="Camry"
                value={getAdditional("model")}
                onChange={(e) =>
                  handleAdditionalChange("model", e.target.value)
                }
                data-ocid="additional.input"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="vehicleYear" className="field-label">
              Vehicle Year *
            </Label>
            <Input
              id="vehicleYear"
              type="number"
              placeholder="2022"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={getAdditional("year")}
              onChange={(e) => handleAdditionalChange("year", e.target.value)}
              className="max-w-xs"
              data-ocid="additional.input"
            />
          </div>
        </>
      )}

      {type === "property" && (
        <>
          <div>
            <p className="field-label">Property Type *</p>
            <RadioGroup
              value={getAdditional("propertyType")}
              onValueChange={(v) => handleAdditionalChange("propertyType", v)}
              className="flex flex-wrap gap-3 mt-2"
              data-ocid="additional.radio"
            >
              {[
                "Single Family Home",
                "Condo/Apartment",
                "Townhouse",
                "Commercial",
              ].map((pt) => (
                <button
                  type="button"
                  key={pt}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-all ${
                    getAdditional("propertyType") === pt
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-border hover:border-primary/40"
                  }`}
                  onClick={() => handleAdditionalChange("propertyType", pt)}
                >
                  <RadioGroupItem value={pt} aria-label={pt} />
                  {pt}
                </button>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="propertyAddress" className="field-label">
              Property Address (if different from mailing address)
            </Label>
            <Input
              id="propertyAddress"
              placeholder="456 Oak Avenue, Suite 100"
              value={getAdditional("propertyAddress")}
              onChange={(e) =>
                handleAdditionalChange("propertyAddress", e.target.value)
              }
              data-ocid="additional.input"
            />
          </div>
        </>
      )}

      {type === "life" && (
        <>
          <div>
            <p className="field-label">Smoking Status *</p>
            <RadioGroup
              value={getAdditional("smoker")}
              onValueChange={(v) => handleAdditionalChange("smoker", v)}
              className="flex gap-4 mt-2"
              data-ocid="additional.radio"
            >
              {[
                { value: "no", label: "Non-Smoker" },
                { value: "yes", label: "Smoker" },
              ].map(({ value, label }) => (
                <button
                  type="button"
                  key={value}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer text-sm transition-all ${
                    getAdditional("smoker") === value
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-border hover:border-primary/40"
                  }`}
                  onClick={() => handleAdditionalChange("smoker", value)}
                >
                  <RadioGroupItem value={value} aria-label={label} />
                  {label}
                </button>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="occupation" className="field-label">
              Occupation
            </Label>
            <Input
              id="occupation"
              placeholder="Software Engineer"
              value={getAdditional("occupation")}
              onChange={(e) =>
                handleAdditionalChange("occupation", e.target.value)
              }
              data-ocid="additional.input"
            />
          </div>
        </>
      )}

      {!type && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            Please complete Step 3 (Coverage Details) to see relevant additional
            fields.
          </p>
        </div>
      )}

      {errors.additional && (
        <p
          className="text-destructive text-xs mt-1"
          data-ocid="additional.error_state"
        >
          {errors.additional}
        </p>
      )}
    </div>
  );
}
