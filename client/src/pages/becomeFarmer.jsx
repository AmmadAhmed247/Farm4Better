// BecomeFarmer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, Truck, Star, Check, MapPin, Phone, Mail, UploadCloud } from 'lucide-react';
import { farmerService } from '../services/farmer';
import toast from 'react-hot-toast';

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
  
  const [uploadProgress, setUploadProgress] = useState({
    idDocument: 0,
    farmDocument: 0,
    organicCertificate: 0,
    bankProof: 0
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.name || !form.email || !form.phone || !form.farmName || 
        !form.location || !form.farmType || !form.experience) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate required documents
    if (!form.idDocument || !form.farmDocument) {
      toast.error('ID and farm documents are required');
      return;
    }

    setIsLoading(true);
    
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('farmName', form.farmName);
      formData.append('location', form.location);
      formData.append('farmType', form.farmType);
      formData.append('experience', form.experience);
      
      // Append files
      if (form.idDocument) formData.append('idDocument', form.idDocument);
      if (form.farmDocument) formData.append('farmDocument', form.farmDocument);
      if (form.organicCertificate) formData.append('organicCertificate', form.organicCertificate);
      if (form.bankProof) formData.append('bankProof', form.bankProof);

      const response = await farmerService.registerFarmer(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // Update progress for all files since we're sending them together
          setUploadProgress(prev => ({
            idDocument: progress,
            farmDocument: progress,
            organicCertificate: progress,
            bankProof: progress
          }));
        }
      });
      
      toast.success('Registration submitted successfully!');
      setSubmitted(true);

      // Reset form after delay
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
        navigate('/'); // Redirect to login page
      }, 3000);

    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, [field]: file });
      // Reset progress when new file is selected
      setUploadProgress(prev => ({ ...prev, [field]: 0 }));
      // Clear any existing error toasts
      toast.dismiss();
    }
  };

  const getFileName = (field) => {
    if (form[field]) {
      const name = form[field].name;
      return name.length > 20 ? name.substring(0, 17) + '...' : name;
    }
    return '';
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
                <div className="flex flex-col space-y-2">
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${form.idDocument ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                    <UploadCloud size={28} className="text-green-600 mb-2" />
                    <span className="text-gray-700 text-center">Upload National ID / Passport</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'idDocument')}
                      required
                    />
                    {form.idDocument && (
                      <span className="text-sm text-green-600 mt-2">{getFileName('idDocument')}</span>
                    )}
                  </label>
                  {uploadProgress.idDocument > 0 && uploadProgress.idDocument < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${uploadProgress.idDocument}%` }} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${form.farmDocument ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                    <UploadCloud size={28} className="text-green-600 mb-2" />
                    <span className="text-gray-700 text-center">Upload Farm Ownership Document</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'farmDocument')}
                      required
                    />
                    {form.farmDocument && (
                      <span className="text-sm text-green-600 mt-2">{getFileName('farmDocument')}</span>
                    )}
                  </label>
                  {uploadProgress.farmDocument > 0 && uploadProgress.farmDocument < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${uploadProgress.farmDocument}%` }} />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${form.organicCertificate ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                    <UploadCloud size={28} className="text-green-600 mb-2" />
                    <span className="text-gray-700 text-center">Upload Organic Certification (Optional)</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'organicCertificate')}
                    />
                    {form.organicCertificate && (
                      <span className="text-sm text-green-600 mt-2">{getFileName('organicCertificate')}</span>
                    )}
                  </label>
                  {uploadProgress.organicCertificate > 0 && uploadProgress.organicCertificate < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${uploadProgress.organicCertificate}%` }} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2">
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${form.bankProof ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                    <UploadCloud size={28} className="text-green-600 mb-2" />
                    <span className="text-gray-700 text-center">Upload Bank Proof (Optional)</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'bankProof')}
                    />
                    {form.bankProof && (
                      <span className="text-sm text-green-600 mt-2">{getFileName('bankProof')}</span>
                    )}
                  </label>
                  {uploadProgress.bankProof > 0 && uploadProgress.bankProof < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${uploadProgress.bankProof}%` }} />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Register Now'
                )}
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
            <a href="tel:+92123456789" className="flex items-center gap-2 hover:underline">
              <Phone size={20} /> +92 123456789
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
