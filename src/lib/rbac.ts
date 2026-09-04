import { SessionUser } from './auth';

export type RoleName =
  | 'SUPER_ADMIN'
  | 'MEMBERSHIP_ADMIN'
  | 'FINANCE_ADMIN'
  | 'CONTENT_ADMIN'
  | 'GRIEVANCE_ADMIN'
  | 'ELECTION_ADMIN'
  | 'DISTRICT_ADMIN'
  | 'MEMBER';

export const PERMISSIONS = {
  MANAGE_SETTINGS: ['SUPER_ADMIN'],
  MANAGE_ROLES: ['SUPER_ADMIN'],
  VIEW_AUDIT_LOGS: ['SUPER_ADMIN'],
  VERIFY_APPLICATIONS: ['SUPER_ADMIN', 'MEMBERSHIP_ADMIN', 'DISTRICT_ADMIN'],
  APPROVE_REJECT_MEMBER: ['SUPER_ADMIN', 'MEMBERSHIP_ADMIN'],
  MANAGE_PAYMENTS: ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  MANAGE_DOCUMENTS: ['SUPER_ADMIN', 'CONTENT_ADMIN'],
  MANAGE_NEWS_EVENTS: ['SUPER_ADMIN', 'CONTENT_ADMIN'],
  MANAGE_GRIEVANCES: ['SUPER_ADMIN', 'GRIEVANCE_ADMIN', 'DISTRICT_ADMIN'],
  MANAGE_ELECTIONS: ['SUPER_ADMIN', 'ELECTION_ADMIN'],
  EXPORT_REPORTS: ['SUPER_ADMIN', 'MEMBERSHIP_ADMIN', 'FINANCE_ADMIN', 'GRIEVANCE_ADMIN', 'ELECTION_ADMIN', 'DISTRICT_ADMIN'],
  ACCESS_MEMBER_PORTAL: ['MEMBER', 'SUPER_ADMIN', 'MEMBERSHIP_ADMIN', 'FINANCE_ADMIN', 'CONTENT_ADMIN', 'GRIEVANCE_ADMIN', 'ELECTION_ADMIN'],
  ACCESS_ADMIN_PORTAL: ['SUPER_ADMIN', 'MEMBERSHIP_ADMIN', 'FINANCE_ADMIN', 'CONTENT_ADMIN', 'GRIEVANCE_ADMIN', 'ELECTION_ADMIN', 'DISTRICT_ADMIN'],
};

export function hasPermission(user: SessionUser | null, permission: keyof typeof PERMISSIONS): boolean {
  if (!user) return false;
  if (user.roles.includes('SUPER_ADMIN')) return true;
  const allowedRoles = PERMISSIONS[permission];
  return user.roles.some((r) => allowedRoles.includes(r));
}

export function hasAnyRole(user: SessionUser | null, roles: RoleName[]): boolean {
  if (!user) return false;
  if (user.roles.includes('SUPER_ADMIN')) return true;
  return user.roles.some((r) => roles.includes(r as RoleName));
}

export function isAuthorizedForDistrict(user: SessionUser | null, districtId: string): boolean {
  if (!user) return false;
  if (user.roles.includes('SUPER_ADMIN') || user.roles.includes('MEMBERSHIP_ADMIN') || user.roles.includes('GRIEVANCE_ADMIN')) {
    return true; // Statewide authorities
  }
  if (user.roles.includes('DISTRICT_ADMIN')) {
    return user.districtScope === districtId;
  }
  return false;
}
