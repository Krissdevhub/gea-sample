// ============================================================
// DEMO MODE — Hardcoded credentials for flow testing (no DB)
// Remove / comment out when real database is connected.
// ============================================================

export const DEMO_USERS = [
  {
    id: 'demo-admin-001',
    email: 'admin@mpgea.org',
    mobile: '9000000001',
    password: 'Admin@mpgea2026',          // plaintext check (demo only)
    roles: ['SUPER_ADMIN'],
    districtScope: null,
    memberId: null,
    memberName: null,
    membershipNumber: null,
    membershipStatus: null,
    redirectUrl: '/admin',
  },
  {
    id: 'demo-member-001',
    email: 'member@mpgea.org',
    mobile: '9000000002',
    password: 'Member@mpgea2026',         // plaintext check (demo only)
    roles: ['MEMBER'],
    districtScope: null,
    memberId: 'demo-member-001',
    memberName: 'Rajesh Kumar Sharma',
    membershipNumber: 'MPGEA-2024-00001',
    membershipStatus: 'ACTIVE',
    redirectUrl: '/portal/dashboard',
  },
];

/** Returns demo user if identifier + password match, otherwise null */
export function checkDemoLogin(identifier: string, password: string) {
  return (
    DEMO_USERS.find(
      (u) =>
        (u.email === identifier || u.mobile === identifier) &&
        u.password === password
    ) || null
  );
}

/** Returns session-safe version of demo user (no password) */
export function getDemoSession(userId: string) {
  const u = DEMO_USERS.find((u) => u.id === userId);
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    mobile: u.mobile,
    roles: u.roles,
    districtScope: u.districtScope,
    memberId: u.memberId,
    memberName: u.memberName,
    membershipNumber: u.membershipNumber,
    membershipStatus: u.membershipStatus,
  };
}

/** Mock member object for demo MEMBER user (used in portal pages) */
export const DEMO_MEMBER_DATA = {
  id: 'demo-member-001',
  fullName: 'Rajesh Kumar Sharma',
  membershipNumber: 'MPGEA-2024-00001',
  status: 'ACTIVE',
  designation: 'Executive Engineer',
  employeeId: 'EMP-MP-2018-0042',
  qualification: 'B.E. (Civil)',
  dateOfJoining: '01-03-2018',
  department: { name: 'Public Works Department (PWD)' },
  branch: { name: 'Civil Engineering' },
  district: { name: 'Bhopal' },
  applications: [] as { id: string; correctionRequested?: string | null }[],
  payments: [] as { id: string }[],
  grievances: [] as { id: string; referenceNumber: string; status: string; subject: string }[],
};

/** Mock stats for admin demo (used in admin overview page) */
export const DEMO_ADMIN_STATS = {
  totalMembers: 124,
  activeMembers: 98,
  pendingApplications: 12,
  correctionRequired: 4,
  openGrievances: 7,
  totalDocuments: 35,
  recentApplications: [
    {
      id: 'demo-app-1',
      fullName: 'Suresh Nagar',
      designation: 'Assistant Engineer',
      department: { name: 'Irrigation Department' },
      district: { name: 'Indore' },
    },
    {
      id: 'demo-app-2',
      fullName: 'Priya Verma',
      designation: 'Sub-Engineer',
      department: { name: 'Public Works Department (PWD)' },
      district: { name: 'Jabalpur' },
    },
  ],
  recentPayments: [
    {
      id: 'demo-pay-1',
      member: { fullName: 'Anita Mishra' },
      purpose: 'ANNUAL_SUBSCRIPTION',
      amount: 1000,
      createdAt: new Date('2024-08-15'),
    },
    {
      id: 'demo-pay-2',
      member: { fullName: 'Deepak Tiwari' },
      purpose: 'ANNUAL_SUBSCRIPTION',
      amount: 1000,
      createdAt: new Date('2024-08-20'),
    },
  ],
};
