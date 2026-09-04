# GDA-MP Reference Audit for MP-GEA

**Reference URL**: https://gda-mp.org/  
**Audit Date**: September 2026  
**Auditor**: MP-GEA Full-Stack Architecture Team  
**Scope**: Structural, functional, and domain analysis for adaptation into MP-GEA (Madhya Pradesh Government Engineers' Association).

---

## 1. Public Pages Found
From public crawling, `sitemap.xml`, and bundle route inspection, the following public pages are present:
- **Home (`/`)**: Institutional landing page featuring association mission, key metrics (members, units, circulars), quick links, notice ticker, latest circulars, news updates, leadership preview, and CTA for registration.
- **About (`/about`)**: Background of the association, history, and founding charter.
- **Objectives (`/objectives`)**: Core aims, member welfare priorities, professional standards, and advocacy goals.
- **Governance (`/governance`)**: Leadership hierarchy, State Executive Committee, Central Council, Office Bearers, and constitutional roles.
- **Financials (`/financials`)**: Public transparency portal displaying audited annual financial summaries and balance sheet highlights.
- **Circulars / Orders (`/circulars`)**: Searchable and filterable archive of official notifications, government orders, and association circulars.
- **News / Press (`/news`)**: Public press statements, media releases, and departmental announcements.
- **Activities (`/activities`)**: Association initiatives, delegations to ministries, and professional representations.
- **Gallery (`/gallery`)**: Photo galleries of conferences, executive meetings, state conventions, and protests/delegations.
- **Events (`/events`)**: Upcoming and past state/district conferences, general body meetings, and workshops.
- **Partners / Affiliates (`/partners`)**: Allied federations and professional confederation affiliations.
- **Contact (`/contact`)**: Official headquarters address (Bhopal, MP), contact email, executive contacts, office hours, and enquiry form.
- **Join / Membership (`/join`)**: Online multi-step onboarding portal for new applicants.
- **Member Authentication**:
  - Login: `/login`
  - Register: `/register`
  - Password Reset: `/forgot-password` & `/reset-password`
- **Legal & Compliance Pages**:
  - Code of Conduct: `/code-of-conduct`
  - Privacy Policy: `/privacy-policy`
  - Terms of Use: `/terms-of-use`
  - Refund & Cancellation: `/refund-policy`
  - Shipping / Fulfillment: `/shipping-policy`
- **Public Member Identity Verification (`/verify/:memberId`)**: QR-code landing page verifying valid active status without revealing private contact details.

---

## 2. Main Navigation Structure
- **Top Utility Bar**: Association official email, helpline, helpline hours, and quick link to Member Portal / Join.
- **Header**:
  - Left: Emblem / Association Logo + Full Association Name and Chapter details.
  - Center: Nav Menu (Home, About Us [About, Objectives, Governance, Bylaws], Documents [Government Orders, Circulars], Media [News, Events, Activities, Gallery], Transparency [Financials, Elections], Contact).
  - Right: 'Join Association' (High-contrast CTA) & 'Member Login' button.
- **Footer**: Institutional sitemap, quick links, contact info, legal policy links, copyright, and disclaimer.

---

## 3. Membership Workflow
1. **Application Submission**:
   - Applicant fills personal details (Name, DOB, Gender, Mobile, Email, Photo).
   - Professional details (Designation, Department/Hospital, Posting District, Date of Joining, Qualification, Medical Reg No).
   - Document upload (Department ID card, appointment order, council registration certificate).
2. **Review & Scrutiny (Admin)**:
   - Status transitions to `UNDER_REVIEW`.
   - Membership Admin verifies government service credentials.
   - Admin can:
     - **Approve**: Moves to `APPROVED_AWAITING_PAYMENT`.
     - **Request Correction**: Adds note specifying required fix; applicant notified to edit and resubmit.
     - **Reject**: Provides rejection justification; application closed.
3. **Payment & Activation**:
   - Applicant logs in upon approval.
   - Razorpay gateway modal triggered for fee payment.
   - Server validates webhook / signature.
   - Membership activates (`ACTIVE`), membership number issued (e.g., `MPGDA/...`), digital identity card generated with signed verification QR.

---

## 4. Member Portal Capabilities Visible & Described
From route analysis and client bundle introspection:
- **Dashboard (`/portal/dashboard`)**: Welcome greeting, membership card widget, status badge, circular ticker, renewal countdown, active grievances widget.
- **Digital ID Card (`/portal/id-card`)**: Interactive visual identity card with photo, membership number, cadre, designation, department, validity, and QR code. Print/Download action.
- **My Profile (`/portal/profile` & `/portal/professional-profile`)**: Self-service management of contact info, communication preferences; read-only/audit-protected service credentials.
- **Directory (`/portal/directory`)**: Member search with department, designation, and district filters; privacy-restricted fields.
- **Payments & Receipts (`/portal/payments`)**: Historical ledger of fee transactions, downloadable official tax/fee receipts.
- **Grievance Module (`/portal/grievance`)**: Ticket submission for service matters, status progression tracking, communication log with association committee.
- **Document Library Access**: Unlocks protected member-only circulars, seniority lists, and legal advisories.
- **Offline Election Information (`/portal/elections`)**: Displays election schedules, nomination notifications, candidate lists, physical voting venues, and certified offline election results.

---

## 5. Document & Circular System
- Hierarchical categorization: Government Orders, Gazette Notifications, Service Rules, Pay Commission Orders, Transfer Policies, Association Circulars.
- Meta tags: Department, Year, Order Number, Date of Issue, Subject.
- Multi-tier visibility:
  - **Public**: Broad public notices, press statements.
  - **Members Only**: Protected service representations, pay revision circulars, seniority drafts.
  - **Admin Only**: Confidential executive drafts and legal filings.
- Security: Protected documents served via authenticated endpoints preventing direct public URL scraping.

---

## 6. Governance Features
- Complete breakdown of State Executive Council, Divisional Units, and District Units.
- Office bearer directory: Designation, Name, Region, Portfolio.
- Association meeting minutes and central committee resolutions repository.

---

## 7. Financial Features
- Annual financial report publication.
- Audited balance sheets and receipts/expenditures statement summaries.
- Membership subscription collection metrics.
- Strict separation between public summaries and treasurer administrative ledgers.

---

## 8. Grievance Features
- Dedicated categorization for cadre issues (promotions, time-scale pay, hazardous duty, transfers, workplace protection).
- Unique reference tracking IDs.
- Two-way update timeline: Member updates + Committee case progress notes.
- Separate escalation mechanism for collective association representations.

---

## 9. Event Features
- State conventions, General Body Meetings (GBM), and divisional coordination conclaves.
- Event information: Venue, schedule, agenda, speaker/dignitary list.
- Member registration tracking and attendee export for organizers.

---

## 10. Election-Related Functionality
- **Strictly Informational & Physical (Offline)**:
  - Clear declaration: *No electronic voting or digital ballot exists.*
  - Publication of Election Commission notification, Returning Officer details.
  - Timeline of stages: Nomination -> Scrutiny -> Withdrawal -> Final Contestant List -> Physical Polling -> Offline Counting -> Certified Results.
  - Post-wise candidate profiles and certified winning results archive.

---

## 11. Security & Privacy Patterns Observable
- Authentication via secure sessions and HttpOnly cookies.
- `robots.txt` disallows indexing on `/admin/`, `/portal/`, `/verify/`, and auth flows.
- Public QR verification page (`/verify/:id`) strictly limits output to Name, Status, and Membership Number, withholding personal contact info, phone, email, and employee ID.
- File upload types restricted and renamed.

---

## 12. Features Adapted for Government Engineers (MP-GEA)
- **Cadres & Departments**: Adapted from Health/Medical to State Engineering Departments (PWD, WRD, PHED, NVDA, RES, UADD, MPPKVVCL/Discoms, MP Police Housing Corporation, etc.).
- **Hierarchy & Designations**: Sub-Engineer, Assistant Engineer (AE), Executive Engineer (EE), Superintending Engineer (SE), Chief Engineer (CE), Engineer-in-Chief (E-in-C).
- **Engineering Disciplines**: Civil, Electrical, Mechanical, Electronics, IT/Computer, Environmental.
- **Service Verification**: State Employee ID / Treasury PRAN / Departmental appointment order.
- **Grievance Focus**: Engineering cadre restructuring, 4-tier pay scales, technical risk allowances, arbitrary suspensions, site safety, transfer policy compliance, technical autonomy.

---

## 13. Features That Must NOT Be Copied
- No medical council registration (MPMC/MCI).
- No clinical incident reporting (CIRP) or medical emergency codes.
- No gamification elements (e.g. 'Wisdom Lab', 'Quizzes', 'Ambassadors', 'Leaderboards' seen in GDA-MP's experimental routes).
- No AI document bots or chat wrappers.
- No electronic/online voting.

---

## 14. Private Access Uncertainties & Independent Engineering Decisions
- Internal database schema and backend implementation details of GDA-MP are private; MP-GEA will be engineered from scratch using a normalized, robust relational model.
- Payment gateway integration details are abstracted: MP-GEA will implement standard, secure Razorpay Server Orders + Webhook HMAC validation.
- Internal admin workflow states are formalized into a controlled state machine: `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `CORRECTION_REQUIRED`, `APPROVED_AWAITING_PAYMENT`, `ACTIVE`, `REJECTED`, `EXPIRED`, `SUSPENDED`, `RETIRED`.
