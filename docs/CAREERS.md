Careers upload (Presigned S3)

Required Vercel environment variables (Production scope):

- AWS_REGION (e.g. us-east-1)
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET (the bucket name)
- CAREERS_EMAIL (optional) — where to send application notifications. Falls back to SUPPORT_EMAIL or swati.das1506@gmail.com

Optional (for emails):
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- SMTP_FROM

How it works:
- Client requests a presigned PUT URL from `/api/careers/presign` with a filename + contentType.
- Client uploads directly to S3 using the returned signed PUT URL (no file passes through the server).
- Client POSTs metadata to `/api/careers` (name, email, phone, position, message, fileKey, fileUrl), and the server sends an email notification.

Notes:
- The presigned GET URL (fileUrl) is generated and expires after 7 days.
- Max client-side file size is 10MB (client checks). For larger files increase limits and consider multipart uploads.
- Ensure the IAM credentials used by `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` have `s3:PutObject` and `s3:GetObject` permission for the `S3_BUCKET`.
