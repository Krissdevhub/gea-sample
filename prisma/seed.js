const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MP-GEA master database...');

  // 1. Roles
  const roles = [
    { id: 'SUPER_ADMIN', name: 'Super Admin / President', description: 'Highest executive authority with complete state-level access.' },
    { id: 'MEMBERSHIP_ADMIN', name: 'Membership Administrator', description: 'Manages member applications, scrutinizes service credentials, requests corrections, approves/rejects.' },
    { id: 'FINANCE_ADMIN', name: 'Treasurer / Finance Admin', description: 'Manages financial records, membership payments, manual receipts, and balance sheet statements.' },
    { id: 'CONTENT_ADMIN', name: 'Content & Circulars Admin', description: 'Publishes government orders, departmental circulars, news updates, and event records.' },
    { id: 'GRIEVANCE_ADMIN', name: 'Grievance & Cadre Officer', description: 'Handles service grievances, assigns investigating officers, posts updates, and tracks representations.' },
    { id: 'ELECTION_ADMIN', name: 'Returning Officer / Election Admin', description: 'Publishes offline election notifications, candidate rosters, physical polling notices, and certified results.' },
    { id: 'DISTRICT_ADMIN', name: 'District Chapter Administrator', description: 'Jurisdiction restricted to assigned district records and members.' },
    { id: 'MEMBER', name: 'Government Engineer Member', description: 'Verified state government engineer with portal access, digital ID card, circulars, and grievance tools.' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description },
      create: r,
    });
  }
  console.log('Roles seeded.');

  // 2. Districts of Madhya Pradesh (all 55 districts across 10 administrative divisions)
  const districts = [
    { id: 'bhopal', name: 'Bhopal', division: 'Bhopal' },
    { id: 'indore', name: 'Indore', division: 'Indore' },
    { id: 'jabalpur', name: 'Jabalpur', division: 'Jabalpur' },
    { id: 'gwalior', name: 'Gwalior', division: 'Gwalior' },
    { id: 'ujjain', name: 'Ujjain', division: 'Ujjain' },
    { id: 'sagar', name: 'Sagar', division: 'Sagar' },
    { id: 'rewa', name: 'Rewa', division: 'Rewa' },
    { id: 'satna', name: 'Satna', division: 'Rewa' },
    { id: 'sehore', name: 'Sehore', division: 'Bhopal' },
    { id: 'raisen', name: 'Raisen', division: 'Bhopal' },
    { id: 'vidisha', name: 'Vidisha', division: 'Bhopal' },
    { id: 'rajgarh', name: 'Rajgarh', division: 'Bhopal' },
    { id: 'dhar', name: 'Dhar', division: 'Indore' },
    { id: 'khargone', name: 'Khargone (West Nimar)', division: 'Indore' },
    { id: 'khandwa', name: 'Khandwa (East Nimar)', division: 'Indore' },
    { id: 'barwani', name: 'Barwani', division: 'Indore' },
    { id: 'alirajpur', name: 'Alirajpur', division: 'Indore' },
    { id: 'jhabua', name: 'Jhabua', division: 'Indore' },
    { id: 'dewas', name: 'Dewas', division: 'Ujjain' },
    { id: 'shajapur', name: 'Shajapur', division: 'Ujjain' },
    { id: 'agar-malwa', name: 'Agar Malwa', division: 'Ujjain' },
    { id: 'ratlam', name: 'Ratlam', division: 'Ujjain' },
    { id: 'mandsaur', name: 'Mandsaur', division: 'Ujjain' },
    { id: 'neemuch', name: 'Neemuch', division: 'Ujjain' },
    { id: 'chhindwara', name: 'Chhindwara', division: 'Jabalpur' },
    { id: 'seoni', name: 'Seoni', division: 'Jabalpur' },
    { id: 'balaghat', name: 'Balaghat', division: 'Jabalpur' },
    { id: 'mandla', name: 'Mandla', division: 'Jabalpur' },
    { id: 'dindori', name: 'Dindori', division: 'Jabalpur' },
    { id: 'narsinghpur', name: 'Narsinghpur', division: 'Jabalpur' },
    { id: 'katni', name: 'Katni', division: 'Jabalpur' },
    { id: 'hoshangabad', name: 'Narmadapuram (Hoshangabad)', division: 'Narmadapuram' },
    { id: 'betul', name: 'Betul', division: 'Narmadapuram' },
    { id: 'harda', name: 'Harda', division: 'Narmadapuram' },
    { id: 'damoh', name: 'Damoh', division: 'Sagar' },
    { id: 'panna', name: 'Panna', division: 'Sagar' },
    { id: 'chhatarpur', name: 'Chhatarpur', division: 'Sagar' },
    { id: 'tikamgarh', name: 'Tikamgarh', division: 'Sagar' },
    { id: 'niwari', name: 'Niwari', division: 'Sagar' },
    { id: 'morena', name: 'Morena', division: 'Chambal' },
    { id: 'bhind', name: 'Bhind', division: 'Chambal' },
    { id: 'sheopur', name: 'Sheopur', division: 'Chambal' },
    { id: 'shivpuri', name: 'Shivpuri', division: 'Gwalior' },
    { id: 'guna', name: 'Guna', division: 'Gwalior' },
    { id: 'ashoknagar', name: 'Ashoknagar', division: 'Gwalior' },
    { id: 'datia', name: 'Datia', division: 'Gwalior' },
    { id: 'shahdol', name: 'Shahdol', division: 'Shahdol' },
    { id: 'umaria', name: 'Umaria', division: 'Shahdol' },
    { id: 'anuppur', name: 'Anuppur', division: 'Shahdol' },
    { id: 'sidhi', name: 'Sidhi', division: 'Rewa' },
    { id: 'singrauli', name: 'Singrauli', division: 'Rewa' },
    { id: 'mauganj', name: 'Mauganj', division: 'Rewa' },
    { id: 'maihar', name: 'Maihar', division: 'Rewa' },
    { id: 'pandhurna', name: 'Pandhurna', division: 'Jabalpur' },
  ];

  for (const d of districts) {
    await prisma.district.upsert({
      where: { id: d.id },
      update: { name: d.name, division: d.division },
      create: { ...d, isActive: true },
    });
  }
  console.log('55 MP Districts seeded.');

  // 3. Departments
  const departments = [
    { id: 'pwd', name: 'Public Works Department (PWD)', code: 'PWD' },
    { id: 'wrd', name: 'Water Resources Department (WRD)', code: 'WRD' },
    { id: 'phed', name: 'Public Health Engineering Department (PHED)', code: 'PHED' },
    { id: 'nvda', name: 'Narmada Valley Development Authority (NVDA)', code: 'NVDA' },
    { id: 'res', name: 'Rural Engineering Services (RES)', code: 'RES' },
    { id: 'uadd', name: 'Urban Administration & Development (UADD)', code: 'UADD' },
    { id: 'mppgcl', name: 'MP Power Generating Company (MPPGCL)', code: 'MPPGCL' },
    { id: 'mptransco', name: 'MP Power Transmission Company (MPTRANSCO)', code: 'MPTRANSCO' },
    { id: 'discom', name: 'MP Electricity Distribution Companies (Discoms)', code: 'DISCOM' },
    { id: 'mpphc', name: 'MP Police Housing Corporation (MPPHC)', code: 'MPPHC' },
    { id: 'mprdcl', name: 'MP Road Development Corporation (MPRDC)', code: 'MPRDC' },
    { id: 'local_bodies', name: 'Municipal Corporations & Local Bodies', code: 'ULB' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { id: dept.id },
      update: { name: dept.name, code: dept.code },
      create: { ...dept, isActive: true },
    });
  }
  console.log('Departments seeded.');

  // 4. Engineering Branches
  const branches = [
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'electrical', name: 'Electrical Engineering' },
    { id: 'mechanical', name: 'Mechanical Engineering' },
    { id: 'electronics', name: 'Electronics & Telecommunication' },
    { id: 'computer_it', name: 'Computer Science & Information Technology' },
    { id: 'environmental', name: 'Environmental Engineering' },
    { id: 'chemical', name: 'Chemical Engineering' },
    { id: 'mining', name: 'Mining Engineering' },
    { id: 'agricultural', name: 'Agricultural Engineering' },
    { id: 'instrumentation', name: 'Instrumentation Engineering' },
    { id: 'structural', name: 'Structural Engineering' },
    { id: 'other', name: 'Other Recognized Engineering Discipline' },
  ];

  for (const b of branches) {
    await prisma.engineeringBranch.upsert({
      where: { id: b.id },
      update: { name: b.name },
      create: { ...b, isActive: true },
    });
  }
  console.log('Engineering branches seeded.');

  // 5. Membership Types
  const membershipTypes = [
    { id: 'SERVING_ANNUAL', name: 'Serving Engineer (Annual)', feeAmount: 1000.0, validityYears: 1, description: 'Annual subscription for currently serving government engineers in MP state departments and local bodies.' },
    { id: 'LIFE_MEMBER', name: 'Life Membership', feeAmount: 5000.0, validityYears: 15, description: 'One-time life membership for serving government engineers.' },
    { id: 'RETIRED_MEMBER', name: 'Retired Engineer Member', feeAmount: 500.0, validityYears: 5, description: 'Affiliate membership for superannuated / retired state government engineers.' },
    { id: 'HONORARY', name: 'Honorary Member', feeAmount: 0.0, validityYears: 5, description: 'Conferred by the Executive Council for distinguished engineering contributions to the state.' },
  ];

  for (const mt of membershipTypes) {
    await prisma.membershipType.upsert({
      where: { id: mt.id },
      update: { name: mt.name, feeAmount: mt.feeAmount, validityYears: mt.validityYears, description: mt.description },
      create: mt,
    });
  }
  console.log('Membership types seeded.');

  // 6. Super Admin & Demo Accounts
  const hashedPassword = await bcrypt.hash('Admin@mpgea2026', 10);
  const memberPassword = await bcrypt.hash('Member@mpgea2026', 10);

  // Super Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mpgea.org' },
    update: {},
    create: {
      email: 'admin@mpgea.org',
      mobile: '9425000001',
      passwordHash: hashedPassword,
      status: 'ACTIVE',
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: 'SUPER_ADMIN' } },
    update: {},
    create: { userId: adminUser.id, roleId: 'SUPER_ADMIN' },
  });

  // Also assign all functional roles to admin for complete testing
  for (const r of ['MEMBERSHIP_ADMIN', 'FINANCE_ADMIN', 'CONTENT_ADMIN', 'GRIEVANCE_ADMIN', 'ELECTION_ADMIN']) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: r } },
      update: {},
      create: { userId: adminUser.id, roleId: r },
    });
  }

  // Active Demo Member (Er. Rajesh Sharma, Executive Engineer PWD)
  const memberUser = await prisma.user.upsert({
    where: { email: 'rajesh.sharma@mp.gov.in' },
    update: {},
    create: {
      email: 'rajesh.sharma@mp.gov.in',
      mobile: '9425000002',
      passwordHash: memberPassword,
      status: 'ACTIVE',
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: memberUser.id, roleId: 'MEMBER' } },
    update: {},
    create: { userId: memberUser.id, roleId: 'MEMBER' },
  });

  const memberProfile = await prisma.member.upsert({
    where: { userId: memberUser.id },
    update: {},
    create: {
      userId: memberUser.id,
      membershipNumber: 'MPGEA/2026/000001',
      fullName: 'Er. Rajesh Kumar Sharma',
      gender: 'Male',
      dob: '1982-05-14',
      employeeId: 'MP-PWD-19820514',
      organisation: 'Madhya Pradesh State Government',
      departmentId: 'pwd',
      designation: 'Executive Engineer',
      branchId: 'civil',
      qualification: 'B.E. (Civil), M.Tech (Structures)',
      postingDistrictId: 'bhopal',
      postingOffice: 'Office of the Chief Engineer, PWD Central Zone, Nirman Bhawan, Bhopal',
      dateOfJoining: '2008-07-15',
      status: 'ACTIVE',
      qrCodeHash: 'mpgea_qr_000001_hash',
      cardIssuedAt: new Date(),
    },
  });

  // Membership & Receipt for Demo Member
  await prisma.membership.create({
    data: {
      memberId: memberProfile.id,
      typeId: 'SERVING_ANNUAL',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
      status: 'ACTIVE',
      amountPaid: 1000.0,
    },
  });

  const demoPayment = await prisma.payment.create({
    data: {
      memberId: memberProfile.id,
      amount: 1000.0,
      currency: 'INR',
      razorpayOrderId: 'order_MPGEA_SEED_001',
      razorpayPaymentId: 'pay_MPGEA_SEED_001',
      razorpaySignature: 'sig_MPGEA_SEED_001',
      status: 'SUCCESS',
      purpose: 'NEW_MEMBERSHIP',
    },
  });

  await prisma.receipt.create({
    data: {
      receiptNumber: 'MPGEA/REC/2026/0001',
      paymentId: demoPayment.id,
      memberId: memberProfile.id,
      amount: 1000.0,
      receiptData: JSON.stringify({
        memberName: 'Er. Rajesh Kumar Sharma',
        membershipNumber: 'MPGEA/2026/000001',
        designation: 'Executive Engineer',
        department: 'Public Works Department (PWD)',
        district: 'Bhopal',
        transactionId: 'pay_MPGEA_SEED_001',
        feeType: 'Serving Engineer (Annual)',
        date: new Date().toISOString(),
      }),
    },
  });

  // Sample Documents (Government Orders & Circulars)
  const sampleDocs = [
    {
      title: 'Time-Scale Promotion Framework for Assistant Engineers in MP Engineering Services',
      orderNumber: 'F-16/04/2026/ENGG/19',
      issueDate: '2026-02-15',
      year: 2026,
      departmentId: 'pwd',
      category: 'PROMOTION_SENIORITY',
      filePath: '/samples/orders/time_scale_order_2026.pdf',
      fileSize: 452000,
      mimeType: 'application/pdf',
      visibility: 'PUBLIC',
    },
    {
      title: 'Implementation of Revised Technical Site Allowance for Field Engineers',
      orderNumber: 'FD/EXP/2026/089',
      issueDate: '2026-01-20',
      year: 2026,
      departmentId: 'wrd',
      category: 'PAY_ALLOWANCES',
      filePath: '/samples/orders/site_allowance_2026.pdf',
      fileSize: 312000,
      mimeType: 'application/pdf',
      visibility: 'MEMBERS_ONLY',
    },
    {
      title: 'Comprehensive Transfer Policy Guidelines for Engineering Cadres 2026-27',
      orderNumber: 'GAD/TRF/ENGG/2026/112',
      issueDate: '2026-03-01',
      year: 2026,
      departmentId: 'phed',
      category: 'TRANSFER_POLICY',
      filePath: '/samples/orders/transfer_policy_2026.pdf',
      fileSize: 580000,
      mimeType: 'application/pdf',
      visibility: 'PUBLIC',
    },
    {
      title: 'General Body Resolution No. 04: Restructuring of Departmental Cadres',
      orderNumber: 'MPGEA/RES/2026/04',
      issueDate: '2026-02-28',
      year: 2026,
      departmentId: 'pwd',
      category: 'ASSOCIATION_CIRCULAR',
      filePath: '/samples/circulars/cadre_restructuring_res.pdf',
      fileSize: 220000,
      mimeType: 'application/pdf',
      visibility: 'MEMBERS_ONLY',
    },
  ];

  for (const doc of sampleDocs) {
    await prisma.document.create({
      data: doc,
    });
  }
  console.log('Sample documents seeded.');

  // Sample Grievance for Er. Rajesh Sharma
  const grievance = await prisma.grievance.create({
    data: {
      referenceNumber: 'GRV-2026-00001',
      memberId: memberProfile.id,
      category: 'PAY_ALLOWANCE',
      subject: 'Disparity in Time Scale Pay Fixation under 6th & 7th Pay Commission',
      description: 'Discrepancy observed in grade pay fixation after completion of 9 years of continuous service as Assistant Engineer in PWD. Representation submitted to Finance cell awaiting clearance.',
      status: 'UNDER_REVIEW',
      assignedTo: adminUser.id,
    },
  });

  await prisma.grievanceUpdate.create({
    data: {
      grievanceId: grievance.id,
      updatedBy: adminUser.id,
      statusChange: 'UNDER_REVIEW',
      message: 'Grievance scrutinized by Cadre Advisory Committee. Reference memo being drafted for submission to Secretary, PWD.',
      isInternal: false,
    },
  });

  // Collective Representation
  await prisma.representation.create({
    data: {
      title: 'Memorandum on Unified Engineering Cadre & 4-Tier Promotion Scale in Madhya Pradesh',
      category: 'Cadre Restructuring',
      summary: 'Comprehensive memorandum submitted to Additional Chief Secretary, GAD demanding rationalization of engineering cadre seniority and automated time-bound promotions across PWD, WRD, PHED, and NVDA.',
      authorityAddressed: 'Additional Chief Secretary, General Administration Department (GAD), MP',
      currentStage: 'SUBMITTED_TO_GOVERNMENT',
      visibility: 'PUBLIC',
    },
  });

  // Offline Election Information (NO ONLINE VOTING)
  const election = await prisma.election.create({
    data: {
      title: 'Biennial General Elections 2026-2028 (State Executive Council)',
      electionYear: 2026,
      description: 'Physical elections for the State Executive Council of MP-GEA. As per association constitution, voting is strictly physical/offline via secret paper ballot. No electronic or online voting is permitted.',
      returningOfficerName: 'Er. O. P. Saxena (Retd. Chief Engineer, PWD)',
      returningOfficerContact: 'election.officer@mpgea.org',
      status: 'FINAL_CANDIDATES',
      nominationStart: '2026-03-10',
      nominationEnd: '2026-03-20',
      scrutinyDate: '2026-03-22',
      withdrawalDate: '2026-03-25',
      pollingDate: '2026-04-12',
      pollingTime: '10:00 AM to 04:00 PM',
      pollingVenue: 'Auditorium Hall, Nirman Bhawan, Arera Hills, Bhopal, Madhya Pradesh',
      countingDate: '2026-04-12 05:00 PM',
      isActive: true,
    },
  });

  const postPres = await prisma.electionPost.create({
    data: {
      electionId: election.id,
      postTitle: 'State President',
      displayOrder: 1,
    },
  });

  await prisma.electionCandidate.createMany({
    data: [
      {
        postId: postPres.id,
        candidateName: 'Er. Sudhir Kumar Verma',
        designation: 'Superintending Engineer',
        department: 'Public Works Department (PWD)',
        shortBio: 'Serving state engineers for 24 years. Championed cadre autonomy and technical risk allowance.',
        nominationStatus: 'ACCEPTED',
      },
      {
        postId: postPres.id,
        candidateName: 'Er. Mahendra Singh Yadav',
        designation: 'Chief Engineer',
        department: 'Water Resources Department (WRD)',
        shortBio: 'Senior irrigational engineer committed to pension parity and transparent transfer guidelines.',
        nominationStatus: 'ACCEPTED',
      },
    ],
  });

  // Sample News & Events
  await prisma.newsArticle.create({
    data: {
      title: 'MP-GEA Delegation Meets Hon’ble Chief Minister on Engineering Cadre Restructuring',
      slug: 'delegation-meets-cm-cadre-restructuring-2026',
      excerpt: 'State Executive Council submits 7-point memorandum addressing time-bound pay scales, site safety, and creation of technical directorates.',
      content: 'A high-level delegation of the Madhya Pradesh Government Engineers’ Association met with the Hon’ble Chief Minister at Mantralaya, Bhopal. The delegation presented detailed recommendations concerning the career progression of over 2,000 engineers across state engineering departments.',
      category: 'CADRE_UPDATE',
      isFeatured: true,
    },
  });

  await prisma.event.create({
    data: {
      title: 'State Engineering Convention & Annual General Body Meeting 2026',
      description: 'Annual assembly of all serving and retired government engineers of Madhya Pradesh. Technical sessions on modern infrastructure and cadre welfare.',
      venue: 'Ravindra Bhavan Convention Hall, Polytechnic Square, Bhopal',
      eventDate: '2026-05-10',
      startTime: '09:30 AM',
      endTime: '05:30 PM',
      capacity: 500,
      visibility: 'PUBLIC',
      isRegistrationOpen: true,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
