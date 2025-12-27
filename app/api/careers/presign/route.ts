import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, contentType } = body as { filename?: string; contentType?: string };
    if (!filename || !contentType) {
      return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
    }

    const region = process.env.AWS_REGION;
    const bucket = process.env.S3_BUCKET;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !bucket || !accessKeyId || !secretAccessKey) {
      return NextResponse.json({ error: 'S3 not configured' }, { status: 500 });
    }

    const client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `careers/${Date.now()}-${safeName}`;

    const putCommand = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const putUrl = await getSignedUrl(client, putCommand, { expiresIn: 60 * 15 }); // 15 min

    // Provide a signed GET URL (e.g., valid 7 days) so backend/emails can link to file
    const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
    const fileUrl = await getSignedUrl(client, getCommand, { expiresIn: 60 * 60 * 24 * 7 });

    return NextResponse.json({ url: putUrl, key, fileUrl });
  } catch (err) {
    console.error('Presign error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
