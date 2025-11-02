import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, ShoppingCart, Truck, Shield, Award, X, Mail, User, MessageSquare, Send, Phone, Clock, Check, ArrowLeft, Loader } from 'lucide-react';
import { productService } from '../services/product';
import { cartService } from '../services/cart.service';

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getById(id);
        setProduct(res.product);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual enquiry submission to backend
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowEnquiryModal(false);
      setSubmitSuccess(false);
      setEnquiryForm({ name: '', email: '', query: '' });
    }, 2000);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await cartService.addToCart(product._id, quantity);
      alert(`${quantity} ${product.unit} of ${product.name} added to cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert(err.response?.data?.message || 'Failed to add item to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  // Get images array (handle both populated and direct URLs)
  const images = product.images && product.images.length > 0
    ? product.images.map(img => typeof img === 'string' ? img : img.url)
    : ['/placeholder.png'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Marketplace
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4 relative group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.isOrganic && (
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
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
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
            )}
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
                    className={i < Math.floor(product.rating || 4.5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="font-semibold text-gray-900">{product.rating || 4.5}</span>
              </div>
              <span className="text-gray-600">({product.reviews || 0} reviews)</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {product.quantity > 0 ? `${product.quantity} ${product.unit} in stock` : 'Out of Stock'}
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
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Fresh and quality produce directly from the farm.'}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.isOrganic && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check size={18} className="text-green-600" />
                    <span>100% Organic certified</span>
                  </div>
                )}
                {product.isPesticideFree && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Check size={18} className="text-green-600" />
                    <span>Pesticide-free farming</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Check size={18} className="text-green-600" />
                  <span>Fresh harvest daily</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check size={18} className="text-green-600" />
                  <span>Direct from farm</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check size={18} className="text-green-600" />
                  <span>Quality guaranteed</span>
                </div>
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
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-x-2 border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
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
              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0 || addingToCart}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  product.quantity === 0 || addingToCart
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <ShoppingCart size={20} />
                {addingToCart ? 'Adding...' : product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
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
        {product.farmer && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6">Meet Your Farmer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 bg-white flex items-center justify-center">
                  <User size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {product.farmer.user?.name || 'Farmer'}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={18} />
                  <span>{product.farmer.location || 'Pakistan'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-white" />
                  <span className="font-semibold">4.8 Rating</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold mb-1">{product.farmer.experience || '10+'} years</div>
                    <div className="text-green-100">Experience</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-green-100">Total Sales</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-lg font-bold mb-1">Within 24h</div>
                    <div className="text-green-100">Response Time</div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-lg leading-relaxed mb-4">
                    Committed to providing the freshest, highest quality produce using sustainable and organic farming practices. 
                    Direct connection with buyers helps ensure you get the best products at fair prices.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowEnquiryModal(true)}
                      className="flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                    >
                      <MessageSquare size={20} />
                      Send Enquiry
                    </button>
                    {product.farmer.user?.phone && (
                      <a
                        href={`tel:${product.farmer.user.phone}`}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                      >
                        <Phone size={20} />
                        Call Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
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
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

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
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

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
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>

                  {product.farmer && (
                    <div className="bg-green-50 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {product.farmer.user?.name || 'Farmer'}
                        </div>
                        <div className="text-sm text-gray-600">{product.farmer.location}</div>
                        <div className="text-sm text-green-600 font-semibold">Responds within 24 hours</div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Enquiry
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enquiry Sent Successfully!</h4>
                  <p className="text-gray-600">
                    The farmer will respond to your enquiry within 24 hours.
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