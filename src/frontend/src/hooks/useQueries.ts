import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Gender, InsuranceForm, InsuranceType } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<InsuranceForm[]>({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SubmitFormInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  insuranceType: InsuranceType;
  coverageAmount: number;
  startDate: string;
  beneficiaryName: string;
  additionalDetails: string;
}

export function useSubmitForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation<bigint, Error, SubmitFormInput>({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitForm(
        data.firstName,
        data.lastName,
        data.dateOfBirth,
        data.gender,
        data.email,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.zipCode,
        data.country,
        data.insuranceType,
        data.coverageAmount,
        data.startDate,
        data.beneficiaryName,
        data.additionalDetails,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
}
