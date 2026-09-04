import { db } from './db';

export async function generateMembershipNumber(): Promise<string> {
  const year = new Date().getFullYear();
  // Count total members assigned numbers
  const count = await db.member.count({
    where: {
      membershipNumber: {
        not: null,
      },
    },
  });
  const seq = (count + 1).toString().padStart(6, '0');
  return `MPGEA/${year}/${seq}`;
}

export async function generateGrievanceReference(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await db.grievance.count();
  const seq = (count + 1).toString().padStart(5, '0');
  return `GRV-${year}-${seq}`;
}

export async function generateReceiptNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await db.receipt.count();
  const seq = (count + 1).toString().padStart(4, '0');
  return `MPGEA/REC/${year}/${seq}`;
}
