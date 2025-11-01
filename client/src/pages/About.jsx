// About.jsx
import React from 'react';
import { Award, Users, MapPin, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Farm4Better</h1>
          <p className="text-gray-700 text-lg">
            Farm4Better is a platform dedicated to empowering local farmers in Pakistan by connecting them directly with consumers. 
            Our mission is to promote sustainable farming, provide fair prices, and ensure fresh, organic produce for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start gap-4">
            <Award size={32} className="text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower farmers with technology, resources, and fair market access while promoting organic and sustainable farming practices.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start gap-4">
            <Heart size={32} className="text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become the leading platform in Pakistan connecting farmers to consumers, ensuring quality produce, transparency, and fair trade.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <MapPin size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Find Farmers</h3>
              <p className="text-gray-700 text-sm">
                Browse local farmers and discover fresh, organic produce near you.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <Users size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Connect & Order</h3>
              <p className="text-gray-700 text-sm">
                Directly place orders with farmers and enjoy fresh produce delivered to your doorstep.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center gap-4">
              <Star size={28} className="text-green-600" />
              <h3 className="font-semibold text-lg text-gray-900">Support & Grow</h3>
              <p className="text-gray-700 text-sm">
                Support sustainable farming, fair trade, and empower farmers to grow their business.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Muhammad Akram", role: "Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80" },
              { name: "Ayesha Khan", role: "COO", img: "https://images.unsplash.com/photo-1502767089025-6572583495c9?w=200&h=200&fit=crop&q=80" },
              { name: "Ali Raza", role: "CTO", img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop&q=80" },
              { name: "Sara Malik", role: "Marketing Lead", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&q=80" },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg"
                />
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-green-600 text-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Join Our Mission</h3>
          <p className="mb-4">Support local farmers and enjoy fresh, organic produce. Become a part of Farm4Better today!</p>
          <a
            href="/become-farmer"
            className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition-colors"
          >
            Become a Farmer
          </a>
        </div>

      </div>
    </div>
  );
};

export default About;
