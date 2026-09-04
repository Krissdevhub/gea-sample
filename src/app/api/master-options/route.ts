import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const [departments, branches, districts] = await Promise.all([
    db.department.findMany({ where: { isActive: true }, select: { id: true, name: true } }),
    db.engineeringBranch.findMany({ where: { isActive: true }, select: { id: true, name: true } }),
    db.district.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: 'asc' } }),
  ]);

  return NextResponse.json({ departments, branches, districts });
}
