# Complete Guide: Running MP-GEA on Another System & Deploying Live to Production

This comprehensive tutorial provides complete, step-by-step instructions for:
1. **Running this application on any other system** (Windows, macOS, or Linux) with zero dependencies.
2. **Deploying the application live to a production server** with a custom domain, SSL certificate, MySQL 8.0+ database, Nginx reverse proxy, PM2 process management, enterprise SMTP email configuration, and live Razorpay payment gateway integration.

---

# Table of Contents
1. [Part 1: Running the App on Another Local Computer](#part-1-running-the-app-on-another-local-computer)
   - [1.1 Prerequisites](#11-prerequisites)
   - [1.2 Moving the Codebase](#12-moving-the-codebase)
   - [1.3 Installing Dependencies](#13-installing-dependencies)
   - [1.4 Setting Up Environment Variables](#14-setting-up-environment-variables)
   - [1.5 Initializing the Database & Master Data](#15-initializing-the-database--master-data)
   - [1.6 Verifying with Automated Tests](#16-verifying-with-automated-tests)
   - [1.7 Starting the Application](#17-starting-the-application)
2. [Part 2: Deploying to a Live Production Server](#part-2-deploying-to-a-live-production-server)
   - [2.1 Architecture Overview](#21-architecture-overview)
   - [2.2 Server Provisioning & Initial Hardening](#22-server-provisioning--initial-hardening)
   - [2.3 Domain & DNS Configuration](#23-domain--dns-configuration)
   - [2.4 Installing Node.js, PM2 & Git](#24-installing-nodejs-pm2--git)
   - [2.5 MySQL 8.0+ Database Configuration](#25-mysql-80-database-configuration)
   - [2.6 Deploying Application Code & Prisma Push](#26-deploying-application-code--prisma-push)
   - [2.7 Nginx Reverse Proxy & Let's Encrypt SSL](#27-nginx-reverse-proxy--lets-encrypt-ssl)
   - [2.8 Business Email & SMTP Setup (SPF, DKIM, DMARC)](#28-business-email--smtp-setup-spf-dkim-dmarc)
   - [2.9 Razorpay Live Payment Gateway Setup](#29-razorpay-live-payment-gateway-setup)
   - [2.10 Process Management with PM2 & Auto-Restart](#210-process-management-with-pm2--auto-restart)
   - [2.11 Automated Nightly Backup Script](#211-automated-nightly-backup-script)
3. [Part 3: Alternative Managed Hosting (Hostinger / cPanel)](#part-3-alternative-managed-hosting-hostinger--cpanel)
4. [Part 4: Post-Launch Go-Live Verification Checklist](#part-4-post-launch-go-live-verification-checklist)

---

# Part 1: Running the App on Another Local Computer

Whether you are moving to another developer's laptop, a work desktop, or a demonstration computer, follow these instructions.

### 1.1 Prerequisites
Ensure the target computer has:
- **Node.js**: Version `18.18.0` or higher (Recommended: Node.js 20 LTS or Node.js 22 LTS).  
  *Verify via terminal:* `node -v`
- **npm**: Version `9.0.0` or higher (comes bundled with Node.js).  
  *Verify via terminal:* `npm -v`
- **Git**: (Optional, but recommended for pulling code).  
  *Verify via terminal:* `git --version`

> [!TIP]
> Download official Node.js installers from [nodejs.org](https://nodejs.org/).

---

### 1.2 Moving the Codebase
When copying the project folder (`mp-gea`) to a flash drive, ZIP archive, or transferring via Git:

#### What to EXCLUDE (Do NOT copy these large folders):
- `node_modules/` (Will be regenerated cleanly on the target machine)
- `.next/` (Build cache)
- `prisma/dev.db` and `prisma/dev.db-journal` (Can be regenerated fresh, or copied if you want existing test data)

#### Packaging into a clean ZIP (on Windows PowerShell):
```powershell
# From within the project directory:
git archive -o mp-gea-source.zip HEAD
```
Or simply copy the folder excluding `node_modules` and `.next`.

---

### 1.3 Installing Dependencies
Open a terminal (PowerShell on Windows, or Bash/Zsh on Mac/Linux) in the project directory:

```bash
cd mp-gea
npm install
```
This installs Next.js, React 19, Prisma, Tailwind CSS, bcryptjs, qrcode, lucide-react, and all required packages.

---

### 1.4 Setting Up Environment Variables
Create a file named `.env` in the root of `mp-gea`. You can copy `.env.example`:

```bash
# On Windows PowerShell:
Copy-Item .env.example .env

# On Linux / macOS:
cp .env.example .env
```

For **instant local zero-dependency development**, your `.env` file should look like this (using SQLite):
```env
# Database (Zero-dependency SQLite for local use)
DATABASE_URL="file:./dev.db"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication Session Secret (Change to any random 32+ character string)
JWT_SECRET="mpgea_super_secure_jwt_secret_dev_key_2026"

# Node Environment
NODE_ENV="development"

# Payment Gateway (Mock/Test mode for local dev)
RAZORPAY_KEY_ID="rzp_test_mock12345"
RAZORPAY_KEY_SECRET="mock_secret_key"

# Email Configuration (Mock for local dev)
SMTP_HOST="localhost"
SMTP_PORT=1025
SMTP_USER="test"
SMTP_PASS="test"
SMTP_FROM="MP-GEA Official <notifications@mpgea.org>"
```

---

### 1.5 Initializing the Database & Master Data
Run the following commands to create the SQLite database and seed all 55 MP districts, 10 departments, 12 branches, and initial administrator/member accounts:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Push Schema to SQLite
npx prisma db push

# 3. Seed Master Data
node prisma/seed.js
```

You will see confirmation in the console:
```text
Seeded 55 districts across Madhya Pradesh.
Seeded 10 government engineering departments.
Seeded 12 engineering branches.
Seeded 8 administrative roles.
Super Admin created: admin@mpgea.org
Verified Member created: rajesh.sharma@mp.gov.in
Seed completed successfully!
```

---

### 1.6 Verifying with Automated Tests
Run the built-in test runner to verify everything is functioning properly:
```bash
node tests/run-all-tests.js
```
Expected output: **`TEST SUMMARY: 19 PASSED, 0 FAILED`**.

---

### 1.7 Starting the Application

#### Option A: Development Mode (Hot-reloading)
```bash
npm run dev
```
Open your browser and navigate to: **`http://localhost:3000`**

#### Option B: Production Mode (Optimized & Fast)
```bash
npm run build
npm run start
```

#### Test Login Accounts:
| Role | Identifier (Email) | Password | Portal URL |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@mpgea.org` | `Admin@mpgea2026` | `http://localhost:3000/admin` |
| **Verified Member** | `rajesh.sharma@mp.gov.in` | `Member@mpgea2026` | `http://localhost:3000/portal/dashboard` |

---

# Part 2: Deploying to a Live Production Server

This section covers deploying MP-GEA onto an Ubuntu Linux VPS (e.g., DigitalOcean Droplet, AWS EC2, Hetzner Cloud, Hostinger VPS, or Linode) with a custom domain (e.g., `mpgea.org`).

---

### 2.1 Architecture Overview

```mermaid
flowchart TD
    User([Public Visitor / Member]) -->|HTTPS 443| Cloudflare[DNS & Cloudflare / CDN]
    Cloudflare -->|SSL| Nginx[Nginx Reverse Proxy]
    Nginx -->|Port 3000| NextApp[Next.js App Server / PM2]
    NextApp -->|Prisma Client| MySQL[(MySQL 8.0 Database)]
    NextApp -->|File System| UploadsDir[uploads/ Storage]
    NextApp -->|SMTP 465| SMTPServer[Titan / Google Workspace SMTP]
    NextApp -->|API REST| Razorpay[Razorpay Payment Gateway]
```

---

### 2.2 Server Provisioning & Initial Hardening

#### Recommended Server Specifications:
- **OS**: Ubuntu 22.04 LTS or Ubuntu 24.04 LTS
- **RAM**: Minimum 2 GB (4 GB recommended for comfortable build steps)
- **CPU**: 2 vCPU
- **Storage**: 40 GB+ NVMe SSD

#### Initial Server Setup via SSH:
Connect to your server:
```bash
ssh root@YOUR_SERVER_IP
```

Update system packages and enable firewall:
```bash
apt update && apt upgrade -y
apt install -y ufw curl wget git htop unzip fail2ban

# Configure UFW Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable
```

Create a non-root deployment user:
```bash
adduser deployer
usermod -aG sudo deployer

# Copy SSH keys to the new deployer user
rsync --archive --chown=deployer:deployer ~/.ssh /home/deployer
```
Now switch to `deployer`:
```bash
su - deployer
```

---

### 2.3 Domain & DNS Configuration

At your domain registrar (GoDaddy, Namecheap, Google Domains / Squarespace, Hostinger):

1. Navigate to **DNS Management / DNS Zone Editor**.
2. Add the following records:

| Record Type | Name (Host) | Target (Value) | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_SERVER_IP` | 300 / Auto | Points `mpgea.org` to server |
| **A** | `www` | `YOUR_SERVER_IP` | 300 / Auto | Points `www.mpgea.org` to server |
| **CAA** | `@` | `0 issue "letsencrypt.org"` | Auto | Authorizes Let's Encrypt SSL |

> [!NOTE]
> Allow 10–30 minutes for DNS propagation. Check with: `dig mpgea.org +short` or `nslookup mpgea.org`.

---

### 2.4 Installing Node.js, PM2 & Git

Install Node.js 20 LTS via official NodeSource repository:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v # Should report v20.x
npm -v  # Should report v10.x

# Install PM2 globally
sudo npm install -g pm2
```

---

### 2.5 MySQL 8.0+ Database Configuration

Install MySQL Server:
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Log into MySQL shell as root:
```bash
sudo mysql
```

Execute the following SQL commands to create the database and a dedicated secure user:
```sql
-- Create database with UTF-8 support
CREATE DATABASE mpgea_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user with strong password
CREATE USER 'mpgea_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ReplaceWithYourStrongPassword123!';

-- Grant privileges
GRANT ALL PRIVILEGES ON mpgea_db.* TO 'mpgea_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
EXIT;
```

Test database connectivity:
```bash
mysql -u mpgea_user -p'ReplaceWithYourStrongPassword123!' -e "STATUS;"
```

---

### 2.6 Deploying Application Code & Prisma Push

Clone or upload your repository to `/var/www/mpgea`:
```bash
sudo mkdir -p /var/www/mpgea
sudo chown -R deployer:deployer /var/www/mpgea

# Clone via Git (or upload files via SFTP/rsync)
git clone <YOUR_GIT_REPO_URL> /var/www/mpgea
cd /var/www/mpgea
```

Create the production `.env` file:
```bash
nano .env
```
Paste and fill in your actual production values:
```env
# Database Connection (MySQL)
DATABASE_URL="mysql://mpgea_user:ReplaceWithYourStrongPassword123!@localhost:3306/mpgea_db"

# Application URL
NEXT_PUBLIC_APP_URL="https://mpgea.org"

# Cryptographic Secret (Generate using: openssl rand -hex 32)
JWT_SECRET="paste_generated_64_char_hex_secret_here"

# Environment
NODE_ENV="production"
PORT=3000

# Razorpay Payment Gateway (Live credentials)
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_live_razorpay_secret_here"

# SMTP Transactional Email
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="notifications@mpgea.org"
SMTP_PASS="YourSecureEmailPassword"
SMTP_FROM="MP-GEA Official <notifications@mpgea.org>"

# Document Upload Storage
UPLOAD_DIR="/var/www/mpgea/uploads"
```

Create uploads directory with correct write permissions:
```bash
mkdir -p /var/www/mpgea/uploads
chmod 755 /var/www/mpgea/uploads
```

Install production packages, push database schema, and seed:
```bash
# Install dependencies
npm ci

# Push schema to MySQL using the MySQL schema file
npx prisma db push --schema=prisma/schema.mysql.prisma

# Seed master tables (Districts, Departments, Branches, Roles, Admin user)
node prisma/seed.js

# Build optimized production bundle
npm run build
```

---

### 2.7 Nginx Reverse Proxy & Let's Encrypt SSL

Install Nginx:
```bash
sudo apt install -y nginx
```

Create Nginx site configuration for MP-GEA:
```bash
sudo nano /etc/nginx/sites-available/mpgea.org
```

Paste the following configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mpgea.org www.mpgea.org;

    # Maximum file upload size for engineering ID PDFs & documents (15MB)
    client_max_body_size 15M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for document uploads and generation
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable site configuration and test Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mpgea.org /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Install Free SSL with Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mpgea.org -d www.mpgea.org
```
Follow the prompts, provide your administrative email, and choose Option 2 (Redirect HTTP to HTTPS automatically).

Certbot sets up automatic renewal. Test renewal:
```bash
sudo certbot renew --dry-run
```

---

### 2.8 Business Email & SMTP Setup (SPF, DKIM, DMARC)

To ensure transactional emails (application confirmation, verification status, payment receipts, password resets) do not land in spam folders, configure your domain's DNS authentication records:

#### Step 1: Obtain SMTP Details
From your mail provider (e.g., Hostinger Titan Email, Google Workspace, Zoho Mail, or AWS SES):
- **SMTP Server**: e.g., `smtp.hostinger.com` (or `smtp.gmail.com` with App Password)
- **Port**: `465` (SSL) or `587` (TLS)
- **Account**: `notifications@mpgea.org` (or `noreply@mpgea.org`)

#### Step 2: Add DNS Deliverability Records

1. **SPF Record (TXT Record):**
   - **Name:** `@`
   - **Value:** `v=spf1 include:_spf.mailhostbox.com ~all` *(replace with your email provider's SPF directive)*

2. **DKIM Record (TXT Record):**
   - In your mail hosting control panel, generate a 2048-bit DKIM key.
   - Add the TXT record (e.g., Name: `default._domainkey`, Value: `v=DKIM1; k=rsa; p=MIIBIjANBgkqh...`).

3. **DMARC Record (TXT Record):**
   - **Name:** `_dmarc`
   - **Value:** `v=DMARC1; p=quarantine; rua=mailto:admin@mpgea.org; pct=100; adkim=r; aspf=r`

---

### 2.9 Razorpay Live Payment Gateway Setup

1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Switch toggle from **Test Mode** to **Live Mode**.
3. Go to **Account & Settings &rarr; API Keys &rarr; Generate Key**.
4. Copy `Key Id` (starts with `rzp_live_...`) and `Key Secret`.
5. Update `/var/www/mpgea/.env` with these live keys.
6. (Optional Webhook): Under **Settings &rarr; Webhooks**, add:
   - **Webhook URL:** `https://mpgea.org/api/payments/verify`
   - **Secret:** Generate a random webhook secret
   - **Events:** `payment.captured`, `order.paid`

---

### 2.10 Process Management with PM2 & Auto-Restart

Ensure the application runs continuously in the background and restarts automatically if the server reboots or crashes:

```bash
cd /var/www/mpgea

# Start Next.js with PM2
pm2 start npm --name "mpgea-portal" -- start -- -p 3000

# Check status
pm2 status
pm2 logs mpgea-portal

# Configure PM2 to restart automatically on system reboot
pm2 save
pm2 startup
```
PM2 will output a command starting with `sudo env PATH=...`. Copy and paste that command into your terminal to finalize startup registration.

---

### 2.11 Automated Nightly Backup Script

Create an automated backup script that backs up both the MySQL database and the uploaded documents folder daily:

```bash
sudo mkdir -p /var/backups/mpgea
sudo nano /usr/local/bin/backup-mpgea.sh
```

Paste the backup script:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mpgea"
DATE=$(date +"%Y-%m-%d_%H%M%S")
DB_NAME="mpgea_db"
DB_USER="mpgea_user"
DB_PASS="ReplaceWithYourStrongPassword123!"

# 1. Dump MySQL database
mysqldump -u$DB_USER -p$DB_PASS $DB_NAME | gzip > "$BACKUP_DIR/db_${DB_NAME}_$DATE.sql.gz"

# 2. Archive uploaded documents
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C /var/www/mpgea uploads

# 3. Delete backups older than 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "[$(date)] Backup completed: $DATE" >> /var/log/mpgea-backup.log
```

Make it executable and add to crontab:
```bash
sudo chmod +x /usr/local/bin/backup-mpgea.sh

# Edit root crontab
sudo crontab -e
```
Add this line to run every night at 2:30 AM:
```cron
30 2 * * * /usr/local/bin/backup-mpgea.sh >/dev/null 2>&1
```

---

# Part 3: Alternative Managed Hosting (Hostinger / cPanel)

If you are using **Hostinger Web Apps** or cPanel Node.js Selector rather than a raw VPS:

1. **Create MySQL Database**:
   - In Hostinger hPanel &rarr; **Databases &rarr; Management &rarr; Create MySQL Database**.
   - Note Database Name, Username, and Password.
2. **Node.js Setup in hPanel**:
   - Go to **Websites &rarr; Node.js**.
   - Select Node.js version `20.x` or higher.
   - Application Root: `public_html` or `mpgea`.
   - Application Startup File: `node_modules/next/dist/bin/next` with argument `start` (or create a custom `server.js`).
3. **Environment Variables**:
   - Add `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `SMTP_*` via the Environment Variables tab in hPanel.
4. **Deploy & Build**:
   - Upload project files (via Git integration or File Manager).
   - In SSH or Terminal in hPanel:
     ```bash
     npm install --production=false
     npx prisma db push --schema=prisma/schema.mysql.prisma
     node prisma/seed.js
     npm run build
     ```
   - Restart the Node.js application from the panel.

---

# Part 4: Post-Launch Go-Live Verification Checklist

Run through these verification tests once live:

- [ ] **SSL Verification**: Visit `https://mpgea.org` and check for the padlock icon (A+ rating on SSL Labs).
- [ ] **Registration Flow (`/join`)**: Submit a test membership application with a sample PDF document. Verify that the file saves into `uploads/`.
- [ ] **Admin Verification Workbench (`/admin/verification`)**: Log in as `admin@mpgea.org` and inspect the newly submitted application and uploaded document.
- [ ] **Status Transition**: Approve the applicant or request a correction. Verify that the applicant's status updates in real-time.
- [ ] **Payment Flow**: Verify checkout opens correctly and generates official receipt upon successful transaction.
- [ ] **Digital ID Card**: Visit `/portal/id-card` and verify that the QR code points to `https://mpgea.org/verify/<membershipNumber>`.
- [ ] **Public Verification (`/verify/<id>`)**: Scan the QR code with a mobile camera and ensure the public verification badge loads without exposing private personal phone/address data.
- [ ] **Offline Election Audit**: Verify that `/elections` contains physical polling station addresses and certified notifications with zero online voting forms.
- [ ] **SMTP Email**: Verify that welcome and verification notification emails arrive in the applicant's inbox.
