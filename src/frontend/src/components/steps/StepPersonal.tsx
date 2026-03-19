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

export default function StepPersonal({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="form-input-group">
        <div>
          <Label htmlFor="firstName" className="field-label">
            First Name *
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            data-ocid="personal.input"
          />
          {errors.firstName && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="field-label">
            Last Name *
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            data-ocid="personal.input"
          />
          {errors.lastName && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="form-input-group">
        <div>
          <Label htmlFor="dateOfBirth" className="field-label">
            Date of Birth *
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            data-ocid="personal.input"
          />
          {errors.dateOfBirth && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.dateOfBirth}
            </p>
          )}
        </div>
        <div>
          <Label className="field-label">Gender *</Label>
          <Select
            value={data.gender}
            onValueChange={(v) => onChange({ gender: v as FormData["gender"] })}
          >
            <SelectTrigger data-ocid="personal.select">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.gender}
            </p>
          )}
        </div>
      </div>

      <div className="form-input-group">
        <div>
          <Label htmlFor="email" className="field-label">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            data-ocid="personal.input"
          />
          {errors.email && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="phone" className="field-label">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            data-ocid="personal.input"
          />
          {errors.phone && (
            <p
              className="text-destructive text-xs mt-1"
              data-ocid="personal.error_state"
            >
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
