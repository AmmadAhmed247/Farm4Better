import React, { useState } from 'react';
import { Package, MapPin, Clock, CheckCircle, XCircle, Truck, Phone, Mail, User, Calendar, DollarSign, Star, MessageSquare, Download, Eye, Search, Filter, ChevronRight, ShoppingBag, Home, Bell, Settings, LogOut, Menu, X } from 'lucide-react';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [orders] = useState([
    {
      id: 'ORD-2025-001',
      date: '2025-10-28',
      status: 'delivered',
      total: 2450,
      items: [
        { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', price: 120, farmer: 'Ahmed Khan' },
        { name: 'Fresh Potatoes', quantity: 10, unit: 'kg', price: 80, farmer: 'Hassan Ali' },
      ],
      farmer: {
        name: 'Ahmed Khan',
        phone: '+92 300 1234567',
        location: 'Multan, Punjab',
        rating: 4.8
      },
      delivery: {
        address: 'House 123, Street 5, DHA Phase 6, Karachi',
        estimatedDate: '2025-10-30',
        actualDate: '2025-10-29',
        trackingSteps: [
          { status: 'Order Placed', date: '2025-10-28 10:30 AM', completed: true },
          { status: 'Processing', date: '2025-10-28 02:15 PM', completed: true },
          { status: 'Dispatched', date: '2025-10-29 08:00 AM', completed: true },
          { status: 'Out for Delivery', date: '2025-10-29 10:30 AM', completed: true },
          { status: 'Delivered', date: '2025-10-29 02:45 PM', completed: true }
        ]
      }
    },
    {
      id: 'ORD-2025-002',
      date: '2025-10-30',
      status: 'in-transit',
      total: 1800,
      items: [
        { name: 'Fresh Spinach', quantity: 3, unit: 'kg', price: 100, farmer: 'Fatima Bibi' },
        { name: 'Organic Carrots', quantity: 5, unit: 'kg', price: 90, farmer: 'Fatima Bibi' },
      ],
      farmer: {
        name: 'Fatima Bibi',
        phone: '+92 301 7654321',
        location: 'Lahore, Punjab',
        rating: 4.9
      },
      delivery: {
        address: 'Flat 45, Block C, Gulshan-e-Iqbal, Karachi',
        estimatedDate: '2025-11-01',
        trackingSteps: [
          { status: 'Order Placed', date: '2025-10-30 11:00 AM', completed: true },
          { status: 'Processing', date: '2025-10-30 03:30 PM', completed: true },
          { status: 'Dispatched', date: '2025-10-31 09:00 AM', completed: true },
          { status: 'Out for Delivery', date: '2025-11-01 08:00 AM', completed: false },
          { status: 'Delivered', date: '', completed: false }
        ]
      }
    },
    {
      id: 'ORD-2025-003',
      date: '2025-10-31',
      status: 'processing',
      total: 3200,
      items: [
        { name: 'Fresh Mangoes', quantity: 10, unit: 'kg', price: 200, farmer: 'Imran Ahmed' },
        { name: 'Organic Bananas', quantity: 5, unit: 'dozen', price: 150, farmer: 'Imran Ahmed' },
      ],
      farmer: {
        name: 'Imran Ahmed',
        phone: '+92 302 9876543',
        location: 'Multan, Punjab',
        rating: 4.7
      },
      delivery: {
        address: 'Villa 78, Phase 8, DHA, Karachi',
        estimatedDate: '2025-11-03',
        trackingSteps: [
          { status: 'Order Placed', date: '2025-10-31 09:15 AM', completed: true },
          { status: 'Processing', date: '2025-10-31 12:00 PM', completed: true },
          { status: 'Dispatched', date: '', completed: false },
          { status: 'Out for Delivery', date: '', completed: false },
          { status: 'Delivered', date: '', completed: false }
        ]
      }
    }
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Your order ORD-2025-002 is out for delivery', time: '30 mins ago', read: false },
    { id: 2, message: 'Order ORD-2025-001 has been delivered', time: '2 days ago', read: false },
    { id: 3, message: 'Your review for Ahmed Khan is appreciated', time: '3 days ago', read: true }
  ]);

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.farmer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const OrderCard = ({ order }) => (
    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{order.id}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date(order.date).toLocaleDateString('en-GB')}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          {order.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{item.name} ({item.quantity} {item.unit})</span>
            <span className="font-medium text-gray-900">PKR {item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-xl font-bold text-green-600">PKR {order.total}</p>
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
              activeTab === 'orders' 
                ? 'bg-green-50 text-green-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            My Orders
          </button>
          <button
            onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'profile' 
                ? 'bg-green-50 text-green-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
          <button
            onClick={() => { setActiveTab('addresses'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'addresses' 
                ? 'bg-green-50 text-green-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            Addresses
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setShowMobileMenu(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === 'settings' 
                ? 'bg-green-50 text-green-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
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
                <h1 className="text-xl font-bold text-gray-800">Welcome Back!</h1>
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
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {activeTab === 'orders' && (
            <>
              {!selectedOrder ? (
                <>
                  {/* Filters */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by order ID or farmer name..."
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

                  {/* Orders Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>

                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Back to Orders
                  </button>

                  {/* Order Details */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedOrder.id}</h2>
                        <p className="text-gray-600 mt-1">
                          Placed on {new Date(selectedOrder.date).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Tracking Timeline */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-green-600" />
                        Order Tracking
                      </h3>
                      <div className="relative">
                        {selectedOrder.delivery.trackingSteps.map((step, idx) => (
                          <div key={idx} className="flex gap-4 pb-8 last:pb-0 relative">
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                step.completed 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'bg-white border-gray-300'
                              }`}>
                                {step.completed ? (
                                  <CheckCircle className="w-5 h-5 text-white" />
                                ) : (
                                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                                )}
                              </div>
                              {idx < selectedOrder.delivery.trackingSteps.length - 1 && (
                                <div className={`w-0.5 h-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                              )}
                            </div>
                            <div className="flex-1 pt-1">
                              <h4 className={`font-semibold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                                {step.status}
                              </h4>
                              {step.date && (
                                <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        Delivery Address
                      </h3>
                      <p className="text-gray-700">{selectedOrder.delivery.address}</p>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          Expected: {new Date(selectedOrder.delivery.estimatedDate).toLocaleDateString('en-GB')}
                        </span>
                        {selectedOrder.delivery.actualDate && (
                          <span className="text-green-600 font-medium">
                            Delivered: {new Date(selectedOrder.delivery.actualDate).toLocaleDateString('en-GB')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Items Ordered */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-3">Items Ordered</h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} {item.unit} × PKR {item.price}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">From: {item.farmer}</p>
                            </div>
                            <span className="font-bold text-gray-800">
                              PKR {item.quantity * item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Farmer Info */}
                    <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-200">
                      <h3 className="font-semibold text-gray-800 mb-3">Farmer Information</h3>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{selectedOrder.farmer.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold">{selectedOrder.farmer.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                            <MapPin className="w-4 h-4" />
                            {selectedOrder.farmer.location}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
                            <Phone className="w-5 h-5 text-green-600" />
                          </button>
                          <button className="p-2 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-gray-700">
                          <span>Subtotal</span>
                          <span>PKR {selectedOrder.total - 150}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Delivery Fee</span>
                          <span>PKR 150</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span className="text-green-600">PKR {selectedOrder.total}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
                          <Download className="w-5 h-5" />
                          Download Invoice
                        </button>
                        {selectedOrder.status === 'delivered' && (
                          <button className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium flex items-center justify-center gap-2">
                            <Star className="w-5 h-5" />
                            Rate Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Muhammad Ali"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="ali@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+92 300 1234567"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium">
                  Add New Address
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border-2 border-green-500 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Default</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Home</h3>
                  <p className="text-gray-600 text-sm">House 123, Street 5, DHA Phase 6, Karachi</p>
                  <p className="text-gray-600 text-sm mt-1">+92 300 1234567</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-green-500 transition">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">Secondary</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Office</h3>
                  <p className="text-gray-600 text-sm">Floor 3, Building A, I.I. Chundrigar Road, Karachi</p>
                  <p className="text-gray-600 text-sm mt-1">+92 300 1234567</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">Order Updates</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">Promotional Offers</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <span className="text-gray-700">New Products</span>
                      <input type="checkbox" className="w-5 h-5 text-green-600 rounded focus:ring-green-500" />
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Account Security</h3>
                  <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
                    Change Password
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-red-600 mb-3">Danger Zone</h3>
                  <button className="w-full py-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition font-medium text-red-600">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;