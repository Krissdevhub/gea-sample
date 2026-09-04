import { NextResponse } from 'next/server';
import fs from 'fs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { getPrivateFilePath } from '@/lib/storage';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const docId = url.searchParams.get('id');

    if (!docId) {
      return new NextResponse('Missing document ID.', { status: 400 });
    }

    const doc = await db.document.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return new NextResponse('Document not found.', { status: 404 });
    }

    // Access control evaluation
    if (doc.visibility === 'MEMBERS_ONLY') {
      const session = await getSession();
      if (!session) {
        return new NextResponse('Unauthorized: Membership login required to view this circular.', { status: 401 });
      }
    } else if (doc.visibility === 'ADMIN_ONLY') {
      const session = await getSession();
      if (!session || !session.roles.some((r) => r.includes('ADMIN'))) {
        return new NextResponse('Forbidden: Administrative authorization required.', { status: 403 });
      }
    }

    // For demonstration and seeded files: if file on disk doesn't exist, provide sample official PDF banner
    const filePath = getPrivateFilePath(doc.filePath);
    if (!fs.existsSync(filePath)) {
      // Return a clean PDF placeholder response
      const sampleText = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000052 00000 n\n0000000108 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n185\n%%EOF`;
      return new NextResponse(sampleText, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${encodeURIComponent(doc.title)}.pdf"`,
        },
      });
    }

    const fileBuffer = await fs.promises.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': doc.mimeType,
        'Content-Disposition': `inline; filename="${encodeURIComponent(doc.title)}"`,
      },
    });
  } catch (err: any) {
    console.error('Document stream error:', err);
    return new NextResponse('Error streaming document.', { status: 500 });
  }
}
