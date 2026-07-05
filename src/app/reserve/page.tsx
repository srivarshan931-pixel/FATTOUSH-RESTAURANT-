"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield } from "lucide-react";
import { submitReservation } from "@/app/actions";

export default function ReservePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
    type: "Dining",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const result = await submitReservation(data);
      if (!result.success) {
        setError(result.error || "An unexpected error occurred. Please try again.");
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-forest-deep flex items-center justify-center px-4 py-28">
      <div className="max-w-3xl w-full mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col gap-3 mb-14 items-center text-center">
          <span className="text-xs text-gold-warm tracking-[0.3em] font-sans font-bold uppercase">
            RESERVATIONS
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-black text-white tracking-widest">
            SECURE A TABLE
          </h1>
          <p className="text-xs text-gold-pale/60 tracking-widest uppercase font-sans mt-2">
            For Fine Dining, Catering, & Banquet Halls
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-forest-dark/40 backdrop-blur-md p-8 md:p-12 border border-white/10 rounded-sm shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-forest-deep border border-white/10 text-white placeholder-white/25 px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full bg-forest-deep border border-white/10 text-white placeholder-white/25 px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                />
              </div>

              {/* Reservation Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="type" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Reservation Type
                </label>
                <select
                  id="type"
                  name="reservationType"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                >
                  <option value="Dining">Dining</option>
                  <option value="Buffet">Buffet</option>
                  <option value="Outdoor Catering">Outdoor Catering</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col gap-2">
                <label htmlFor="time" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Select Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors cursor-pointer"
                />
              </div>

              {/* Guest Count */}
              <div className="flex flex-col gap-2">
                <label htmlFor="guests" className="text-[10px] font-sans tracking-[0.25em] text-gold-warm font-bold uppercase">
                  Guests Count
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guestsCount"
                  min="1"
                  max="100"
                  required
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-forest-deep border border-white/10 text-white px-4 py-3.5 text-sm tracking-widest focus:outline-none focus:border-gold-warm rounded-sm transition-colors"
                />
              </div>

              {/* Just keep the reservation secure */}
              <div className="md:col-span-2 flex items-start gap-3 p-4 bg-forest-deep border border-gold-warm/15 rounded-sm">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="keepSecure"
                    id="keepSecure"
                    value="true"
                    defaultChecked
                    className="h-4 w-4 bg-forest-deep border-white/10 text-gold-warm focus:ring-0 focus:ring-offset-0 rounded-sm cursor-pointer accent-gold-warm"
                  />
                </div>
                <label htmlFor="keepSecure" className="text-xs font-sans leading-normal text-gold-pale/80 cursor-pointer select-none">
                  <span className="font-bold text-gold-warm tracking-wider flex items-center gap-1.5 uppercase">
                    <Shield className="w-4 h-4 text-gold-warm inline" /> Just keep the reservation secure
                  </span>
                  Lock in and safeguard this table booking instantly with our priority verification protocol.
                </label>
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-950/30 border border-red-500/30 text-red-200 text-xs font-sans tracking-wide rounded-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 px-8 py-4 bg-gold-warm text-forest-dark text-xs tracking-[0.25em] font-sans font-bold hover:bg-white hover:text-forest-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 rounded-sm cursor-pointer uppercase shadow-lg"
            >
              {isLoading ? "Sending..." : "Send Reservation"}
            </button>
          </form>
        ) : (
          /* Success */
          <div className="flex flex-col items-center gap-6 bg-forest-dark/40 backdrop-blur-md p-12 border border-white/15 rounded-sm shadow-2xl text-center">
            <CheckCircle2 className="w-16 h-16 text-gold-warm animate-bounce" />
            <h3 className="font-display text-2xl font-black text-white tracking-widest uppercase">
              REQUEST RECEIVED
            </h3>
            <p className="text-sm text-gold-pale/85 max-w-md font-sans leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Your reservation request for a <strong>{formData.type}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong> (for <strong>{formData.guests} guests</strong>) has been registered.
            </p>
            <div className="w-full h-[1px] bg-gold-warm/25 my-2" />
            <p className="text-[10px] text-gold-warm font-sans tracking-[0.2em] uppercase">
              A coordinator will contact you at {formData.phone} shortly.
            </p>
            <Link
              href="/"
              className="mt-4 px-6 py-2.5 bg-transparent border border-white text-white text-[10px] tracking-[0.2em] font-sans font-bold hover:bg-white hover:text-forest-dark transition-colors duration-500 rounded-sm uppercase"
            >
              Back to Home
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
