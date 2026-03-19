import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Home } from "lucide-react";

interface Props {
  applicationId: bigint;
  onReset: () => void;
}

export default function ConfirmationScreen({ applicationId, onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Application Submitted!
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Your insurance application has been received. Our team will review and
        contact you within 2–3 business days.
      </p>

      <div className="bg-muted/60 border border-border rounded-lg px-8 py-4 mb-8">
        <p className="text-xs text-muted-foreground font-medium mb-1">
          Application Reference Number
        </p>
        <p className="text-2xl font-bold text-primary tracking-widest">
          SC-{String(applicationId).padStart(6, "0")}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="gap-2"
          data-ocid="confirmation.secondary_button"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button
          onClick={onReset}
          className="gap-2 bg-primary hover:bg-primary/90"
          data-ocid="confirmation.primary_button"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
