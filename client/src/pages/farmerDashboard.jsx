import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { farmerService } from '../services/farmer';
import { productService } from '../services/product';
import { toast } from 'react-hot-toast';
import { Camera, Send, TrendingUp, Package, DollarSign, Star, Clock, MapPin, Phone, Mail, AlertCircle, CheckCircle, XCircle, Upload, MessageSquare, Leaf, Award, Users } from 'lucide-react';
import axios from 'axios';
export default function FarmerProductPage() {
  const [activeTab, setActiveTab] = useState('details');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hello! I\'m your AI farming assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [aiImages, setAiImages] = useState([]);
  const messagesEndRef = useRef(null);
  const [aiFiles, setAiFiles] = useState([]);

  
  const [productData, setProductData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: 'kg',
    quantity: '',
    description: '',
    isOrganic: false,
    isPesticideFree: false,
    images: []
  });
  
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productError, setProductError] = useState(null);

  const [farmerData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    experience: 0,
    totalSales: 0,
    rating: 0,
    responseTime: '',
    totalProducts: 0,
    reviews: 0,
    idDocument: null,
    farmDocument: null,
    organicCertificate: null,
    bankProof: null
  });
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      // only for farmer users
      if (user.userType !== 'farmer') return;
      setLoadingProfile(true);
      setProfileError(null);
      try {
        // Prefer protected endpoint that uses token cookie
        const res = await farmerService.getMyProfile();
        setFarmerProfile(res.farmer);
      } catch (err) {
        console.error('Failed to load farmer profile', err);
        setProfileError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user]);

  // auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setProductImages(prev => [...prev, ...newImages]);
    // Store actual files for upload
    setProductData(prev => ({
      ...prev,
      images: [...(prev.images || []), ...files]
    }));
  };

  const handleAiImageChange = (e) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  const previews = files.map(file => URL.createObjectURL(file));

  setAiImages(prev => [...prev, ...previews]); // only for UI
  setAiFiles(prev => [...prev, ...files]);      // actual File objects for upload
};


const handleAiImageAnalysis = async () => {
  if (aiFiles.length === 0) return;

  const formData = new FormData();
  formData.append("file", aiFiles[0]); // send actual File object

  try {
    const res = await fetch("http://localhost:3000/api/ai/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const analysis = {
      status: data.predicted_class === "Healthy Leaf" ? "healthy" : "alert",
      confidence: typeof data.confidence === "number" ? data.confidence.toFixed(2) : 0,
      imageCount: 1,
      issues: data.predicted_class !== "Healthy Leaf" ? [data.predicted_class] : [],
      recommendations:
        data.predicted_class !== "Healthy Leaf"
          ? ["Check irrigation", "Apply proper treatment"]
          : [],
    };

    setAiAnalysis(analysis);
  } catch (err) {
    console.error("AI Analysis error:", err);
  }
};




