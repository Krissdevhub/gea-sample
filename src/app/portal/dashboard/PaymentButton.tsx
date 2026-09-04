'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PaymentButton({ memberName }: { memberName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeId: 'SERVING_ANNUAL' }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to initiate payment.');
        setLoading(false);
        return;
      }

      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: data.orderId,
          razorpay_payment_id: `pay_test_${Date.now()}`,
          razorpay_signature: 'mock_sig_test_valid',
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok) {
        alert(`Payment Successful! Membership Activated. Number: ${verifyData.membershipNumber}`);
        router.refresh();
      } else {
        alert(verifyData.error || 'Payment verification failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error communicating with payment gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="inline-flex items-center px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-sm transition-all shadow-md disabled:opacity-50"
    >
      {loading ? 'Processing Payment...' : '💳 Pay Annual Subscription Fee (₹1,000)'}
    </button>
  );
}
