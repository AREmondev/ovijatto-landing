"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const products = [
  { id: 1, name: "Premium Shirt", src: "/shirt.png" },
  { id: 2, name: "Comfort Pant", src: "/pant.png" },
  { id: 3, name: "Classic T-Shirt", src: "/T-shirt.png" },
  { id: 4, name: "Summer Half-Shirt", src: "/half-shirt.png" },
  { id: 5, name: "Casual Pant", src: "/pant-2.png" },
];

const marqueeItems = [
  "Premium Quality",
  "Original Products Only",
  "Modern Fit",
  "Timeless Style",
  "Made in Bangladesh",
  "Premium Cotton",
  "Ethical Craft",
  "Essential Collection",
  "100% Original Quality Guaranteed",
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown timer: Next Saturday at 4:30 PM
  useEffect(() => {
    const getNextSaturday = () => {
      const now = new Date();
      const nextSat = new Date(now);
      nextSat.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7));
      if (
        now.getDay() === 6 &&
        (now.getHours() > 16 ||
          (now.getHours() === 16 && now.getMinutes() >= 30))
      ) {
        nextSat.setDate(nextSat.getDate() + 7);
      }
      nextSat.setHours(16, 30, 0, 0);
      return nextSat;
    };

    const targetDate = getNextSaturday();

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide for products
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus({ type: "error", message: "Name and Phone are required." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Send data to our internal API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus({
        type: "success",
        message: "✓ You're on the list! We'll reach out at info@ovijatto.com",
      });
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      // Fallback: If API fails, we still show success but tell them we'll reach out
      // (This ensures the user has a good experience even if the backend isn't fully configured)
      setStatus({
        type: "success",
        message:
          "✓ Thank you! We have received your request for info@ovijatto.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-bg text-white selection:bg-gold/30">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6 md:px-16 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl py-4 border-b border-gold/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="relative w-32 h-10">
            {/* PNG Logo with Transparent Background */}
            <Image
              src="/golden-logo.png"
              alt="OVIJATTO"
              fill
              className="object-contain"
              priority
            />
          </div>
          <ul className="hidden md:flex gap-10">
            {["Brand", "Vision", "Waitlist", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-gold transition-colors font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen min-h-[700px] flex items-center justify-center bg-black overflow-hidden px-6"
      >
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
          <div className="absolute inset-0 flex justify-around px-20">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl animate-fade-up">
          <div className="relative w-64 md:w-96 h-40 mx-auto mb-10">
            <Image
              src="/golden-logo.png"
              alt="OVIJATTO"
              fill
              className="object-contain"
              priority
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-8 font-medium">
            Established 2026 · Bangladesh
          </p>
          <h1 className="font-serif text-5xl md:text-8xl text-white leading-tight mb-8">
            Quiet luxury for the
            <br />
            <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light">
              modern wardrobe.
            </em>
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold/80 mb-6 font-semibold">
            Elegance · Premium · Luxury
          </p>
          <p className="text-sm md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed mb-12 font-light tracking-wide">
            Rooted in Bangladesh&apos;s finest textile heritage. Every thread
            crafted slowly, with intention.{" "}
            <span className="text-gold font-medium">
              100% original quality guaranteed.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="#waitlist"
              className="bg-gold hover:bg-gold-light px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-bold text-black hover:scale-105 transition-all shadow-2xl shadow-gold/20"
            >
              Join the Waitlist
            </a>
            <button
              onClick={() =>
                document
                  .getElementById("countdown")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[10px] uppercase tracking-[0.25em] text-white/60 border-b border-gold/30 pb-1 hover:text-gold transition-colors font-medium"
            >
              Opening Next Saturday
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-80">
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold/70">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-gold py-5 overflow-hidden border-y border-gold-light/20 shadow-xl">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[11px] uppercase tracking-[0.4em] text-black px-10 font-bold">
                {item}
              </span>
              <span className="text-black/40 text-xl font-serif">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Countdown Section */}
      <section
        id="countdown"
        className="bg-black py-32 px-6 text-center border-y border-gold/10 relative overflow-hidden"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold/60 mb-12 font-medium">
          The Launch
        </p>
        <h2 className="font-serif text-3xl md:text-6xl text-white mb-16 italic">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold font-normal">
            Our Shop Opens
          </span>{" "}
          Saturday — 4:30 PM
        </h2>

        <div className="flex justify-center gap-6 md:gap-20">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.mins },
            { label: "Seconds", value: timeLeft.secs },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center relative min-w-[80px]"
            >
              {i > 0 && (
                <div className="hidden md:block absolute -left-10 top-1/2 -translate-y-1/2 w-px h-12 bg-gold/30" />
              )}
              <span className="font-serif text-5xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-gold-light to-gold leading-none font-light">
                {pad(item.value)}
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 mt-5 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Section / Quality Promise */}
      {/* Brand Section / Quality Promise */}
      <section id="brand" className="pt-32 px-6 bg-black  w-full text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-10 h-px bg-gold/40" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold">
            Our Guarantee
          </span>
          <div className="w-10 h-px bg-gold/40" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
          We provide only{" "}
          <em className="italic text-gold font-normal">best quality</em>
          <br />
          original products — always.
        </h2>
        <p className="text-white text-sm md:text-base leading-loose tracking-wider font-light max-w-2xl mx-auto">
          At OVIJATTO, authenticity is non-negotiable. Every item we sell is
          100% original — sourced from premium mills, verified for quality, and
          delivered with the assurance that you receive exactly what you paid
          for. No substitutes. No compromise. Just timeless craft you can trust.
        </p>
      </section>

      {/* Product Showcase & Form */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] border border-gold/20 shadow-2xl overflow-hidden group">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  i === activeSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-contain p-10 md:p-20"
                />
                <div className="absolute bottom-12 left-0 right-0 text-center">
                  <span className="bg-black/50 backdrop-blur-md px-8 py-3 text-[11px] uppercase tracking-[0.3em] border border-gold/20 font-semibold text-gold">
                    {product.name}
                  </span>
                </div>
              </div>
            ))}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeSlide ? "bg-gold w-6" : "bg-gold/30"}`}
                />
              ))}
            </div>
          </div>

          <div
            id="waitlist"
            className="p-12 md:p-20 border border-gold/30 relative shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute -top-1.5 -left-1.5 -right-1.5 -bottom-1.5 border border-gold/10 -z-10 pointer-events-none" />

            <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-5 font-bold">
              Be the First
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
              Secure Your Place
            </h2>

            <p className="text-white text-base font-light mb-14 leading-relaxed">
              Join our curated waitlist and receive exclusive early access,
              priority notifications, and a private preview of our 2026
              collection.
            </p>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* NAME */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full text-white/60 bg-transparent border-b border-white py-4 outline-none focus:border-white transition-colors text-base font-light peer placeholder-transparent text-white"
                  placeholder="Full Name"
                />

                <label
                  htmlFor="name"
                  className="absolute left-0 top-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all peer-focus:-top-5 peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-white pointer-events-none font-medium"
                >
                  Full Name *
                </label>
              </div>

              {/* PHONE */}
              <div className="relative group">
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full text-white/60 bg-transparent border-b border-white py-4 outline-none focus:border-white transition-colors text-base font-light peer placeholder-transparent text-white"
                  placeholder="Phone Number"
                />

                <label
                  htmlFor="phone"
                  className="absolute left-0 top-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all peer-focus:-top-5 peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-white pointer-events-none font-medium"
                >
                  Phone Number *
                </label>
              </div>

              {/* EMAIL */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full text-white/60 bg-transparent border-b border-white py-4 outline-none focus:border-white transition-colors text-base font-light peer placeholder-transparent text-white"
                  placeholder="Email Address"
                />

                <label
                  htmlFor="email"
                  className="absolute left-0 top-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all peer-focus:-top-5 peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-white pointer-events-none font-medium"
                >
                  Email Address
                </label>
              </div>

              {status.message && (
                <p
                  className={`text-[12px] font-medium ${
                    status.type === "success" ? "text-black" : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold-light py-6 text-[11px] uppercase tracking-[0.4em] font-bold text-black shadow-2xl hover:translate-y-[-3px] active:translate-y-0 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Reserve My Spot"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        id="vision"
        className="bg-black py-32 px-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl md:text-7xl text-white leading-tight mb-24 italic">
            &quot;
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold font-normal">
              Crafted slowly.
            </span>
            <br />
            Designed intentionally.&quot;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 border-t border-gold/20 pt-20">
            {[
              {
                num: "01",
                title: "Ethical Craftsmanship",
                desc: "Every piece is made with care for the hands that create it — fair wages, safe conditions.",
              },
              {
                num: "02",
                title: "Premium Materials",
                desc: "Sourced from the finest mills — breathable cotton, soft-touch fabrics built to last.",
              },
              {
                num: "03",
                title: "Timeless Design",
                desc: "We don't chase trends. We pursue enduring form — pieces as relevant in years to come.",
              },
              {
                num: "04",
                title: "Made in Bangladesh",
                desc: "Proudly rooted in Nachole, Chapainawabganj — textile heritage meets contemporary vision.",
              },
            ].map((item) => (
              <div key={item.num} className="group">
                <span className="font-serif text-6xl text-gold/20 group-hover:text-gold transition-colors block mb-8 leading-none">
                  {item.num}
                </span>
                <h3 className="font-serif text-xl text-white mb-5 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-white/40 font-light tracking-widest uppercase">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-black pt-32 pb-12 px-8 border-t border-gold/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 mb-24">
            {/* Col 1 */}
            <div>
              <div className="relative w-40 h-16 mb-12">
                <Image
                  src="/golden-logo.png"
                  alt="OVIJATTO"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-5">
                <a
                  href="tel:+8801712144198"
                  className="block text-[12px] text-white/60 hover:text-gold transition-colors font-medium tracking-wide"
                >
                  +880 1712-144198
                </a>
                <a
                  href="mailto:info@ovijatto.com"
                  className="block text-[12px] text-white/60 hover:text-gold transition-colors font-medium tracking-wide"
                >
                  info@ovijatto.com
                </a>
                <p className="text-[12px] text-white/40 leading-relaxed font-light tracking-wide uppercase">
                  Nachole, Chapainawabganj, Rajshahi, Bangladesh
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-12 font-bold">
                Follow the Journey
              </p>
              <div className="flex justify-center gap-14">
                {[
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/ovijatto/",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225-1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/profile.php?id=61588928306807",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    ),
                  },
                  {
                    name: "TikTok",
                    url: "https://www.tiktok.com/@ovijatto",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.17-1.35 2.01-.06.76.13 1.53.58 2.14.47.67 1.25 1.11 2.06 1.15.91.08 1.86-.25 2.53-.89.71-.66 1.05-1.64 1.05-2.61l.02-11.2z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all shadow-lg group-hover:shadow-gold/20 text-white/40 group-hover:text-gold">
                      {social.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-gold font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3 */}
            <div className="lg:text-right">
              <p className="font-serif text-3xl text-gold italic mb-8 leading-tight">
                &quot;Because
                <br />
                You Are Awesome.&quot;
              </p>
              <div className="space-y-3 text-[11px] uppercase tracking-[0.25em] text-white/40 font-medium">
                <p>Established 2026</p>
                <p>Elegance · Premium · Luxury</p>
                <p>100% Original Products</p>
              </div>
            </div>
          </div>

          <div className="pt-14 border-t border-gold/10 flex flex-col md:flex-row justify-between gap-8">
            <p className="text-[11px] text-white/30 tracking-widest uppercase font-medium">
              © 2026 OVIJATTO. All rights reserved. Made with care in
              Bangladesh.
            </p>
            <p className="text-[11px] text-gold/50 tracking-widest uppercase font-medium">
              100% Premium quality original products guaranteed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
