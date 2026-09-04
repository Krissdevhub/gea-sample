# MP-GEA Deployment & Hosting Guide

## 1. Target Environment
Compatible with managed Node.js hosting environments such as **Hostinger Web Apps**, cPanel Node.js Selector, DigitalOcean App Platform, AWS Lightsail, or any standard Linux VPS with MySQL 8.0+.

## 2. Environment Variables Specification (`.env.example`)
```bash
# Node Environment
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://mpgea.org

# Database Connection (MySQL)
DATABASE_URL="mysql://mpgea_user:SecurePassword@localhost:3306/mpgea_db"

# Session Security
SESSION_SECRET="generate_at_least_32_character_random_hex_string"

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Transactional Email (SMTP)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="noreply@mpgea.org"
SMTP_PASS="your_smtp_password"
SMTP_FROM="MP-GEA Official <noreply@mpgea.org>"

# File Storage
UPLOAD_STORAGE_PATH="./storage"
MAX_UPLOAD_SIZE_MB=5
```

## 3. Build & Deployment Steps
1. **Repository Setup**: Clone repository to server root.
2. **Install Dependencies**: `npm ci --omit=dev`
3. **Database Migration**: `npx prisma migrate deploy`
4. **Seed Master Data**: `npm run db:seed` (Populates districts, engineering departments, branches, and initial super admin).
5. **Compile Production Bundle**: `npm run build`
6. **Process Management**: Run via PM2 or systemd:
   ```bash
   pm2 start npm --name "mpgea-portal" -- start
   pm2 save
   pm2 startup
   ```
7. **Nginx Reverse Proxy & SSL Configuration**:
   - Proxy pass `http://127.0.0.1:3000`
   - Let's Encrypt SSL (`certbot --nginx -d mpgea.org`)
   - Max body size: `client_max_body_size 10M;`
