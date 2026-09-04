# MP-GEA Known Technical Limitations & Design Scope

1. **Strictly Offline Voting**: As per association bylaws and design requirements, no electronic voting, online balloting, or digital vote counting is supported. All voting is physical.
2. **No Third-Party SMS / WhatsApp Gateway in V1**: Email is the primary transactional channel to avoid reliance on recurring paid SMS APIs. The notification service architecture is decoupled for future SMS integration.
3. **No Direct Government HRMS Integration**: Madhya Pradesh State IFMS / Treasury integration is not publicly available via API; verification is handled through authorized administrative scrutiny of uploaded appointment letters and departmental ID cards.
4. **Local Document Storage vs Cloud Bucket**: In standard managed Node.js hosting, documents reside on the secure host filesystem with protected stream endpoints. The storage driver is abstracted to allow S3/Cloud Storage configuration if needed.
