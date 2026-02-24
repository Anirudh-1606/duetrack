"use client";

import { useState } from "react";
import {
  Shield,
  Smartphone,
  Eye,
  Zap,
  Link2,
  CalendarDays,
  BellRing,
  Check,
  Minus,
  ArrowRight,
  IndianRupee,
  FileSpreadsheet,
  UserX,
  Sparkles,
  Clock,
  TrendingUp,
  Plus,
  CheckCircle2,
  Lock,
  BarChart3,
} from "lucide-react";

function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clock circle - open at top-right where checkmark breaks through */}
      <path
        d="M20 4C11.16 4 4 11.16 4 20s7.16 16 16 16 16-7.16 16-16c0-2.8-.72-5.43-1.99-7.72"
        stroke="#10b981"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Clock hand at 12 o'clock */}
      <path
        d="M20 10V16"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Small dot at center of clock */}
      <circle cx="20" cy="19.5" r="1.5" fill="#10b981" />
      {/* Large checkmark overlapping the circle */}
      <path
        d="M12 20.5L18.5 27L36 8"
        stroke="#10b981"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">You&apos;re on the list!</h3>
        <p className="text-[var(--text-secondary)] text-sm">We&apos;ll reach out when DueTrack launches.</p>
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
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-emerald-500/30 transition-all text-sm"
        />
        {compact ? (
          <button
            type="submit"
            disabled={loading}
            className="cta-pulse bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap disabled:opacity-50 shrink-0"
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
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-emerald-500/30 transition-all text-sm"
          />
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[var(--text-secondary)] focus:border-emerald-500/30 transition-all text-sm appearance-none"
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
            className="w-full cta-pulse bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Joining..." : "Get Early Access"}
          </button>
          <p className="text-[var(--text-muted)] text-xs text-center">No spam. Only launch updates.</p>
        </>
      )}
    </form>
  );
}

