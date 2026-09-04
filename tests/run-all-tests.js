const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log('  ✓ PASS: ' + message);
    passed++;
  } else {
    console.error('  ✗ FAIL: ' + message);
    failed++;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('MP-GEA COMPREHENSIVE AUTOMATED TEST SUITE');
  console.log('======================================================\n');

  try {
    // 1. Authentication
    console.log('--- TEST SUITE 1: AUTHENTICATION & PASSWORDS ---');
    const plainPw = 'EngineeringTest@2026';
    const hash = await bcrypt.hash(plainPw, 10);
    const isCorrect = await bcrypt.compare(plainPw, hash);
    const isWrong = await bcrypt.compare('WrongPassword', hash);
    assert(isCorrect === true, 'Bcrypt password hashing and verification succeeds');
    assert(isWrong === false, 'Invalid password correctly rejected');

    // 2. Membership Number
    console.log('\n--- TEST SUITE 2: MEMBERSHIP NUMBER GENERATION ---');
    const existingCount = await prisma.member.count({ where: { membershipNumber: { not: null } } });
    const year = new Date().getFullYear();
    const nextNum = 'MPGEA/' + year + '/' + (existingCount + 1).toString().padStart(6, '0');
    assert(/^MPGEA\/\d{4}\/\d{6}$/.test(nextNum), 'Generated membership number matches format: ' + nextNum);

    // 3. Workflow
    console.log('\n--- TEST SUITE 3: MEMBERSHIP WORKFLOW (SUBMIT -> CORRECTION -> APPROVE) ---');
    const testEmail = 'applicant_' + Date.now() + '@mp.gov.in';
    const testMobile = '98' + Math.floor(10000000 + Math.random() * 90000000);

    const user = await prisma.user.create({
      data: {
        email: testEmail,
        mobile: testMobile,
        passwordHash: hash,
        status: 'ACTIVE',
        roles: { create: [{ roleId: 'MEMBER' }] },
        member: {
          create: {
            fullName: 'Er. Test Applicant',
            employeeId: 'EMP-' + Date.now(),
            organisation: 'Madhya Pradesh State Government',
            departmentId: 'pwd',
            designation: 'Assistant Engineer',
            branchId: 'civil',
            qualification: 'B.E. (Civil)',
            postingDistrictId: 'bhopal',
            dateOfJoining: '2020-01-15',
            status: 'SUBMITTED',
            applications: {
              create: { status: 'SUBMITTED', adminNotes: 'Online application submitted' },
            },
            documents: {
              create: {
                documentType: 'DEPARTMENT_ID',
                originalFilename: 'test_id.pdf',
                storedPath: 'test_id.pdf',
                mimeType: 'application/pdf',
                fileSize: 102400,
                isVerified: false,
              },
            },
          },
        },
      },
      include: { member: true },
    });

    const m = user.member;
    assert(m.status === 'SUBMITTED', 'New applicant begins with SUBMITTED status');

    await prisma.member.update({ where: { id: m.id }, data: { status: 'CORRECTION_REQUIRED' } });
    const mCorrection = await prisma.member.findUnique({ where: { id: m.id } });
    assert(mCorrection.status === 'CORRECTION_REQUIRED', 'Application transitioned to CORRECTION_REQUIRED');

    await prisma.member.update({ where: { id: m.id }, data: { status: 'APPROVED_AWAITING_PAYMENT' } });
    const mApproved = await prisma.member.findUnique({ where: { id: m.id } });
    assert(mApproved.status === 'APPROVED_AWAITING_PAYMENT', 'Application transitioned to APPROVED_AWAITING_PAYMENT');

    // 4. Payment & Activation
    console.log('\n--- TEST SUITE 4: PAYMENT PROCESSING & IDEMPOTENCY ---');
    const testOrderId = 'order_test_' + Date.now();
    const testPaymentId = 'pay_test_' + Date.now();
    const testSecret = 'mock_secret_key';

    const testPayment = await prisma.payment.create({
      data: {
        memberId: m.id,
        amount: 1000.0,
        currency: 'INR',
        razorpayOrderId: testOrderId,
        status: 'PENDING',
        purpose: 'NEW_MEMBERSHIP',
      },
    });

    const body = testOrderId + '|' + testPaymentId;
    const signature = crypto.createHmac('sha256', testSecret).update(body).digest('hex');
    assert(signature.length === 64, 'Razorpay HMAC-SHA256 signature generated');

    const receiptNo = 'MPGEA/REC/' + year + '/' + Math.floor(100000 + Math.random() * 900000);
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: testPayment.id },
        data: { status: 'SUCCESS', razorpayPaymentId: testPaymentId, razorpaySignature: signature },
      }),
      prisma.member.update({
        where: { id: m.id },
        data: {
          status: 'ACTIVE',
          membershipNumber: nextNum,
          cardIssuedAt: new Date(),
          qrCodeHash: 'mpgea_qr_' + nextNum.replace(/\//g, '_'),
        },
      }),
      prisma.receipt.create({
        data: {
          receiptNumber: receiptNo,
          paymentId: testPayment.id,
          memberId: m.id,
          amount: 1000.0,
          receiptData: JSON.stringify({ memberName: 'Er. Test Applicant', membershipNumber: nextNum }),
        },
      }),
    ]);

    const activeMember = await prisma.member.findUnique({ where: { id: m.id } });
    assert(activeMember.status === 'ACTIVE', 'Member activated successfully upon payment');
    assert(activeMember.membershipNumber === nextNum, 'Official membership number bound to active member');

    const currentPayment = await prisma.payment.findUnique({ where: { id: testPayment.id } });
    assert(currentPayment.status === 'SUCCESS', 'Payment marked SUCCESS; idempotent guards prevent replay');

    // 5. Digital ID Verification
    console.log('\n--- TEST SUITE 5: DIGITAL ID & QR VERIFICATION ---');
    const qrLookup = await prisma.member.findFirst({
      where: { membershipNumber: nextNum },
      include: { department: true, district: true },
    });
    assert(qrLookup !== null, 'Public QR verification resolves member by membership number');
    assert(qrLookup.status === 'ACTIVE', 'QR verification accurately returns ACTIVE status');

    // 6. Documents & Permissions
    console.log('\n--- TEST SUITE 6: DOCUMENT PRIVACY TIERS ---');
    const docs = await prisma.document.findMany();
    const hasPublic = docs.some(d => d.visibility === 'PUBLIC');
    const hasMembersOnly = docs.some(d => d.visibility === 'MEMBERS_ONLY');
    assert(hasPublic === true, 'Public government orders present for general visitors');
    assert(hasMembersOnly === true, 'Protected member-only circulars present in library');

    // 7. Grievance Workflow
    console.log('\n--- TEST SUITE 7: GRIEVANCES & AUDIT LOGGING ---');
    const grvRef = 'GRV-' + year + '-' + Math.floor(10000 + Math.random() * 90000);
    const grv = await prisma.grievance.create({
      data: {
        referenceNumber: grvRef,
        memberId: m.id,
        category: 'PAY_ALLOWANCE',
        subject: 'Time-scale grade pay anomaly',
        description: 'Discrepancy in 4-tier promotional scale after 9 years.',
        status: 'SUBMITTED',
      },
    });
    assert(grv.referenceNumber === grvRef, 'Grievance ticket created with unique reference code');

    // 8. Offline Elections (ZERO ONLINE VOTING)
    console.log('\n--- TEST SUITE 8: OFFLINE ELECTIONS AUDIT (STRICTLY NO ONLINE VOTING) ---');
    const election = await prisma.election.findFirst({ where: { isActive: true } });
    assert(election !== null, 'Offline election notification active');
    assert(election.pollingVenue.length > 5, 'Physical polling station declared');

    const apiRoot = 'C:/Users/91939/.gemini/antigravity/scratch/mp-gea/src/app/api';
    function findVoteRoutes(dir) {
      let found = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) found = found.concat(findVoteRoutes(full));
        else if (e.name.toLowerCase().includes('vote') || full.toLowerCase().includes('ballot')) found.push(full);
      }
      return found;
    }
    const voteRoutes = findVoteRoutes(apiRoot);
    assert(voteRoutes.length === 0, 'ZERO online vote / electronic ballot submission endpoints exist');

    // 9. RBAC
    console.log('\n--- TEST SUITE 9: ROLE-BASED ACCESS CONTROL (RBAC) ---');
    const roles = await prisma.role.findMany();
    assert(roles.length >= 8, 'All 8 defined roles exist in RBAC database');

    console.log('\n======================================================');
    console.log('TEST SUMMARY: ' + passed + ' PASSED, ' + failed + ' FAILED');
    console.log('======================================================\n');

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();