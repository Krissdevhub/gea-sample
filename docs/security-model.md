# MP-GEA Security Architecture & Threat Model

## 1. Security Philosophy: Defense in Depth
MP-GEA handles sensitive state government employee records, departmental postings, and grievance tickets. Security is incorporated natively at every boundary:

```
[Edge / Network Layer: HTTPS, Rate Limiting, Security Headers, CSP]
  ↓
[Authentication Layer: HttpOnly Cookies, SameSite=Strict, Secure Salted Bcrypt]
  ↓
[Authorization Layer: Server-Side RBAC Enforcement, IDOR Shields]
  ↓
[Data & Application Layer: Strict Zod Validation, Parameterized SQL, Safe File Streamer]
  ↓
[Database & File System: Least Privilege User, Unreachable Private Document Root]
```

## 2. Authentication & Session Management
- **Password Security**: Bcrypt with a salt factor of 12.
- **Session Tokens**: Tamper-proof, cryptographically signed cookies with `HttpOnly`, `Secure` (in production), `SameSite=Lax/Strict`, and 24-hour expiration with sliding renewal.
- **Password Reset Flow**: High-entropy cryptographically generated random tokens (`crypto.randomBytes(32).toString('hex')`) hashed and stored with 15-minute expiration time. Reset links sent exclusively to verified user emails.

## 3. Server-Side Role-Based Access Control (RBAC)
No authorization checks are entrusted to the client UI. Every server action and API route independently verifies:
1. Valid authenticated session.
2. Active user status (suspended/banned accounts immediately revoked).
3. Explicit role capability matching the requested resource.
4. District scoping check: For `DISTRICT_ADMIN`, record posting district must match assigned jurisdiction.

## 4. Protection Against OWASP Top 10
- **SQL Injection**: Prevented 100% via Prisma ORM parameterized queries and strongly typed schemas. Raw concatenated SQL strings are strictly forbidden.
- **Broken Object Level Authorization (BOLA / IDOR)**: Members can query only their own profile, payment history, and grievances (`WHERE member_id = session.member.id`). Admin views enforce explicit role checking.
- **Cross-Site Scripting (XSS)**: Next.js automatic JSX escaping for all dynamic data. Markdown content sanitized via DOMPurify before display.
- **Cross-Site Request Forgery (CSRF)**: Next.js Server Actions validate strict origin and same-site headers by default. API routes validate custom headers.
- **Mass Assignment Vulnerability**: All form inputs and JSON payloads validated against rigid, strict Zod schemas with `.strict()` or explicit pick filters.

## 5. Secure File Handling Architecture
- **Segregation of Storage**:
  - **Public Files** (`/public/images/...`): Generic logos, banners, public event flyers.
  - **Private Files** (`/storage/private/...`): Member ID proofs, service appointment letters, grievance documents, member-only circulars.
- **Upload Restrictions**:
  - File extensions strictly checked: `.pdf`, `.jpg`, `.jpeg`, `.png`.
  - Server-side MIME verification: `application/pdf`, `image/jpeg`, `image/png`.
  - Maximum upload size capped at 5 MB per document.
  - Server-side randomized UUID renaming: Never store or serve files using original user-supplied filenames.
  - Private files served exclusively through authenticated streaming endpoints (`/api/documents/download?id=...`) that verify user authorization before reading the file from disk.

## 6. Payment Security (Razorpay)
- All Razorpay API secrets remain server-side in environment variables (`RAZORPAY_KEY_SECRET`).
- Payment confirmation requires server-side HMAC-SHA256 signature verification matching `order_id|payment_id`.
- Webhook endpoints verify signature header (`X-Razorpay-Signature`) using `RAZORPAY_WEBHOOK_SECRET`.
- Idempotency guards prevent duplicate membership activation or double receipt creation.

## 7. Audit Logging & Sensitive Data Redaction
- All security-sensitive transitions (`APPROVE_MEMBER`, `CORRECTION_REQUESTED`, `REJECT_MEMBER`, `UPDATE_ROLE`, `PUBLISH_ELECTION`) create immutable entries in `audit_logs`.
- Sanitizer middleware strips passwords, tokens, full PAN/Aadhaar (if ever mentioned in text), and card numbers before logging.