/* Mini dashboard mockup for hero section */
function DashboardPreview() {
  const deadlines = [
    { name: "GSTR-3B", date: "Mar 20", status: "upcoming", days: 7 },
    { name: "TDS Return", date: "Mar 31", status: "upcoming", days: 18 },
    { name: "GSTR-1", date: "Mar 11", status: "filed", days: 0 },
    { name: "PF Monthly", date: "Mar 15", status: "due-soon", days: 2 },
    { name: "ESI Return", date: "Apr 15", status: "upcoming", days: 33 },
  ];

  return (
    <div className="float relative w-full max-w-sm mx-auto lg:mx-0">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Compliance Calendar</p>
            <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">March 2026</p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-[10px] text-emerald-400 font-medium">All tracked</span>
          </div>
        </div>

        {/* Deadlines list */}
        <div className="space-y-2">
          {deadlines.map((d, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  d.status === "filed" ? "bg-emerald-400" :
                  d.status === "due-soon" ? "bg-amber-400" :
                  "bg-white/20"
                }`} />
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">{d.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{d.date}</p>
                </div>
              </div>
              <div className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                d.status === "filed" ? "bg-emerald-500/10 text-emerald-400" :
                d.status === "due-soon" ? "bg-amber-500/10 text-amber-400" :
                "bg-white/[0.04] text-[var(--text-muted)]"
              }`}>
                {d.status === "filed" ? "Filed" :
                 d.status === "due-soon" ? `${d.days}d left` :
                 `${d.days}d left`}
              </div>
            </div>
          ))}
        </div>

        {/* Health score */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-[var(--text-muted)]">Compliance Score</span>
          </div>
          <span className="text-sm font-bold text-emerald-400">94/100</span>
        </div>
      </div>

      {/* Floating notification card */}
      <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 flex items-center gap-3 max-w-[220px]">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
          <BellRing className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--text-primary)]">PF due in 2 days</p>
          <p className="text-[9px] text-[var(--text-muted)]">WhatsApp alert sent</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl border-b border-white/[0.04]" style={{ background: 'rgba(9, 9, 10, 0.7)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">DueTrack</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block">Features</a>
            <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block">Pricing</a>
            <a href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block">FAQ</a>
            <a href="#waitlist" className="bg-white/[0.08] hover:bg-white/[0.12] text-[var(--text-primary)] text-sm font-medium px-4 py-2 rounded-lg transition-all border border-white/[0.06] flex items-center gap-1.5">
              Join Waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pb-28 px-6 aurora overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="max-w-6xl mx-auto relative">
          <div className="lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">
            {/* Left column - Text */}
            <div className="lg:col-span-3 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 relative badge-pulse mb-8">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Launching Soon
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
                <span className="gradient-text-white block">Your CA filed</span>
                <span className="gradient-text-white block">everything on time.</span>
                <span className="hero-serif text-emerald-400 block mt-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                  Or did they?
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                47 compliance deadlines a year. Zero visibility into what&apos;s filed.
                DueTrack gives you <span className="text-[var(--text-primary)] font-medium">one dashboard</span> for
                GST, TDS, PF, ESI, ROC &mdash; with WhatsApp alerts before every deadline.
              </p>

              <div className="max-w-md mx-auto lg:mx-0">
                <WaitlistForm compact />
              </div>

              <p className="text-[var(--text-muted)] text-xs mt-4 lg:text-left text-center">
                Free forever plan &middot; No credit card &middot; Setup in 2 minutes
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-10 mt-12 pt-8 border-t border-white/[0.04]">
                {[
                  { value: "14M+", label: "GST businesses in India" },
                  { value: "47+", label: "Deadlines per year" },
                  { value: "₹50K+", label: "Avg penalty cost" },
                ].map((s, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">{s.value}</div>
                    <div className="text-[11px] text-[var(--text-muted)] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - Dashboard preview */}
            <div className="lg:col-span-2 mt-16 lg:mt-0">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Problem - Bento Grid */}
      <section className="py-24 px-6 section-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Compliance shouldn&apos;t feel like this
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: IndianRupee,
                title: "Missed deadlines = real money lost",
                desc: "Late GSTR-3B filing: ₹50/day. Late GSTR-1: ₹200/day. Late annual return: ₹100/day. It adds up to ₹50K+ per year for most businesses.",
                accent: true,
              },
              {
                icon: Eye,
                title: "Paying your CA blindly",
                desc: "You pay ₹10K/month but have zero proof anything was filed. No dashboard. No status. Just trust.",
                accent: false,
              },
              {
                icon: FileSpreadsheet,
                title: "Spreadsheets can't handle 47 deadlines",
                desc: "GST, TDS, PF, ESI, ROC — each with different dates, forms, and rules. Excel breaks. You miss things.",
                accent: false,
              },
              {
                icon: UserX,
                title: "ClearTax left you behind",
                desc: "They raised $75M and moved upmarket. Small businesses? Dropped. You need an alternative built for you.",
                accent: true,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`reveal glass-card rounded-2xl p-7 transition-all ${
                    item.accent
                      ? "bg-gradient-to-br from-emerald-500/[0.04] to-transparent !border-emerald-500/10"
                      : ""
                  }`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="icon-box mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-2 text-lg">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="features" className="py-24 px-6 section-divider glow-subtle overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Three steps to compliance clarity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter your GSTIN",
                desc: "We auto-detect your business type, state, and every compliance obligation that applies to you.",
                icon: Link2,
              },
              {
                step: "02",
                title: "See every deadline",
                desc: "One unified calendar. Color-coded: green (filed), amber (upcoming), red (overdue). All compliance types.",
                icon: CalendarDays,
              },
              {
                step: "03",
                title: "Get alerted on WhatsApp",
                desc: "7 days before. 1 day before. On your phone, via WhatsApp. Never scramble last-minute again.",
                icon: BellRing,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative reveal" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="step-number text-7xl font-extrabold absolute -top-3 -left-1">{item.step}</div>
                  <div className="relative pt-14">
                    <div className="icon-box mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-24 px-6 section-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              Everything you need. Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Wide card */}
            <div className="md:col-span-4 border-gradient shimmer p-8 rounded-2xl reveal">
              <div className="relative z-10">
                <div className="icon-box icon-box-lg mb-6">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Save ₹50,000+ per year in penalties</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
                  The average Indian SMB loses ₹20K-80K/year to late filing penalties alone.
                  DueTrack ensures every deadline is tracked, every alert is sent, and every filing is on time.
                </p>
              </div>
            </div>

            {/* Narrow tall card */}
            <div className="md:col-span-2 glass-card p-8 rounded-2xl reveal flex flex-col justify-between" style={{ animationDelay: '100ms' }}>
              <div>
                <div className="icon-box mb-5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Mobile-first</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Built for how you actually work — on your phone, between meetings.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-emerald-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Works offline too</span>
              </div>
            </div>

            {/* Narrow card */}
            <div className="md:col-span-2 glass-card p-8 rounded-2xl reveal" style={{ animationDelay: '150ms' }}>
              <div className="icon-box mb-5">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">CA transparency</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Invite your CA. They mark filings done. You see proof. Both accountable.
              </p>
            </div>

            {/* Wide card */}
            <div className="md:col-span-4 glass-card p-8 rounded-2xl reveal" style={{ animationDelay: '200ms' }}>
              <div className="flex items-start gap-6">
                <div className="icon-box icon-box-lg shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Always current. Always accurate.</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-lg">
                    Government changes rules constantly. We update deadlines instantly.
                    New GST form? Updated. Deadline extended? Reflected. You never check CBIC again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 section-divider glow-subtle overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white">
              DueTrack vs. the alternatives
            </h2>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden reveal">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-5 px-6 text-left text-[var(--text-muted)] font-medium text-xs uppercase tracking-wider">Feature</th>
                  <th className="py-5 px-4 text-center">
                    <span className="text-emerald-400 font-bold text-sm">DueTrack</span>
                  </th>
                  <th className="py-5 px-4 text-center text-[var(--text-muted)] font-medium">ClearTax</th>
                  <th className="py-5 px-4 text-center text-[var(--text-muted)] font-medium hidden sm:table-cell">Tally</th>
                  <th className="py-5 px-4 text-center text-[var(--text-muted)] font-medium hidden sm:table-cell">Zoho</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Unified compliance", dt: true, ct: "GST only", ta: "GST only", zo: "GST only" },
                  { feature: "WhatsApp alerts", dt: true, ct: false, ta: false, zo: false },
                  { feature: "CA collaboration", dt: true, ct: false, ta: false, zo: false },
                  { feature: "Mobile-first", dt: true, ct: false, ta: false, zo: "partial" },
                  { feature: "Free tier", dt: true, ct: false, ta: false, zo: true },
                  { feature: "Serves small biz", dt: true, ct: "Dropped", ta: "Complex", zo: true },
                  { feature: "Starting price", dt: "₹0", ct: "₹9K/yr", ta: "₹18K", zo: "₹749/mo" },
                ].map((row, i) => (
                  <tr key={i} className="comparison-row border-b border-white/[0.03] last:border-0">
                    <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {row.dt === true ? (
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-emerald-400 font-semibold">{row.dt}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.ct === false ? (
                        <Minus className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : row.ct === true ? (
                        <Check className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : (
                        <span className="text-[var(--text-muted)]">{row.ct}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center hidden sm:table-cell">
                      {row.ta === false ? (
                        <Minus className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : row.ta === true ? (
                        <Check className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : (
                        <span className="text-[var(--text-muted)]">{row.ta}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center hidden sm:table-cell">
                      {row.zo === false ? (
                        <Minus className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : row.zo === true ? (
                        <Check className="w-4 h-4 text-[var(--text-muted)] mx-auto" />
                      ) : row.zo === "partial" ? (
                        <span className="text-[var(--text-muted)]">~</span>
                      ) : (
                        <span className="text-[var(--text-muted)]">{row.zo}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 section-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white mb-3">
              Start free. Scale when ready.
            </h2>
            <p className="text-[var(--text-secondary)]">No hidden fees. No surprises. Cancel anytime.</p>
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
                icon: Clock,
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
                icon: TrendingUp,
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
                icon: BarChart3,
              },
            ].map((plan, i) => {
              const PlanIcon = plan.icon;
              return (
                <div
                  key={i}
                  className={`reveal relative rounded-2xl p-7 transition-all ${
                    plan.highlighted
                      ? "border-gradient bg-emerald-500/[0.03]"
                      : "glass-card"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-1">
                    <PlanIcon className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">{plan.price}</span>
                    <span className="text-[var(--text-muted)] text-sm ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-sm text-[var(--text-secondary)] flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.highlighted
                        ? "cta-pulse bg-emerald-500 hover:bg-emerald-400 text-black"
                        : "bg-white/[0.05] hover:bg-white/[0.08] text-[var(--text-primary)] border border-white/[0.08]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 section-divider glow-subtle overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16 reveal">
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
              <details key={i} className="group reveal glass-card rounded-xl overflow-hidden" style={{ animationDelay: `${i * 60}ms` }}>
                <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-medium text-[var(--text-primary)] hover:text-emerald-400 transition-colors">
                  {item.q}
                  <Plus className="w-4 h-4 shrink-0 text-[var(--text-muted)] group-open:rotate-45 transition-transform duration-200" />
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / trust strip */}
      <section className="py-16 px-6 section-divider">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 sm:p-10 reveal">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <Lock className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Bank-grade security</p>
                <p className="text-xs text-[var(--text-muted)]">256-bit encryption. SOC2 compliant infrastructure.</p>
              </div>
              <div>
                <Clock className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">2-minute setup</p>
                <p className="text-xs text-[var(--text-muted)]">Enter your GSTIN. See deadlines instantly. No onboarding calls.</p>
              </div>
              <div>
                <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Built for India</p>
                <p className="text-xs text-[var(--text-muted)]">Every compliance rule. Every state. Updated in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-24 px-6 section-divider">
        <div className="max-w-xl mx-auto text-center reveal">
          <div className="icon-box icon-box-lg mx-auto mb-6">
            <BellRing className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text-white mb-3">
            Stop wondering. Start knowing.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10">
            Join the waitlist and be first to see your compliance health score.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 section-divider">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={22} />
            <span className="text-sm font-semibold text-[var(--text-secondary)]">DueTrack</span>
            <span className="text-[var(--text-muted)] text-xs">by cipher.build</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Features</a>
            <a href="#pricing" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Pricing</a>
            <a href="#faq" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">FAQ</a>
          </div>
          <p className="text-[var(--text-muted)] text-xs">&copy; 2026 DueTrack. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
