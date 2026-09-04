'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Briefcase, FileCheck, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Master options
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    gender: 'Male',
    dob: '',
    employeeId: '',
    departmentId: '',
    designation: 'Assistant Engineer',
    branchId: '',
    qualification: 'B.E. / B.Tech',
    postingDistrictId: '',
    postingOffice: '',
    dateOfJoining: '',
  });

  const [proofFile, setProofFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/master-options')
      .then((res) => res.json())
      .then((data) => {
        if (data.departments) setDepartments(data.departments);
        if (data.branches) setBranches(data.branches);
        if (data.districts) setDistricts(data.districts);
        if (data.departments?.[0]) setFormData((f) => ({ ...f, departmentId: data.departments[0].id }));
        if (data.branches?.[0]) setFormData((f) => ({ ...f, branchId: data.branches[0].id }));
        if (data.districts?.[0]) setFormData((f) => ({ ...f, postingDistrictId: data.districts[0].id }));
      })
      .catch((err) => console.error('Failed to load master options:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) {
        setError('Please fill all mandatory personal details and choose a password.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.employeeId || !formData.dateOfJoining) {
        setError('Please provide your Employee ID and Date of Joining Service.');
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setError('');
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
      setError('Please upload your official Department ID or Appointment Order proof.');
      return;
    }

    setLoading(true);
    setError('');

    const body = new FormData();
    Object.entries(formData).forEach(([k, v]) => body.append(k, v));
    body.append('proofDocument', proofFile);
    if (photoFile) body.append('photo', photoFile);

    try {
      const res = await fetch('/api/applications/submit', {
        method: 'POST',
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Submission failed.');
        setLoading(false);
        return;
      }

      router.push('/portal/dashboard?welcome=1');
      router.refresh();
    } catch {
      setError('Network or server error during submission.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-navy-900 text-white p-6 sm:p-8">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-widest">Enrollment Portal</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Apply for MP-GEA Membership
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Madhya Pradesh Government Engineers’ Association (म.प्र. शासकीय अभियंता संघ)
          </p>

          {/* Stepper Progress */}
          <div className="grid grid-cols-3 gap-2 mt-6 text-xs">
            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
              step === 1
                ? 'bg-teal-700/60 border-teal-400 text-white font-bold'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}>
              <User className="w-4 h-4" />
              <span>1. Personal</span>
            </div>
            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
              step === 2
                ? 'bg-teal-700/60 border-teal-400 text-white font-bold'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}>
              <Briefcase className="w-4 h-4" />
              <span>2. Professional</span>
            </div>
            <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
              step === 3
                ? 'bg-teal-700/60 border-teal-400 text-white font-bold'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}>
              <FileCheck className="w-4 h-4" />
              <span>3. Proof & Review</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-semibold flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-2">
                  Personal & Login Details
                </h2>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name (with Honorific) *</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="e.g. Er. Rajesh Kumar Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official / Primary Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e.g. rajesh.sharma@mp.gov.in"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile Number (10 Digits) *</label>
                    <input
                      required
                      type="tel"
                      name="mobile"
                      placeholder="e.g. 9425000001"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Portal Password (for Login) *</label>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-sm transition-colors"
                  >
                    Next: Professional Details <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-2">
                  Engineering & Departmental Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State Department *</label>
                    <select
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Government Employee ID *</label>
                    <input
                      required
                      type="text"
                      name="employeeId"
                      placeholder="e.g. MP-PWD-19820514 or PRAN"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Designation *</label>
                    <input
                      required
                      type="text"
                      name="designation"
                      placeholder="e.g. Assistant Engineer, Executive Engineer"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Engineering Branch *</label>
                    <select
                      name="branchId"
                      value={formData.branchId}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Educational Qualification *</label>
                    <input
                      required
                      type="text"
                      name="qualification"
                      placeholder="e.g. B.E. (Civil), M.Tech"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Posting District (M.P.) *</label>
                    <select
                      name="postingDistrictId"
                      value={formData.postingDistrictId}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      {districts.map((dst) => (
                        <option key={dst.id} value={dst.id}>{dst.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Current Posting Office Location</label>
                    <input
                      type="text"
                      name="postingOffice"
                      placeholder="e.g. O/o Executive Engineer, PWD Division No. 1"
                      value={formData.postingOffice}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Date of Joining Government Service *</label>
                    <input
                      required
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-sm transition-colors"
                  >
                    Next: Verification Documents <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-base font-bold text-navy-900 border-b border-slate-100 pb-2">
                  Upload Government Service Proof
                </h2>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                  <div>
                    <label className="block font-bold text-navy-900 mb-1">
                      Department ID Card / Appointment Order (Mandatory) *
                    </label>
                    <p className="text-[11px] text-slate-500 mb-2">
                      Upload scan of official departmental identity card, posting order, or service book first page. Supported formats: PDF, JPG, PNG (Max 5 MB).
                    </p>
                    <input
                      required
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <label className="block font-bold text-navy-900 mb-1">
                      Passport Size Photo (Optional - for Digital ID Card)
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300"
                    />
                  </div>
                </div>

                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-2 text-xs text-teal-900">
                  <div className="font-bold">Next Steps After Submission:</div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                    <li>Your application will be scrutinized by the Membership Verification Committee.</li>
                    <li>Upon approval, you will receive an email and login access to complete annual subscription payment (₹1,000).</li>
                    <li>Instant generation of your tamper-proof <strong>Digital ID Card with QR Verification</strong>.</li>
                  </ol>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg text-sm hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex items-center px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-sm transition-all shadow-md disabled:opacity-50"
                  >
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
