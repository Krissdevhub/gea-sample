import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { hasPermission } from '@/lib/rbac';

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session || !hasPermission(session, 'EXPORT_REPORTS')) {
      return new NextResponse('Unauthorized.', { status: 403 });
    }

    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'members';

    if (type === 'members') {
      const members = await db.member.findMany({
        include: { user: true, department: true, branch: true, district: true },
      });

      let csv = 'Membership Number,Full Name,Employee ID,Department,Designation,Branch,District,Mobile,Email,Status,Date of Joining\n';
      for (const m of members) {
        csv += `"${m.membershipNumber || 'N/A'}","${m.fullName}","${m.employeeId}","${m.department.name}","${m.designation}","${m.branch.name}","${m.district.name}","${m.user.mobile}","${m.user.email}","${m.status}","${m.dateOfJoining}"\n`;
      }

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="MPGEA_Members_Export.csv"',
        },
      });
    }

    if (type === 'payments') {
      const payments = await db.payment.findMany({
        include: { member: true },
      });

      let csv = 'Payment ID,Member Name,Amount,Currency,Status,Purpose,Date\n';
      for (const p of payments) {
        csv += `"${p.id}","${p.member.fullName}","${p.amount}","${p.currency}","${p.status}","${p.purpose}","${p.createdAt.toISOString()}"\n`;
      }

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="MPGEA_Payments_Export.csv"',
        },
      });
    }

    return new NextResponse('Invalid export type.', { status: 400 });
  } catch (err: any) {
    console.error('Export error:', err);
    return new NextResponse('Failed to export data.', { status: 500 });
  }
}
