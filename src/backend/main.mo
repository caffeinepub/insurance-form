import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Time "mo:core/Time";

actor {
  type Gender = {
    #male;
    #female;
    #other;
  };

  type InsuranceType = {
    #life;
    #health;
    #vehicle;
    #property;
  };

  type Status = {
    #pending;
    #reviewed;
  };

  type InsuranceForm = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    dateOfBirth : Text;
    gender : Gender;
    email : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    zipCode : Text;
    country : Text;
    insuranceType : InsuranceType;
    coverageAmount : Float;
    startDate : Text;
    beneficiaryName : Text;
    additionalDetails : Text;
    submittedAt : Int;
    status : Status;
  };

  let formEntries = Map.empty<Nat, InsuranceForm>();
  var nextFormId = 0;

  public shared ({ caller }) func submitForm(
    firstName : Text,
    lastName : Text,
    dateOfBirth : Text,
    gender : Gender,
    email : Text,
    phone : Text,
    address : Text,
    city : Text,
    state : Text,
    zipCode : Text,
    country : Text,
    insuranceType : InsuranceType,
    coverageAmount : Float,
    startDate : Text,
    beneficiaryName : Text,
    additionalDetails : Text,
  ) : async Nat {
    let form : InsuranceForm = {
      id = nextFormId;
      firstName;
      lastName;
      dateOfBirth;
      gender;
      email;
      phone;
      address;
      city;
      state;
      zipCode;
      country;
      insuranceType;
      coverageAmount;
      startDate;
      beneficiaryName;
      additionalDetails;
      submittedAt = Time.now();
      status = #pending;
    };

    formEntries.add(nextFormId, form);
    nextFormId += 1;

    form.id;
  };

  public query ({ caller }) func getAllSubmissions() : async [InsuranceForm] {
    let formsList = formEntries.values().toArray();
    formsList;
  };

  public query ({ caller }) func getSubmissionById(id : Nat) : async InsuranceForm {
    switch (formEntries.get(id)) {
      case (null) { Runtime.trap("Submission not found") };
      case (?form) { form };
    };
  };

  public query ({ caller }) func getTotalSubmissions() : async Nat {
    formEntries.size();
  };
};