const handleSendMessage = async () => {
  if (!chatInput.trim()) return;

  const messageToSend = chatInput;
  setChatMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
  setChatInput('');

  try {
    const { data } = await axios.post(
  "http://localhost:3000/api/chat",
  { message: messageToSend },
  { 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }
);


    setChatMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
  } catch (err) {
    console.error("Chatbot error:", err.response?.data || err.message);

    setChatMessages(prev => [
      ...prev,
      { role: 'ai', text: "Sorry, I couldn't process your question. Please try again." }
    ]);
  }
};




  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'alert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'healthy': return <CheckCircle className="w-6 h-6" />;
      case 'warning': return <AlertCircle className="w-6 h-6" />;
      case 'alert': return <XCircle className="w-6 h-6" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-green-100">Manage your products and get AI-powered insights</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Farmer Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {(farmerProfile?.name || 'F').charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{farmerProfile?.name || 'Farmer'}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{farmerProfile?.location || ''}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{farmerProfile?.rating ?? '-'}</span>
                      <span className="text-gray-500 text-sm">({farmerProfile?.reviews ?? 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Responds in {farmerProfile?.responseTime || '-'}</span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{farmerProfile?.experience ?? 0}</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <Package className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{farmerProfile?.totalProducts ?? 0}</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">PKR {( (farmerProfile?.totalSales ?? 0) / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{farmerProfile?.reviews ?? 0}</div>
              <div className="text-sm text-gray-600">Customer Reviews</div>
            </div>
          </div>
        </div>

        {/* Documents */}
        {farmerProfile && (farmerProfile.idDocument || farmerProfile.farmDocument || farmerProfile.organicCertificate || farmerProfile.bankProof) && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-green-100">
            <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {farmerProfile.idDocument && (
                <div className="text-center">
                  <div className="mb-2 font-medium">ID Document</div>
                  <a href={farmerProfile.idDocument} target="_blank" rel="noreferrer">
                    <img src={farmerProfile.idDocument} alt="ID Document" className="mx-auto w-32 h-20 object-cover rounded border" />
                  </a>
                </div>
              )}
              {farmerProfile.farmDocument && (
                <div className="text-center">
                  <div className="mb-2 font-medium">Farm Document</div>
                  <a href={farmerProfile.farmDocument} target="_blank" rel="noreferrer">
                    <img src={farmerProfile.farmDocument} alt="Farm Document" className="mx-auto w-32 h-20 object-cover rounded border" />
                  </a>
                </div>
              )}
              {farmerProfile.organicCertificate && (
                <div className="text-center">
                  <div className="mb-2 font-medium">Organic Certificate</div>
                  <a href={farmerProfile.organicCertificate} target="_blank" rel="noreferrer">
                    <img src={farmerProfile.organicCertificate} alt="Organic Certificate" className="mx-auto w-32 h-20 object-cover rounded border" />
                  </a>
                </div>
              )}
              {farmerProfile.bankProof && (
                <div className="text-center">
                  <div className="mb-2 font-medium">Bank Proof</div>
                  <a href={farmerProfile.bankProof} target="_blank" rel="noreferrer">
                    <img src={farmerProfile.bankProof} alt="Bank Proof" className="mx-auto w-32 h-20 object-cover rounded border" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile loader / errors */}
        {loadingProfile && (
          <div className="max-w-7xl mx-auto p-4 text-center text-gray-600">Loading your profile...</div>
        )}
        {profileError && (
          <div className="max-w-7xl mx-auto p-4 text-center text-red-600">{profileError}</div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md border border-green-100">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'details'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('ai-detection')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'ai-detection'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              AI Detection
            </button>
            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'ai-chat'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              AI Assistant
            </button>
          </div>

          {/* Product Details Tab */}
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={productData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="dairy">Dairy</option>
                      <option value="herbs">Herbs</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price (PKR)</label>
                      <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
                      <select
                        name="unit"
                        value={productData.unit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="liter">Liter</option>
                        <option value="piece">Piece</option>
                        <option value="dozen">Dozen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Available</label>
                    <input
                      type="number"
                      name="quantity"
                      value={productData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Sales (PKR)</label>
                    <input
                      type="number"
                      name="totalSales"
                      value={productData.totalSales}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isOrganic"
                        checked={productData.isOrganic}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Organic Certified</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isPesticideFree"
                        checked={productData.isPesticideFree}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Pesticide-Free</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload images</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                    {productImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {productImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Show approval status message if farmer is not approved */}
              {farmerProfile?.status !== 'approved' && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">Document Verification Pending</p>
                  </div>
                  <p className="mt-1 text-sm text-yellow-700">
                    Our team is currently reviewing your documents. You'll be able to add products once your documents are approved.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => {
                    setProductData({
                      name: '',
                      category: 'vegetables',
                      price: '',
                      unit: 'kg',
                      quantity: '',
                      description: '',
                      isOrganic: false,
                      isPesticideFree: false,
                      images: []
                    });
                    setProductImages([]);
                  }}
                  type="button"
                  disabled={isCreatingProduct || farmerProfile?.status !== 'approved'}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Clear
                </button>
                <button 
                  onClick={async () => {
                    if (farmerProfile?.status !== 'approved') {
                      toast.error('Please wait for document approval before adding products');
                      return;
                    }

                    try {
                      setIsCreatingProduct(true);
                      setProductError(null);
                      
                      // Convert price and quantity to numbers
                      const dataToSubmit = {
                        ...productData,
                        price: Number(productData.price),
                        quantity: Number(productData.quantity)
                      };
                      
                      const res = await productService.create(dataToSubmit);
                      
                      toast.success('Product created successfully!');
                      
                      // Clear form
                      setProductData({
                        name: '',
                        category: 'vegetables',
                        price: '',
                        unit: 'kg',
                        quantity: '',
                        description: '',
                        isOrganic: false,
                        isPesticideFree: false,
                        images: []
                      });
                      setProductImages([]);
                      
                    } catch (err) {
                      console.error('Failed to create product:', err);
                      const errMsg = err.response?.data?.message || 'Failed to create product';
                      setProductError(errMsg);
                      toast.error(errMsg);
                    } finally {
                      setIsCreatingProduct(false);
                    }
                  }}
                  disabled={
                    isCreatingProduct || 
                    !productData.name || 
                    !productData.price || 
                    !productData.quantity || 
                    !productData.description ||
                    farmerProfile?.status !== 'approved'
                  }
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isCreatingProduct ? 'Creating...' : farmerProfile?.status !== 'approved' ? 'Approval Pending' : 'Save Product'}
                </button>
              </div>
              
              {productError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {productError}
                </div>
              )}
            </div>
          )}

          {/* AI Detection Tab */}
          {activeTab === 'ai-detection' && (
            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-gray-800 mb-2">AI Crop Analysis</h3>
                <p className="text-sm text-gray-600">Upload images of your crops for instant health analysis and recommendations</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Crop Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="ai-image-upload"
                    onChange={handleAiImageChange}
                  />
                  <label htmlFor="ai-image-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium mb-1">Upload images for AI analysis</p>
                    <p className="text-sm text-gray-500">Drop files here or click to browse</p>
                  </label>
                  {aiImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {aiImages.map((src, i) => (
                        <img key={i} src={src} alt={`ai-${i}`} className="w-24 h-16 object-cover rounded border mx-auto" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleAiImageAnalysis}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition font-semibold"
              >
                Analyze with AI
              </button>

              {aiAnalysis && (
                <div className={`rounded-lg p-6 border-2 ${
                  aiAnalysis.status === 'healthy' ? 'border-green-200 bg-green-50' :
                  aiAnalysis.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={getStatusColor(aiAnalysis.status)}>
                      {getStatusIcon(aiAnalysis.status)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg capitalize">
                        {aiAnalysis.status === 'healthy' ? 'Healthy Crop' :
                         aiAnalysis.status === 'warning' ? 'Attention Needed' :
                         'Action Required'}
                      </h3>
                      <p className="text-sm text-gray-600">Confidence: {aiAnalysis.confidence}%</p>
                      {typeof aiAnalysis.imageCount === 'number' && (
                        <p className="text-sm text-gray-600">Images analyzed: {aiAnalysis.imageCount}</p>
                      )}
                    </div>
                  </div>

                  {aiAnalysis.issues.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Issues Detected:</h4>
                      <ul className="space-y-1">
                        {aiAnalysis.issues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
                    <ul className="space-y-2">
                      {aiAnalysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Chat Tab */}
          {activeTab === 'ai-chat' && (
            <div className="p-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  AI Farming Assistant
                </h3>
                <p className="text-sm text-gray-600">Ask me anything about farming, pest control, market trends, or crop management</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
                  placeholder="Ask me about farming..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}