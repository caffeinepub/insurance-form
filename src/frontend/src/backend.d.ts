import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InsuranceForm {
    id: bigint;
    status: Status;
    insuranceType: InsuranceType;
    additionalDetails: string;
    country: string;
    beneficiaryName: string;
    dateOfBirth: string;
    city: string;
    submittedAt: bigint;
    email: string;
    zipCode: string;
    state: string;
    address: string;
    gender: Gender;
    coverageAmount: number;
    phone: string;
    lastName: string;
    startDate: string;
    firstName: string;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum InsuranceType {
    life = "life",
    property = "property",
    vehicle = "vehicle",
    health = "health"
}
export enum Status {
    pending = "pending",
    reviewed = "reviewed"
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<InsuranceForm>>;
    getSubmissionById(id: bigint): Promise<InsuranceForm>;
    getTotalSubmissions(): Promise<bigint>;
    submitForm(firstName: string, lastName: string, dateOfBirth: string, gender: Gender, email: string, phone: string, address: string, city: string, state: string, zipCode: string, country: string, insuranceType: InsuranceType, coverageAmount: number, startDate: string, beneficiaryName: string, additionalDetails: string): Promise<bigint>;
}
