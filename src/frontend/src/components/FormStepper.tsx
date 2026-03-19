import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  subtitle: string;
}

const steps: Step[] = [
  { number: 1, title: "Personal Information", subtitle: "Basic details" },
  { number: 2, title: "Address Details", subtitle: "Your location" },
  { number: 3, title: "Coverage Details", subtitle: "Policy options" },
  { number: 4, title: "Additional Details", subtitle: "Specific info" },
  { number: 5, title: "Review & Submit", subtitle: "Final review" },
];

interface Props {
  currentStep: number;
}

export default function FormStepper({ currentStep }: Props) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isPending = step.number > currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.number} className="flex gap-3 relative">
            {/* Connector line */}
            {!isLast && (
              <div
                className="absolute left-[19px] top-10 w-0.5 bottom-0"
                style={{
                  background: isCompleted
                    ? "oklch(0.52 0.145 247)"
                    : "oklch(0.89 0.018 237)",
                  height: "calc(100% - 8px)",
                }}
              />
            )}

            {/* Circle indicator */}
            <div className="relative z-10 shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-card border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
            </div>

            {/* Text */}
            <div className="pb-8 pt-1.5">
              <p
                className={`text-sm font-semibold leading-tight ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.subtitle}
              </p>
              {isCompleted && (
                <span className="inline-block mt-1 text-[10px] font-semibold text-primary/70 bg-primary/8 px-1.5 py-0.5 rounded">
                  Completed
                </span>
              )}
              {isActive && (
                <span className="inline-block mt-1 text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  Active
                </span>
              )}
              {isPending && (
                <span className="inline-block mt-1 text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  Pending
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
