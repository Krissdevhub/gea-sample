# MP-GEA Comprehensive QA & Test Plan

## 1. Test Strategy & Scope
Testing guarantees the integrity of government engineer records, financial transactions, document protections, and administrative boundaries across desktop, tablet, and mobile form factors.

## 2. Test Suites
- **Unit & Logic Tests**:
  - Unique membership number sequence generator (no duplicates under concurrent load).
  - Password hashing and token generation.
  - Razorpay HMAC signature verification and webhook idempotency.
  - RBAC permission evaluator against all 8 defined roles.
- **Integration Tests**:
  - Multi-step registration to `UNDER_REVIEW` state transition.
  - Verification workflow: Admin requests correction -> Member resubmits -> Admin approves -> Payment unlocked.
  - Payment success -> Membership activated -> Receipt created -> Card generated.
  - Document access control: Public allowed on public orders, 401/403 on member-only orders without session.
  - Grievance lifecycle: Creation -> Officer assignment -> Member update -> Resolution.
  - Directory privacy: Logged-out vs logged-in vs admin data masking.
  - Offline elections: Verification that absolutely NO voting submission endpoint exists.
- **End-to-End (E2E) Browser Journeys**:
  - Full end-to-end journey from new applicant registration, admin review, correction, approval, payment, and digital ID display.
  - Administrative management of circulars, events, grievances, and offline elections.
- **Security & Negative Case Testing**:
  - IDOR attempts: Member A attempting to read Member B's private grievance or document.
  - Forged payment signatures and replayed webhooks.
  - Unauthenticated access to `/admin/*` and `/portal/*`.
  - Malicious file uploads (executable disguised as PDF, oversized files).
  - SQL injection and XSS fuzzing on search inputs and grievance descriptions.
