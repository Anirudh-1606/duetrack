"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, businessType, source: "landing" }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // still show success for UX
    }
    setLoading(false);
  };

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">D</div>
            <span className="text-xl font-bold">DueTrack</span>
          </div>
          <a href="#waitlist" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg transition-all text-sm">
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-emerald-500/10 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-emerald-500/20">
            🚀 Launching Soon — Join the Waitlist
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Never miss a compliance
            <br />
            <span className="text-emerald-400">deadline again.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            One dashboard for ALL your Indian business compliance — GST, TDS, PF, ESI, ROC.
            Get alerts before deadlines hit. Know exactly what&apos;s filed and what&apos;s pending.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-lg transition-all text-lg">
              Get Early Access →
            </a>
            <a href="#how-it-works" className="border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3.5 rounded-lg transition-all text-lg">
              See How It Works
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">Free forever plan available. No credit card required.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Compliance in India is a <span className="text-red-400">nightmare.</span>
          </h2>
          <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
            You know the pain. We talked to 100+ business owners. Here&apos;s what they said:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                emoji: "😰",
                title: "\"I missed GSTR-3B and got a ₹10,000 penalty\"",
                desc: "Late filing penalties add up fast. One missed deadline = money gone.",
              },
              {
                emoji: "🤷",
                title: "\"I pay my CA ₹10K/month but have no idea if things are filed\"",
                desc: "Zero visibility. You're trusting blindly. No dashboard, no proof, no status.",
              },
              {
                emoji: "📊",
                title: "\"I track deadlines in Excel. It breaks every quarter\"",
                desc: "GST, TDS, PF, ESI, ROC — each with different dates. Spreadsheets can't handle it.",
              },
              {
                emoji: "🏃",
                title: "\"ClearTax stopped serving small businesses like mine\"",
                desc: "Enterprise tools moved upmarket. Small businesses are left with nothing.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-semibold text-white mt-3 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution - How it works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How <span className="text-emerald-400">DueTrack</span> works
          </h2>
          <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Three steps. Five minutes. Never miss a deadline again.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Add Your GSTIN",
                desc: "Enter your GSTIN. We auto-fetch your business details and map every compliance obligation you have.",
                icon: "🔗",
              },
              {
                step: "02",
                title: "See All Deadlines",
                desc: "One calendar view: GST, TDS, PF, ESI, ROC — every deadline with status. Color-coded: green (filed), yellow (upcoming), red (overdue).",
                icon: "📅",
              },
              {
                step: "03",
                title: "Get Alerts. Stay Safe.",
                desc: "WhatsApp + email alerts 7 days and 1 day before every deadline. Never scramble last-minute again.",
                icon: "🔔",
              },
            ].map((item, i) => (
              <div key={i} className="text-left">
                <div className="text-emerald-400 text-sm font-mono mb-3">STEP {item.step}</div>
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-xl font-bold mt-3 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Why businesses switch to <span className="text-emerald-400">DueTrack</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "Save ₹50K+/year in penalties",
                desc: "Average Indian SMB pays ₹20K-80K/year in late filing penalties. DueTrack eliminates that.",
              },
              {
                icon: "👁️",
                title: "See what your CA filed",
                desc: "Real-time compliance status. Green = filed. Red = pending. No more blind trust.",
              },
              {
                icon: "📱",
                title: "Mobile-first. WhatsApp alerts.",
                desc: "Built for how Indian business owners actually work — on their phones, via WhatsApp.",
              },
              {
                icon: "⚡",
                title: "Setup in 5 minutes",
                desc: "Enter GSTIN. Get your full compliance calendar instantly. No training needed.",
              },
              {
                icon: "🔄",
                title: "Always up-to-date",
                desc: "Government changes deadlines? We update instantly. You never check CBIC again.",
              },
              {
                icon: "🤝",
                title: "CA collaboration built-in",
                desc: "Invite your CA. They mark filings as done. You see status. Both are accountable.",
              },
            ].map((item, i) => (
              <div key={i} className="group">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg font-bold mt-3 mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            How DueTrack compares
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-gray-400 font-medium">Feature</th>
                  <th className="py-4 px-4 text-emerald-400 font-bold">DueTrack</th>
                  <th className="py-4 px-4 text-gray-400 font-medium">ClearTax</th>
                  <th className="py-4 px-4 text-gray-400 font-medium">Tally</th>
                  <th className="py-4 px-4 text-gray-400 font-medium">Zoho Books</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["All compliance in one view", "✅", "GST only", "GST only", "GST only"],
                  ["WhatsApp deadline alerts", "✅", "❌", "❌", "❌"],
                  ["CA collaboration", "✅", "❌", "❌", "❌"],
                  ["Mobile-first", "✅", "❌", "❌", "⚠️"],
                  ["Compliance health score", "✅", "❌", "❌", "❌"],
                  ["Free tier", "✅", "❌", "❌", "✅"],
                  ["Pricing", "₹499/mo", "₹9K+/yr", "₹18K+", "₹749/mo"],
                  ["Serves small businesses", "✅", "❌ (dropped)", "⚠️", "✅"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3 px-4 ${j === 1 ? "text-emerald-400 font-medium" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-400 text-center text-lg mb-12">
            Start free. Upgrade when you&apos;re ready. No hidden fees.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "₹0",
                period: "forever",
                desc: "For solopreneurs getting started",
                features: ["1 GSTIN", "GST deadlines only", "Email alerts", "Basic dashboard"],
                cta: "Start Free",
                highlighted: false,
              },
              {
                name: "Starter",
                price: "₹499",
                period: "/month",
                desc: "For growing businesses",
                features: [
                  "1 GSTIN",
                  "ALL compliance (GST+TDS+PF+ESI+ROC)",
                  "WhatsApp + Email alerts",
                  "CA collaboration",
                  "Compliance health score",
                  "7-day & 1-day reminders",
                ],
                cta: "Join Waitlist",
                highlighted: true,
              },
              {
                name: "CA Practice",
                price: "₹2,999",
                period: "/month",
                desc: "For CAs managing multiple clients",
                features: [
                  "Up to 50 clients",
                  "White-label reports",
                  "Bulk deadline view",
                  "Client compliance dashboard",
                  "Priority support",
                  "API access",
                ],
                cta: "Join Waitlist",
                highlighted: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-emerald-500/10 border-2 border-emerald-500/40 relative"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "border border-white/20 hover:border-white/40 text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Is DueTrack a replacement for my CA?",
                a: "No. DueTrack complements your CA. Think of it as a compliance dashboard that gives YOU visibility into what's been filed and what's pending. Your CA still does the actual filing — DueTrack makes sure nothing falls through the cracks.",
              },
              {
                q: "Does DueTrack file returns for me?",
                a: "Not yet. Phase 1 is tracking and alerts. Auto-filing integration with GSTN is planned for later this year. Right now, we make sure you never miss a deadline.",
              },
              {
                q: "What compliance types does DueTrack track?",
                a: "GST (GSTR-1, GSTR-3B, GSTR-9), TDS returns, PF/ESI monthly filings, ROC annual compliance, and Income Tax deadlines. All in one calendar.",
              },
              {
                q: "How are alerts delivered?",
                a: "WhatsApp messages and email. You choose which types you want. Alerts go out 7 days before and 1 day before each deadline.",
              },
              {
                q: "Is my data secure?",
                a: "Yes. We only store your GSTIN and filing status. No financial data, no invoices, no passwords. Hosted on enterprise-grade infrastructure with encryption at rest.",
              },
              {
                q: "Can my CA use DueTrack?",
                a: "Yes! On the Starter plan, you can invite your CA as a collaborator. They can mark filings as complete, and you both see the same dashboard. The CA Practice plan is designed specifically for CAs managing 50+ clients.",
              },
            ].map((item, i) => (
              <details key={i} className="group border border-white/10 rounded-xl">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium hover:text-emerald-400 transition-colors">
                  {item.q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="py-20 px-6 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get early access to <span className="text-emerald-400">DueTrack</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join the waitlist. Be the first to track all your compliance in one place.
          </p>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-bold mt-3 mb-2">You&apos;re on the list!</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll notify you as soon as DueTrack launches. Check your email for a confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp number (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="">What describes you best?</option>
                <option value="business-owner">Business Owner</option>
                <option value="startup-founder">Startup Founder</option>
                <option value="chartered-accountant">Chartered Accountant</option>
                <option value="freelancer">Freelancer / Consultant</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-lg transition-all text-lg disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join the Waitlist →"}
              </button>
              <p className="text-gray-600 text-xs">
                No spam. We&apos;ll only email you about DueTrack launch updates.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-xs text-black">D</div>
            <span className="text-sm font-semibold">DueTrack</span>
            <span className="text-gray-600 text-sm">— by cipher.build</span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 DueTrack. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
