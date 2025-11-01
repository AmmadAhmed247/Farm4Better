import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, X, SlidersHorizontal } from 'lucide-react';

// Dummy product data
const allProducts = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", location: "Lahore, Punjab", price: 80, unit: "kg", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 2, name: "Organic Carrots", category: "Vegetables", location: "Karachi, Sindh", price: 100, unit: "kg", rating: 4.7, reviews: 98, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 3, name: "Sweet Mangoes", category: "Fruits", location: "Multan, Punjab", price: 150, unit: "kg", rating: 4.9, reviews: 256, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&q=80", inStock: true, organic: false },
  { id: 4, name: "Fresh Spinach", category: "Vegetables", location: "Islamabad", price: 60, unit: "kg", rating: 4.6, reviews: 87, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 5, name: "Farm Potatoes", category: "Vegetables", location: "Peshawar, KPK", price: 50, unit: "kg", rating: 4.5, reviews: 145, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&q=80", inStock: true, organic: false },
  { id: 6, name: "Red Onions", category: "Vegetables", location: "Quetta, Balochistan", price: 70, unit: "kg", rating: 4.4, reviews: 76, image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop&q=80", inStock: true, organic: false },
  { id: 7, name: "Farm Fresh Eggs", category: "Dairy & Eggs", location: "Faisalabad, Punjab", price: 300, unit: "dozen", rating: 4.9, reviews: 203, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 8, name: "Basmati Rice", category: "Grains", location: "Gujranwala, Punjab", price: 200, unit: "kg", rating: 4.8, reviews: 189, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80", inStock: true, organic: false },
  { id: 9, name: "Green Apples", category: "Fruits", location: "Swat, KPK", price: 180, unit: "kg", rating: 4.7, reviews: 134, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 10, name: "Red Chillies", category: "Spices", location: "Hyderabad, Sindh", price: 250, unit: "kg", rating: 4.6, reviews: 92, image: "https://images.unsplash.com/photo-1583662842075-5242e6b35080?w=400&h=400&fit=crop&q=80", inStock: true, organic: false },
  { id: 11, name: "Fresh Cucumbers", category: "Vegetables", location: "Sialkot, Punjab", price: 55, unit: "kg", rating: 4.5, reviews: 68, image: "https://images.unsplash.com/photo-1568584711271-e0d00ec91c7b?w=400&h=400&fit=crop&q=80", inStock: true, organic: true },
  { id: 12, name: "Fresh Cabbage", category: "Vegetables", location: "Rawalpindi, Punjab", price: 45, unit: "kg", rating: 4.4, reviews: 54, image: "https://images.unsplash.com/photo-1594059723914-a1e6c6c0b04e?w=400&h=400&fit=crop&q=80", inStock: false, organic: false },
];

const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy & Eggs", "Spices"];
const locations = ["All Locations", "Punjab", "Sindh", "KPK", "Balochistan", "Islamabad"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || product.location.includes(selectedLocation);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesOrganic = !organicOnly || product.organic;
    const matchesStock = !inStockOnly || product.inStock;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesOrganic && matchesStock;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-green-100">Browse fresh produce from local Pakistani farmers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <Filter size={24} className="text-green-600" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Location</h4>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Price Range (Rs)</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rs {priceRange[0]}</span>
                    <span>Rs {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Additional</h4>
                <label className="flex items-center gap-3 mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Organic Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All Locations");
                  setPriceRange([0, 500]);
                  setOrganicOnly(false);
                  setInStockOnly(false);
                  setSearchQuery("");
                }}
                className="w-full py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> products
              </p>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.organic && (
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Organic
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Out of Stock</span>
                        </div>
                      )}
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                        <Heart size={20} className="text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin size={16} className="text-green-600" />
                        <span>{product.location}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-green-600">Rs {product.price}</span>
                          <span className="text-gray-500 text-sm">/{product.unit}</span>
                        </div>
                      </div>

                      <button
                        disabled={!product.inStock}
                        className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                          product.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={20} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Filter size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;