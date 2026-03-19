import type { FormData } from "../../pages/HomePage";

interface Props {
  data: FormData;
}

function ReviewSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 pb-2 border-b border-border">
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

function ReviewField({
  label,
  value,
}: { label: string; value: string | number | undefined }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-semibold text-foreground mt-0.5">
        {value || "—"}
      </p>
    </div>
  );
}

export default function StepReview({ data }: Props) {
  let additionalParsed: Record<string, string> = {};
  try {
    additionalParsed = JSON.parse(data.additionalDetails || "{}");
  } catch {
    // ignore
  }

  const typeLabels: Record<string, string> = {
    life: "Life Insurance",
    health: "Health Insurance",
    vehicle: "Vehicle Insurance",
    property: "Property Insurance",
  };

  const genderLabels: Record<string, string> = {
    male: "Male",
    female: "Female",
    other: "Other",
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary font-medium">
          ✓ Please review all information carefully before submitting your
          application.
        </p>
      </div>

      <ReviewSection title="Personal Information">
        <ReviewField label="First Name" value={data.firstName} />
        <ReviewField label="Last Name" value={data.lastName} />
        <ReviewField label="Date of Birth" value={data.dateOfBirth} />
        <ReviewField
          label="Gender"
          value={genderLabels[data.gender] || data.gender}
        />
        <ReviewField label="Email" value={data.email} />
        <ReviewField label="Phone" value={data.phone} />
      </ReviewSection>

      <ReviewSection title="Address Details">
        <ReviewField label="Street Address" value={data.address} />
        <ReviewField label="City" value={data.city} />
        <ReviewField label="State" value={data.state} />
        <ReviewField label="ZIP Code" value={data.zipCode} />
        <ReviewField label="Country" value={data.country} />
      </ReviewSection>

      <ReviewSection title="Coverage Details">
        <ReviewField
          label="Insurance Type"
          value={typeLabels[data.insuranceType] || data.insuranceType}
        />
        <ReviewField
          label="Coverage Amount"
          value={
            data.coverageAmount
              ? `$${data.coverageAmount.toLocaleString()}`
              : ""
          }
        />
        <ReviewField label="Start Date" value={data.startDate} />
        <ReviewField
          label="Policy Duration"
          value={data.policyDuration ? `${data.policyDuration} Months` : ""}
        />
        <ReviewField label="Beneficiary Name" value={data.beneficiaryName} />
      </ReviewSection>

      {Object.keys(additionalParsed).length > 0 && (
        <ReviewSection title="Additional Details">
          {Object.entries(additionalParsed).map(([key, val]) => (
            <ReviewField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").trim()}
              value={val}
            />
          ))}
        </ReviewSection>
      )}
    </div>
  );
}
