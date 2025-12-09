"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { AlertCircle, Heart, Loader2, Mail, MapPin, Phone, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function CharityPage() {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const initiateDonation = async (amountINR: number, description: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        setError("Payment keys not configured. Set NEXT_PUBLIC_RAZORPAY_KEY_ID.");
        setLoading(false);
        return;
      }

      const ok = await loadRazorpayScript();
      if (!ok) {
        setError("Failed to load payment SDK.");
        setLoading(false);
        return;
      }

      // Create a donation order via API (backend must implement this)
      const res = await fetch("/api/payments/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountINR }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Donation order API not available.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.orderId,
        amount: Math.round(amountINR * 100),
        currency: "INR",
        name: "LearnHub Charity",
        description,
        image: "/placeholder-logo.png",
        handler: async (response: any) => {
          try {
            const verify = await fetch("/api/payments/donations/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verify.ok) {
              const v = await verify.json().catch(() => ({}));
              setError(v.error || "Payment verification failed.");
            }
          } catch (e) {
            setError("Payment verification error.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled.");
          },
        },
        theme: { color: "#6366F1" },
      } as any;

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (e) {
      setError("Unable to start donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Payment status */}
      {error && (
        <div className="fixed top-4 right-4 z-50 flex items-start gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 mb-6 border border-blue-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Heart className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Make a Difference</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Support Learning,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transform Lives
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join our mission to make education accessible to every learner. Your generosity funds scholarships, devices, and life-changing opportunities.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { value: "50+", label: "Students Sponsored" },
              { value: "₹2.3L+", label: "Raised" },
              { value: "200+", label: "Courses Unlocked" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-blue-200 hover:border-blue-400/50 transition-all"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => initiateDonation(2500, "General Donation")}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Processing...</span>
              ) : (
                <>Donate Now</>
              )}
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-white/30 rounded-xl font-semibold hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Donate Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Quick Donate</h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[500, 1000, 2500, 5000, 10000, 25000].map((amount) => (
                <motion.button
                  key={amount}
                  className="py-3 px-4 rounded-xl bg-slate-100 border border-slate-300 hover:bg-blue-100 hover:border-blue-400 transition-all font-semibold text-slate-900"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => initiateDonation(amount, `Quick Donate ₹${amount}`)}
                  disabled={loading}
                >
                  ₹{(amount / 1000).toFixed(0)}K
                </motion.button>
              ))}
            </motion.div>
            <div className="flex gap-2">
              <input
                placeholder="Custom amount"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-500 focus:outline-none text-slate-900 placeholder-slate-500"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const amt = Number(customAmount);
                  if (!amt || amt <= 0) {
                    setError("Enter a valid amount in INR.");
                    return;
                  }
                  initiateDonation(amt, `Custom Donation ₹${amt}`);
                }}
                disabled={loading}
              >
                Donate
              </motion.button>
            </div>
            <p className="text-xs text-slate-600 mt-3">Secure payment • 100% tax-deductible</p>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Sponsorship Opportunities</h2>
            <p className="text-slate-700">Choose a tier to maximize your impact</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Silver",
                price: "₹10K",
                benefits: ["Sponsor 5 students", "Logo on website", "Quarterly report"],
                icon: Heart
              },
              {
                name: "Gold",
                price: "₹25K",
                benefits: ["Sponsor 12 students", "Co-branding", "Bi-monthly report", "Mention in newsletter"],
                popular: true,
                icon: Zap
              },
              {
                name: "Platinum",
                price: "₹100K",
                benefits: ["Sponsor 50 students", "Spotlight feature", "Monthly report", "Full co-branding"],
                icon: Users
              }
            ].map((tier, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl p-8 border transition-all ${
                  tier.popular
                    ? "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-400 ring-2 ring-blue-300"
                    : "bg-white border-slate-300 hover:border-slate-400"
                }`}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <tier.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-slate-900">{tier.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{tier.price}</p>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center text-slate-700">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    tier.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-slate-100 border border-slate-300 text-slate-900 hover:bg-slate-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const tierAmount = tier.name === "Silver" ? 10000 : tier.name === "Gold" ? 25000 : 100000;
                    initiateDonation(tierAmount, `${tier.name} Sponsorship`);
                  }}
                  disabled={loading}
                >
                  Become a Sponsor
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.h2>

          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src="/professional-woman-headshot.png"
                  alt="Student"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg leading-relaxed mb-4">
                  "With the sponsorship, I completed the Data Science track and secured my first internship. The support was life-changing."
                </p>
                <div>
                  <p className="font-semibold text-blue-600">Aarti Kumar</p>
                  <p className="text-sm text-slate-600">2nd Year Student • Data Science Track</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { label: "Total Raised", value: "₹2,85,800", icon: TrendingUp },
              { label: "Students Sponsored", value: "147", icon: Users },
              { label: "Completion Rate", value: "84%", icon: Heart }
            ].map((metric, i) => (
              <motion.div
                key={i}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-200"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <metric.icon className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-slate-700 mb-4">This Month Progress</p>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "68%" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.form
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-200 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-500 focus:outline-none text-slate-900 placeholder-slate-500"
                />
                <input
                  placeholder="Email"
                  type="email"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-500 focus:outline-none text-slate-900 placeholder-slate-500"
                />
              </div>
              <textarea
                placeholder="How would you like to help?"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-blue-500 focus:outline-none text-slate-900 placeholder-slate-500"
              ></textarea>
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { icon: Mail, label: "Email", value: "charity@eduplatform.org" },
                { icon: Phone, label: "Phone", value: "+91 95454 15111" },
                { icon: MapPin, label: "Address", value: "73 Pannalal Nagar, Ch. Sambhaji Nagar, India" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-blue-200"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">{item.label}</p>
                      <p className="font-semibold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
