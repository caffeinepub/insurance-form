# Insurance Form Website

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Multi-step insurance application form
- Step 1: Personal Information (name, DOB, gender, contact)
- Step 2: Address Details (street, city, state, zip, country)
- Step 3: Insurance Coverage (type, coverage amount, start date, beneficiary)
- Step 4: Health/Vehicle/Property details depending on insurance type
- Step 5: Review & Submit
- Progress indicator showing current step
- Form validation on each step
- Submission confirmation screen
- Store submitted forms in backend
- Admin view to list all submissions

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Store form submissions with all fields, query submissions list
2. Frontend: Multi-step form with progress bar, validation, review screen, confirmation
3. Admin page to view all submitted applications
