import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Gender, InsuranceType } from "../backend.d";
import ConfirmationScreen from "../components/ConfirmationScreen";
import Footer from "../components/Footer";
import FormStepper from "../components/FormStepper";
import Navbar from "../components/Navbar";
import StepAdditional from "../components/steps/StepAdditional";
import StepAddress from "../components/steps/StepAddress";
import StepCoverage from "../components/steps/StepCoverage";
import StepPersonal from "../components/steps/StepPersonal";
import StepReview from "../components/steps/StepReview";
import { useSubmitForm } from "../hooks/useQueries";

export interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  insuranceType: InsuranceType | "";
  coverageAmount: number;
  startDate: string;
  policyDuration: "6" | "12" | "";
  beneficiaryName: string;
  additionalDetails: string;
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  insuranceType: "",
  coverageAmount: 0,
  startDate: "",
  policyDuration: "",
  beneficiaryName: "",
  additionalDetails: "{}",
};

const stepTitles = [
  "Personal Information",
  "Address Details",
  "Coverage Details",
  "Additional Details",
  "Review & Submit",
];

const stepSubtitles = [
  "Provide your basic personal information",
  "Enter your current residential address",
  "Choose your coverage plan and details",
  "Provide details specific to your insurance type",
  "Review all information before final submission",
];

function validateStep(step: number, data: FormData): Record<string, string> {
  const errs: Record<string, string> = {};
  if (step === 1) {
    if (!data.firstName.trim()) errs.firstName = "First name is required";
    if (!data.lastName.trim()) errs.lastName = "Last name is required";
    if (!data.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
    if (!data.gender) errs.gender = "Gender is required";
    if (!data.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(data.email))
      errs.email = "Valid email is required";
    if (!data.phone.trim()) errs.phone = "Phone number is required";
  }
  if (step === 2) {
    if (!data.address.trim()) errs.address = "Street address is required";
    if (!data.city.trim()) errs.city = "City is required";
    if (!data.state.trim()) errs.state = "State is required";
    if (!data.zipCode.trim()) errs.zipCode = "ZIP code is required";
    if (!data.country) errs.country = "Country is required";
  }
  if (step === 3) {
    if (!data.insuranceType)
      errs.insuranceType = "Please select an insurance type";
    if (!data.coverageAmount || data.coverageAmount < 10000)
      errs.coverageAmount = "Minimum coverage is $10,000";
    if (!data.startDate) errs.startDate = "Start date is required";
    if (!data.policyDuration)
      errs.policyDuration = "Policy duration is required";
    if (!data.beneficiaryName.trim())
      errs.beneficiaryName = "Beneficiary name is required";
  }
  return errs;
}

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner",
    text: "SecureCover made the entire insurance process effortless. The online form was intuitive and I got my policy within 24 hours!",
    rating: 5,
  },
  {
    name: "James Thornton",
    role: "Family of 4",
    text: "After comparing multiple providers, SecureCover offered the best health coverage at a price that fits our family budget.",
    rating: 5,
  },
  {
    name: "Dr. Priya Nair",
    role: "Medical Professional",
    text: "Exceptional customer service. When I needed to file a claim, the process was smooth and the team was incredibly supportive.",
    rating: 5,
  },
];

const trustBadges = [
  {
    icon: Shield,
    title: "256-bit SSL Encryption",
    desc: "Your data is fully secured",
  },
  { icon: Award, title: "A+ Rated", desc: "Best-in-class provider rating" },
  { icon: Users, title: "200K+ Customers", desc: "Trusted nationwide" },
  { icon: Clock, title: "24/7 Support", desc: "Always here for you" },
];

const starKeys = ["s1", "s2", "s3", "s4", "s5"];

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<bigint | null>(null);
  const { mutateAsync: submitForm, isPending } = useSubmitForm();

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    const errs = validateStep(currentStep, formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (
      !formData.gender ||
      !formData.insuranceType ||
      !formData.policyDuration
    ) {
      toast.error("Please complete all required fields");
      return;
    }
    try {
      const id = await submitForm({
        ...formData,
        gender: formData.gender as Gender,
        insuranceType: formData.insuranceType as InsuranceType,
      });
      setSubmittedId(id);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setCurrentStep(1);
    setSubmittedId(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-background pt-12 pb-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-2"
            >
              Apply for Personal Insurance
            </motion.h1>
            <p className="text-muted-foreground text-sm">
              Complete the form below to get your personalized coverage plan
            </p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          {submittedId !== null ? (
            <Card className="shadow-card border-border rounded-xl overflow-hidden">
              <ConfirmationScreen
                applicationId={submittedId}
                onReset={handleReset}
              />
            </Card>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="hidden lg:block w-60 shrink-0 pt-2">
                <FormStepper currentStep={currentStep} />
              </div>

              <div className="lg:hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary">
                    Step {currentStep} of 5
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stepTitles[currentStep - 1]}
                  </span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <Card
                  className="shadow-card border-border rounded-xl overflow-hidden"
                  data-ocid="form.card"
                >
                  <div className="px-7 py-5 border-b border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                      Step {currentStep} of 5
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {stepTitles[currentStep - 1]}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stepSubtitles[currentStep - 1]}
                    </p>
                  </div>

                  <div className="px-7 py-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentStep === 1 && (
                          <StepPersonal
                            data={formData}
                            onChange={updateForm}
                            errors={errors}
                          />
                        )}
                        {currentStep === 2 && (
                          <StepAddress
                            data={formData}
                            onChange={updateForm}
                            errors={errors}
                          />
                        )}
                        {currentStep === 3 && (
                          <StepCoverage
                            data={formData}
                            onChange={updateForm}
                            errors={errors}
                          />
                        )}
                        {currentStep === 4 && (
                          <StepAdditional
                            data={formData}
                            onChange={updateForm}
                            errors={errors}
                          />
                        )}
                        {currentStep === 5 && <StepReview data={formData} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="px-7 py-5 border-t border-border flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrev}
                      disabled={currentStep === 1}
                      className="gap-1.5"
                      data-ocid="form.secondary_button"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    {currentStep < 5 ? (
                      <Button
                        onClick={handleNext}
                        className="gap-1.5 bg-primary hover:bg-primary/90"
                        data-ocid="form.primary_button"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="gap-1.5 bg-primary hover:bg-primary/90"
                        data-ocid="form.submit_button"
                      >
                        {isPending && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        {isPending ? "Submitting..." : "Submit Application"}
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </section>

        <section className="bg-card border-t border-border py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Why Choose SecureCover?
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                We&apos;ve been protecting families and businesses for over 25
                years with industry-leading coverage and unmatched customer
                service.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-background hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <badge.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              What our customers say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-xl p-6 border border-border"
                >
                  <div className="flex gap-0.5 mb-3">
                    {starKeys.slice(0, t.rating).map((key) => (
                      <Star
                        key={key}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
