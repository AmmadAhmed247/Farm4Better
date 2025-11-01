import React from "react";
import { TrendingUp, Sparkles, Tag, ShoppingBag, ArrowRight } from "lucide-react";

// Sample data with real produce images
const topRanking = [
  { name: "Fresh Tomatoes", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop&q=80", category: "Vegetables" },
  { name: "Organic Carrots", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop&q=80", category: "Vegetables" },
  { name: "Red Chillies", image: "https://images.unsplash.com/photo-1583662842075-5242e6b35080?w=400&h=400&fit=crop&q=80", category: "Spices" },
  { name: "Fresh Cucumbers", image: "https://images.unsplash.com/photo-1568584711271-e0d00ec91c7b?w=400&h=400&fit=crop&q=80", category: "Vegetables" },
];

const newArrivals = [
  { name: "Fresh Spinach", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop&q=80", tag: "New" },
  { name: "Farm Potatoes", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop&q=80", tag: "New" },
  { name: "Red Onions", image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop&q=80", tag: "New" },
  { name: "Fresh Cabbage", image: "https://images.unsplash.com/photo-1594059723914-a1e6c6c0b04e?w=400&h=400&fit=crop&q=80", tag: "New" },
];

const topDeals = [
  { name: "Sweet Mangoes", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop&q=80", price: "Rs 150/kg", discount: "20% OFF" },
  { name: "Farm Fresh Eggs", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop&q=80", price: "Rs 300/dozen", discount: "15% OFF" },
  { name: "Basmati Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&q=80", price: "Rs 200/kg", discount: "10% OFF" },
  { name: "Green Apples", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&q=80", price: "Rs 180/kg", discount: "25% OFF" },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag size={40} strokeWidth={2} />
            <h1 className="text-4xl md:text-5xl font-bold">Farm Marketplace</h1>
          </div>
          <p className="text-xl text-green-50 max-w-2xl">
            Discover fresh, locally-sourced produce directly from Pakistani farmers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Ranking */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-3 rounded-xl">
                <TrendingUp size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-bold text-3xl text-gray-900">Top Ranking</h2>
                <p className="text-gray-600">Most popular produce this week</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group">
              View All
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRanking.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-3">{item.name}</h3>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-3 rounded-xl">
                <Sparkles size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-bold text-3xl text-gray-900">New Arrivals</h2>
                <p className="text-gray-600">Fresh stock just added</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group">
              View All
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 animate-pulse">
                    <Sparkles size={14} />
                    {item.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Deals */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 p-3 rounded-xl">
                <Tag size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-bold text-3xl text-gray-900">Top Deals</h2>
                <p className="text-gray-600">Limited time offers</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group">
              View All
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer relative"
              >
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-2 rounded-full text-sm font-bold z-10 shadow-lg">
                  {item.discount}
                </div>
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-bold text-green-600">{item.price}</span>
                  </div>
                  <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                    Grab Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Support Local Farmers
          </h3>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Every purchase helps farmers in Pakistan grow their business and sustain their families
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transform hover:scale-105 transition-all shadow-xl">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;