import React, { useState } from 'react';
import { MapPin, Star, Heart, ShoppingCart, Truck, Shield, Award, X, Mail, User, MessageSquare, Send, Phone, Clock, Check } from 'lucide-react';


const product = {
  id: 1,
  name: "Fresh Organic Tomatoes",
  category: "Vegetables",
  price: 80,
  unit: "kg",
  rating: 4.8,
  reviews: 124,
  inStock: true,
  quantity: 500,
  organic: true,
  description: "Premium quality organic tomatoes grown in the fertile lands of Punjab. These tomatoes are handpicked at peak ripeness to ensure maximum flavor and nutrition. Perfect for salads, cooking, and making fresh tomato sauce.",
  images: [
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606588260160-8f8806c29f7c?w=800&h=800&fit=crop&q=80"
  ],
  farmer: {
    name: "Muhammad Akram",
    location: "Lahore, Punjab",
    experience: "15 years",
    rating: 4.9,
    totalSales: 2543,
    responseTime: "Within 2 hours",
    phone: "+92 300 1234567",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
  },
  features: [
    "100% Organic certified",
    "Pesticide-free farming",
    "Fresh harvest daily",
    "Direct from farm",
    "Quality guaranteed"
  ],
  nutritionalInfo: [
    { label: "Calories", value: "18 per 100g" },
    { label: "Vitamin C", value: "14mg" },
    { label: "Fiber", value: "1.2g" },
    { label: "Water Content", value: "95%" }
  ]
};

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowEnquiryModal(false);
      setSubmitSuccess(false);
      setEnquiryForm({ name: '', email: '', query: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4 relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.organic && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                  <Award size={18} />
                  Organic Certified
                </div>
              )}
              <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                <Heart size={24} className="text-gray-600 hover:text-red-500" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden border-4 transition-all ${
                    selectedImage === index
                      ? 'border-green-600 shadow-lg'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="font-semibold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? `${product.quantity} kg in stock` : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-green-600">Rs {product.price}</span>
                <span className="text-2xl text-gray-600">/ {product.unit}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <Check size={18} className="text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x-2 border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">{product.unit} available</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={() => setShowEnquiryModal(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageSquare size={20} />
                Contact Farmer
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <Truck size={24} className="text-green-600" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Free Delivery</div>
                  <div className="text-xs text-gray-600">Orders over Rs 500</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Shield size={24} className="text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Quality Check</div>
                  <div className="text-xs text-gray-600">100% Guaranteed</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <Clock size={24} className="text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Fresh Daily</div>
                  <div className="text-xs text-gray-600">Harvested today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Information Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">Meet Your Farmer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <img
                src={product.farmer.image}
                alt={product.farmer.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold mb-2">{product.farmer.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={18} />
                <span>{product.farmer.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-white" />
                <span className="font-semibold">{product.farmer.rating} Rating</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{product.farmer.experience}</div>
                  <div className="text-green-100">Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{product.farmer.totalSales}+</div>
                  <div className="text-green-100">Total Sales</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-lg font-bold mb-1">{product.farmer.responseTime}</div>
                  <div className="text-green-100">Response Time</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-lg leading-relaxed mb-4">
                  "I've been farming for over {product.farmer.experience} in the heart of Punjab. My commitment is to provide the freshest, highest quality produce using sustainable and organic farming practices. Direct connection with buyers helps me ensure you get the best products at fair prices."
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowEnquiryModal(true)}
                    className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    <MessageSquare size={20} />
                    Send Enquiry
                  </button>
                  <a
                    href={`tel:${product.farmer.phone}`}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutritional Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.nutritionalInfo.map((info, index) => (
              <div key={index} className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-2">{info.value}</div>
                <div className="text-gray-700 font-semibold">{info.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Farmer</h3>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {!submitSuccess ? (
                <div className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <div className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name *
                    </div>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <div className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </div>
                    <div className="relative">
                      <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                        placeholder="your.email@example.com"
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Query Field */}
                  <div>
                    <div className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Query *
                    </div>
                    <div className="relative">
                      <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        value={enquiryForm.query}
                        onChange={(e) => setEnquiryForm({...enquiryForm, query: e.target.value})}
                        placeholder="Ask about availability, bulk orders, delivery, or anything else..."
                        rows={5}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {/* Farmer Info */}
                  <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4">
                    <img
                      src={product.farmer.image}
                      alt={product.farmer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{product.farmer.name}</div>
                      <div className="text-sm text-gray-600">{product.farmer.location}</div>
                      <div className="text-sm text-green-600 font-semibold">Responds {product.farmer.responseTime.toLowerCase()}</div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleEnquirySubmit}
                    disabled={!enquiryForm.name || !enquiryForm.email || !enquiryForm.query}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                    Send Enquiry
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enquiry Sent Successfully!</h4>
                  <p className="text-gray-600">
                    {product.farmer.name} will respond to your enquiry within {product.farmer.responseTime.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;