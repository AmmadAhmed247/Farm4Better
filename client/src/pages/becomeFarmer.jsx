// BecomeFarmer.jsx
import React, { useState } from 'react';
import { Award, Users, Truck, Star, Check, MapPin, Phone, Mail, UploadCloud } from 'lucide-react';

const BecomeFarmer = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    farmName: '',
    location: '',
    farmType: '',
    experience: '',
    idDocument: null,
    farmDocument: null,
    organicCertificate: null,
    bankProof: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend including files
    setSubmitted(true);
    setTimeout(() => {
      setForm({
        name: '',
        email: '',
        phone: '',
        farmName: '',
        location: '',
        farmType: '',
        experience: '',
        idDocument: null,
        farmDocument: null,
        organicCertificate: null,
        bankProof: null,
      });
      setSubmitted(false);
    }, 2500);
  };

  const handleFileChange = (e, field) => {
    setForm({ ...form, [field]: e.target.files[0] });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Join Farm4Better</h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Empower your farming business. Sell directly to consumers, get fair prices, and grow your farm.
          </p>
          <a
            href="#registration"
            className="inline-block mt-4 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Registration Form */}
        <div id="registration" className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Farmer Registration</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Farm Name"
                  value={form.farmName}
                  onChange={(e) => setForm({ ...form, farmName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location (City, Province)"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Farm Type (Vegetables, Fruits, etc.)"
                  value={form.farmType}
                  onChange={(e) => setForm({ ...form, farmType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Years of Experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              {/* Document Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                  <UploadCloud size={28} className="text-green-600 mb-2" />
                  <span className="text-gray-700 text-center">Upload National ID / Passport</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'idDocument')}
                    required
                  />
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                  <UploadCloud size={28} className="text-green-600 mb-2" />
                  <span className="text-gray-700 text-center">Upload Farm Ownership Document</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'farmDocument')}
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                  <UploadCloud size={28} className="text-green-600 mb-2" />
                  <span className="text-gray-700 text-center">Upload Organic Certification (Optional)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'organicCertificate')}
                  />
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                  <UploadCloud size={28} className="text-green-600 mb-2" />
                  <span className="text-gray-700 text-center">Upload Bank Proof (Optional)</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'bankProof')}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Register Now
              </button>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Submitted!</h3>
              <p className="text-gray-700">
                Our team will review your documents and contact you shortly to verify your farm.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto py-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <Check size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Step 1</h3>
              <p className="text-gray-700 text-sm">Fill in your details and submit the registration form.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <Check size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Step 2</h3>
              <p className="text-gray-700 text-sm">Our team verifies your farm and documents.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <Check size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Step 3</h3>
              <p className="text-gray-700 text-sm">Start listing your products and selling to consumers directly.</p>
            </div>
          </div>
        </div>

        {/* Contact / Support */}
        <div className="bg-green-600 text-white rounded-2xl mt-2 shadow-lg p-10 text-center">
          <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
          <p className="mb-4">If you have questions or need assistance, contact our support team.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
            <a href="tel:+923001234567" className="flex items-center gap-2 hover:underline">
              <Phone size={20} /> +92 300 1234567
            </a>
            <a href="mailto:support@farm4better.com" className="flex items-center gap-2 hover:underline">
              <Mail size={20} /> support@farm4better.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BecomeFarmer;
