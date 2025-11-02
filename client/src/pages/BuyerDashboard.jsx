import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Clock, CheckCircle, XCircle, Truck, Phone, Star, MessageSquare, Download, Search, Filter, ChevronRight, ShoppingBag, Home, Bell, Settings, LogOut, Menu, X, ShoppingCart, Trash2, Plus, Minus, User, Mail, Edit, Save } from 'lucide-react';
import { cartService } from '../services/cart.service';
import { orderService } from '../services/order.service';
// import { userService } from '../services/user.service';

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Cart state
  const [cart, setCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [updatingItem, setUpdatingItem] = useState({});
  
  // Orders state
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  
  // Address state
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: '',
    fullAddress: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications] = useState([
    { id: 1, message: 'Your order is out for delivery', time: '30 mins ago', read: false },
    { id: 2, message: 'Order has been delivered', time: '2 days ago', read: false },
    { id: 3, message: 'Your review is appreciated', time: '3 days ago', read: true }
  ]);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'cart') {
      loadCart();
    } else if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'profile') {
      loadProfile();
    } else if (activeTab === 'addresses') {
      loadAddresses();
    }
  }, [activeTab]);

  // Cart functions
  const loadCart = async () => {
    setLoadingCart(true);
    try {
      const res = await cartService.getCart();
      setCart(res.cart);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoadingCart(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingItem(prev => ({ ...prev, [productId]: true }));
    try {
      const res = await cartService.updateCartItem(productId, newQuantity);
      setCart(res.cart);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdatingItem(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = async (productId) => {
    if (!window.confirm('Remove this item from cart?')) return;
    setUpdatingItem(prev => ({ ...prev, [productId]: true }));
    try {
      const res = await cartService.removeFromCart(productId);
      setCart(res.cart);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdatingItem(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear entire cart?')) return;
    setLoadingCart(true);
    try {
      const res = await cartService.clearCart();
      setCart(res.cart);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to clear cart');
    } finally {
      setLoadingCart(false);
    }
  };

  const calculateCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Orders functions
  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await orderService.getOrders({
        status: filterStatus,
        search: searchQuery
      });
      setOrders(res.orders || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    }
  }, [filterStatus, searchQuery]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await orderService.cancelOrder(orderId);
      loadOrders();
      alert('Order cancelled successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  // Profile functions
  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();
      setProfile(res.user);
      setProfileForm({
        name: res.user.name || '',
        email: res.user.email || '',
        phone: res.user.phone || ''
      });
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const res = await userService.updateProfile(profileForm);
      setProfile(res.user);
      setEditingProfile(false);
      alert('Profile updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await userService.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      alert('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change password');
    }
  };

  // Address functions
  const loadAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await userService.getAddresses();
      setAddresses(res.addresses || []);
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await userService.updateAddress(editingAddress._id, addressForm);
        alert('Address updated successfully');
      } else {
        await userService.addAddress(addressForm);
        alert('Address added successfully');
      }
      setShowAddressModal(false);
      setEditingAddress(null);
      setAddressForm({
        label: '', fullAddress: '', street: '', city: '', state: '', zipCode: '', phone: '', isDefault: false
      });
      loadAddresses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await userService.deleteAddress(addressId);
      loadAddresses();
      alert('Address deleted successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete address');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-transit': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{order.orderId}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Clock className="w-4 h-4" />
            {new Date(order.createdAt).toLocaleDateString('en-GB')}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          {order.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.slice(0, 2).map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{item.product?.name || 'Product'} ({item.quantity})</span>
            <span className="font-medium text-gray-900">Rs {item.price * item.quantity}</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-gray-500">+ {order.items.length - 2} more items</p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-xl font-bold text-green-600">Rs {order.total}</p>
        </div>
        <button
          onClick={() => setSelectedOrder(order)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 text-sm font-medium"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`fixed lg:static inset-0 z-50 lg:z-0 ${showMobileMenu ? 'block' : 'hidden lg:block'}`}>
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setShowMobileMenu(false)} />
      <div className="absolute lg:relative left-0 top-0 h-full w-64 bg-white shadow-xl lg:shadow-none flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-gray-800">FreshHarvest</span>
          </div>
          <button className="lg:hidden" onClick={() => setShowMobileMenu(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => { setActiveTab('orders'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'orders' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            My Orders
          </button>
          <button
            onClick={() => { setActiveTab('cart'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'cart' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
            {cart && cart.items && cart.items.length > 0 && (
              <span className="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {cart.items.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'profile' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
          <button
            onClick={() => { setActiveTab('addresses'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'addresses' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            Addresses
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'settings' ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center lg:hidden">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Welcome Back{profile ? `, ${profile.name}` : ''}!</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Manage your orders and profile</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-green-50'}`}>
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {/* CART TAB */}
          {activeTab === 'cart' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-7 h-7 text-green-600" />
                  Shopping Cart
                </h2>
                {cart && cart.items && cart.items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    Clear Cart
                  </button>
                )}
              </div>

              {loadingCart ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-600">Loading cart...</p>
                </div>
              ) : !cart || !cart.items || cart.items.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products from the marketplace</p>
                  <button
                    onClick={() => navigate('/marketplace')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.product._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
                        <div className="flex gap-4">
                          <img
                            src={item.product.images?.[0]?.url || '/placeholder.png'}
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-gray-800">{item.product.name}</h3>
                                <p className="text-sm text-gray-600">
                                  From: {item.product.farmer?.location || 'Unknown'}
                                </p>
                                {item.product.isOrganic && (
                                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                    Organic
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product._id)}
                                disabled={updatingItem[item.product._id]}
                                className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1 || updatingItem[item.product._id]}
                                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold text-gray-800 w-12 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                  disabled={updatingItem[item.product._id]}
                                  className="p-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Rs {item.price} × {item.quantity}
                                </p>
                                <p className="text-lg font-bold text-green-600">
                                  Rs {item.price * item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                      <h3 className="font-bold text-xl text-gray-800 mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal ({cart.items.length} items)</span>
                          <span>Rs {calculateCartTotal()}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Delivery Fee</span>
                          <span>Rs 150</span>
                        </div>
                        <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold text-gray-800">
                          <span>Total</span>
                          <span className="text-green-600">Rs {calculateCartTotal() + 150}</span>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium mb-3">
                        Proceed to Checkout
                      </button>
                      
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <>
              {!selectedOrder ? (
                <>
                  <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by order ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="all">All Orders</option>
                          <option value="processing">Processing</option>
                          <option value="in-transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {loadingOrders ? (
                    <div className="text-center py-12">
                      <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4" />
                      <p className="text-gray-600">Loading orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {orders.map(order => (
                        <OrderCard key={order._id} order={order} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
                      <p className="text-gray-500 mb-6">Start shopping to place your first order</p>
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Selected order details view
                <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-3xl mx-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Order Details: {selectedOrder.orderId}</h2>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.images?.[0]?.url || '/placeholder.png'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right font-semibold text-gray-800">
                          Rs {item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center border-t pt-4">
                    <div className="text-gray-700">
                      <p>Subtotal: Rs {selectedOrder.total}</p>
                      <p>Delivery Fee: Rs 150</p>
                      <p className="font-bold text-green-600">Total: Rs {selectedOrder.total + 150}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                        <button
                          onClick={() => handleCancelOrder(selectedOrder._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          Cancel Order
                        </button>
                      )}
                      <button
                        onClick={() => navigate('/marketplace')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Add other tabs (Profile, Addresses, Settings) here if needed */}
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;