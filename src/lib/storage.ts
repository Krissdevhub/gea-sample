import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_BASE_DIR = process.env.UPLOAD_STORAGE_PATH || path.join(process.cwd(), 'storage');
const PRIVATE_DIR = path.join(UPLOAD_BASE_DIR, 'private');
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(PRIVATE_DIR)) {
  fs.mkdirSync(PRIVATE_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export interface StoredFileResult {
  storedFilename: string;
  absolutePath: string;
  relativePath: string;
  mimeType: string;
  size: number;
}

export async function savePrivateFile(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<StoredFileResult> {
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error('Invalid file format. Only PDF, JPG, PNG, and WebP are accepted.');
  }

  if (fileBuffer.length > MAX_FILE_SIZE) {
    throw new Error('File exceeds maximum permitted size of 5 MB.');
  }

  const ext = path.extname(originalFilename).toLowerCase() || '.bin';
  const randomName = `${Date.now()}_${crypto.randomBytes(16).toString('hex')}${ext}`;
  const targetPath = path.join(PRIVATE_DIR, randomName);

  await fs.promises.writeFile(targetPath, fileBuffer);

  return {
    storedFilename: randomName,
    absolutePath: targetPath,
    relativePath: `/storage/private/${randomName}`,
    mimeType,
    size: fileBuffer.length,
  };
}

export function getPrivateFilePath(storedFilename: string): string {
  // Prevent path traversal
  const safeFilename = path.basename(storedFilename);
  return path.join(PRIVATE_DIR, safeFilename);
}
