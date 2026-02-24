"use client";

import { useState } from "react";

function WaitlistForm({ compact = false }: { compact?: boolean }) {
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
    } catch { /* graceful */ }
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
        <p className="text-gray-400 text-sm">We&apos;ll reach out when DueTrack launches.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${compact ? "max-w-md" : "max-w-lg"} mx-auto`}>
      <div className={compact ? "flex gap-3" : "space-y-3"}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-emerald-500/30 transition-all text-sm"
        />
        {compact ? (
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap disabled:opacity-50 shrink-0"
          >
            {loading ? "..." : "Join Waitlist"}
          </button>
        ) : null}
      </div>
      {!compact && (
        <>
          <input
            type="tel"
            placeholder="WhatsApp number (for launch alerts)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-emerald-500/30 transition-all text-sm"
          />
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-gray-500 focus:border-emerald-500/30 transition-all text-sm appearance-none"
          >
            <option value="">What describes you?</option>
            <option value="business-owner">Business Owner</option>
            <option value="startup-founder">Startup Founder</option>
            <option value="chartered-accountant">Chartered Accountant</option>
            <option value="freelancer">Freelancer / Consultant</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Joining..." : "Get Early Access →"}
          </button>
          <p className="text-gray-700 text-xs text-center">No spam. Only launch updates.</p>
        </>
      )}
    </form>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
              <rect width="28" height="28" rx="7" fill="#10b981" />
              <path d="M8 14.5L12 18.5L20 10.5" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-lg font-bold text-white tracking-tight">DueTrack</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Features</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Pricing</a>
            <a href="#waitlist" className="bg-white/[0.08] hover:bg-white/[0.12] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all border border-white/[0.06]">
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 glow overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 relative badge-pulse mb-8">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm">
              <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Launching Soon
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="gradient-text-white">Never miss a</span>
            <br />
            <span className="gradient-text">compliance deadline</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            One dashboard for every Indian business deadline — GST, TDS, PF, ESI, ROC. 
            Get alerts before it&apos;s too late.
          </p>

          <WaitlistForm compact />
          
          <p className="text-gray-600 text-xs mt-4">Free forever plan · No credit card · Setup in 2 minutes</p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-white/[0.04]">
            {[
              { value: "14M+", label: "GST businesses in India" },
              { value: "₹50K+", label: "Avg penalty cost/year" },
              { value: "47+", label: "Compliance deadlines/year" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem - Bento Grid */}
      <section className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Compliance shouldn&apos;t feel like this
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                emoji: "💸",
                title: "Missed deadlines = real money lost",
                desc: "Late GSTR-3B filing: ₹50/day. Late GSTR-1: ₹200/day. Late annual return: ₹100/day. It adds up to ₹50K+ per year for most businesses.",
                accent: true,
              },
              {
                emoji: "🔮",
                title: "Paying your CA blindly",
                desc: "You pay ₹10K/month but have zero proof anything was filed. No dashboard. No status. Just trust.",
              },
              {
                emoji: "📋",
                title: "Spreadsheets can't handle 47 deadlines",
                desc: "GST, TDS, PF, ESI, ROC — each with different dates, forms, and rules. Excel breaks. You miss things.",
              },
              {
                emoji: "🚪",
                title: "ClearTax left you behind",
                desc: "They raised $75M and moved upmarket. Small businesses? Dropped. You need an alternative built for you.",
                accent: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`card-glow rounded-2xl p-7 border transition-all ${
                  item.accent
                    ? "bg-gradient-to-br from-emerald-500/[0.04] to-transparent border-emerald-500/10"
                    : "bg-white/[0.02] border-white/[0.06]"
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <h3 className="font-bold text-white mt-4 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="features" className="py-24 px-6 border-t border-white/[0.04] glow-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Three steps to compliance peace of mind
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter your GSTIN",
                desc: "We auto-detect your business type, state, and every compliance obligation that applies to you.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "See every deadline",
                desc: "One unified calendar. Color-coded: green (filed), amber (upcoming), red (overdue). All compliance types.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Get alerted on WhatsApp",
                desc: "7 days before. 1 day before. On your phone, via WhatsApp. Never scramble last-minute again.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-emerald-500/30 text-6xl font-extrabold absolute -top-2 -left-1">{item.step}</div>
                <div className="relative pt-12">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large card */}
            <div className="md:col-span-2 border-gradient shimmer p-8 rounded-2xl">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <span className="text-lg">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Save ₹50,000+ per year in penalties</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  The average Indian SMB loses ₹20K-80K/year to late filing penalties alone. 
                  DueTrack ensures every deadline is tracked, every alert is sent, and every filing is on time.
                </p>
              </div>
            </div>

            {/* Small card */}
            <div className="bg-white/[0.02] border border-white/[0.06] p-8 rounded-2xl card-glow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <span className="text-lg">📱</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mobile-first design</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Built for how you actually work — on your phone, between meetings.
              </p>
            </div>

            {/* Small card */}
            <div className="bg-white/[0.02] border border-white/[0.06] p-8 rounded-2xl card-glow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <span className="text-lg">👁️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">CA transparency</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Invite your CA. They mark filings done. You see proof. Both accountable.
              </p>
            </div>

            {/* Large card */}
            <div className="md:col-span-2 bg-white/[0.02] border border-white/[0.06] p-8 rounded-2xl card-glow">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                <span className="text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Always current. Always accurate.</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Government changes rules constantly. We update deadlines instantly. 
                New GST form? Updated. Deadline extended? Reflected. You never check CBIC again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 border-t border-white/[0.04] glow-subtle">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              DueTrack vs. the alternatives
            </h2>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-4 px-6 text-left text-gray-500 font-medium"></th>
                  <th className="py-4 px-4 text-left">
                    <span className="text-emerald-400 font-bold">DueTrack</span>
                  </th>
                  <th className="py-4 px-4 text-left text-gray-500 font-medium">ClearTax</th>
                  <th className="py-4 px-4 text-left text-gray-500 font-medium hidden sm:table-cell">Tally</th>
                  <th className="py-4 px-4 text-left text-gray-500 font-medium hidden sm:table-cell">Zoho</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Unified compliance", "✅", "GST only", "GST only", "GST only"],
                  ["WhatsApp alerts", "✅", "—", "—", "—"],
                  ["CA collaboration", "✅", "—", "—", "—"],
                  ["Mobile-first", "✅", "—", "—", "~"],
                  ["Free tier", "✅", "—", "—", "✅"],
                  ["Serves small biz", "✅", "Dropped ❌", "Complex", "✅"],
                  ["Starting price", "₹0", "₹9K/yr", "₹18K", "₹749/mo"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.03] last:border-0">
                    <td className="py-3.5 px-6 text-gray-400 font-medium">{row[0]}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium">{row[1]}</td>
                    <td className="py-3.5 px-4 text-gray-500">{row[2]}</td>
                    <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">{row[3]}</td>
                    <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white mb-3">
              Start free. Scale when ready.
            </h2>
            <p className="text-gray-400">No hidden fees. No surprises. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Free",
                price: "₹0",
                period: "forever",
                desc: "For solopreneurs",
                features: ["1 GSTIN", "GST deadlines", "Email alerts", "Basic dashboard"],
                cta: "Start Free",
                highlighted: false,
              },
              {
                name: "Starter",
                price: "₹499",
                period: "/mo",
                desc: "For growing businesses",
                features: [
                  "1 GSTIN",
                  "ALL compliance types",
                  "WhatsApp + email alerts",
                  "CA collaboration",
                  "Health score",
                  "Priority reminders",
                ],
                cta: "Join Waitlist",
                highlighted: true,
              },
              {
                name: "CA Practice",
                price: "₹2,999",
                period: "/mo",
                desc: "For CA firms",
                features: [
                  "Up to 50 clients",
                  "White-label reports",
                  "Bulk operations",
                  "Client dashboard",
                  "API access",
                  "Priority support",
                ],
                cta: "Join Waitlist",
                highlighted: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-7 transition-all ${
                  plan.highlighted
                    ? "border-gradient bg-emerald-500/[0.03]"
                    : "bg-white/[0.02] border border-white/[0.06] card-glow"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M3 7L6 10L11 4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                      : "bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.08]"
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
      <section className="py-24 px-6 border-t border-white/[0.04] glow-subtle">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">FAQ</p>
            <h2 className="text-3xl font-bold gradient-text-white">Common questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is DueTrack a replacement for my CA?",
                a: "No — it complements your CA. Think of it as a compliance dashboard that gives YOU visibility. Your CA still handles filings. DueTrack makes sure nothing slips through the cracks.",
              },
              {
                q: "Does DueTrack file returns?",
                a: "Not yet. Phase 1 is tracking and alerts. Auto-filing with GSTN integration is planned for later. Right now, we make sure you never miss a deadline.",
              },
              {
                q: "What compliance types are tracked?",
                a: "GST (GSTR-1, 3B, 9), TDS returns, PF & ESI monthly filings, ROC annual compliance, and Income Tax deadlines. Everything in one calendar.",
              },
              {
                q: "How are alerts sent?",
                a: "WhatsApp and email. You choose. Alerts fire 7 days and 1 day before each deadline. On Starter plan, you can customize timing.",
              },
              {
                q: "Is my data safe?",
                a: "We store only your GSTIN and filing status. No financial data, no invoices, no passwords. Enterprise-grade encryption.",
              },
              {
                q: "Can my CA use it too?",
                a: "Yes. Invite your CA as a collaborator on Starter plan. They mark filings complete, you see status. The CA Practice plan is built specifically for firms managing 50+ clients.",
              },
            ].map((item, i) => (
              <details key={i} className="group bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-medium text-white hover:text-emerald-400 transition-colors">
                  {item.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-24 px-6 border-t border-white/[0.04]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white mb-3">
            Ready to stop missing deadlines?
          </h2>
          <p className="text-gray-400 mb-10">
            Join the waitlist. Be first to know when DueTrack launches.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="#10b981" />
              <path d="M8 14.5L12 18.5L20 10.5" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold text-gray-400">DueTrack</span>
            <span className="text-gray-700 text-xs">by cipher.build</span>
          </div>
          <p className="text-gray-700 text-xs">© 2026 DueTrack. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
