import type { Metadata } from 'next'
import { TopNav } from "@/components/layout/top-nav"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Premium AI Football Predictions — Pro & Elite Plans',
  description: 'Unlock unlimited AI football predictions, high-confidence picks, predicted scorelines and expert match analysis. Plans from ₦5,000/month.',
}

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "forever",
    description: "Get started with basic predictions",
    color: "border-border",
    badge: "",
    features: ["5 predictions per day", "Basic win probability", "Today's match scores", "League standings", "News feed"],
    notIncluded: ["High-confidence picks", "AI match analysis", "Predicted scorelines", "Prediction history", "Premium insights"],
    cta: "Get Started",
    ctaStyle: "border border-border bg-card text-foreground hover:bg-secondary",
  },
  {
    name: "Pro",
    price: "₦5,000",
    period: "per month",
    description: "Perfect for serious football bettors",
    color: "border-primary",
    badge: "MOST POPULAR",
    features: ["Unlimited predictions", "Advanced win probability", "AI match analysis", "Predicted scorelines", "High-confidence picks", "Prediction history", "All leagues covered", "Email alerts"],
    notIncluded: ["VIP tips", "1-on-1 analyst support"],
    cta: "Start Pro",
    ctaStyle: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    name: "Elite",
    price: "₦12,000",
    period: "per month",
    description: "For professional analysts and tipsters",
    color: "border-amber-400",
    badge: "BEST VALUE",
    features: ["Everything in Pro", "VIP high-confidence tips", "Early predictions (24hrs ahead)", "Premium AI insights report", "1-on-1 analyst support", "API access", "White-label reports", "Priority support"],
    notIncluded: [],
    cta: "Go Elite",
    ctaStyle: "bg-amber-400 text-slate-900 hover:bg-amber-300",
  },
]

const features = [
  { name: "Daily predictions", free: "5/day", pro: "Unlimited", elite: "Unlimited" },
  { name: "Win probability", free: "Basic", pro: "Advanced", elite: "Advanced" },
  { name: "AI match analysis", free: false, pro: true, elite: true },
  { name: "Predicted scorelines", free: false, pro: true, elite: true },
  { name: "High-confidence picks", free: false, pro: true, elite: true },
  { name: "Prediction history", free: false, pro: true, elite: true },
  { name: "Email alerts", free: false, pro: true, elite: true },
  { name: "VIP tips", free: false, pro: false, elite: true },
  { name: "Early predictions", free: false, pro: false, elite: true },
  { name: "API access", free: false, pro: false, elite: true },
]

const testimonials = [
  { name: "Emeka O.", location: "Lagos", text: "PredictPro AI has completely changed how I approach football predictions. The AI analysis is incredibly accurate!", avatar: "E" },
  { name: "Kwame A.", location: "Accra", text: "Best prediction platform I've used. The confidence scores help me make smarter decisions every matchday.", avatar: "K" },
  { name: "Chidi N.", location: "Abuja", text: "The Pro plan is worth every kobo. I've seen massive improvement in my prediction accuracy since subscribing.", avatar: "C" },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">Premium Plans</span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl mb-4">Unlock AI-Powered<br />Football Predictions</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">Get access to high-confidence AI picks, detailed match analysis, and predicted scorelines for every match.</p>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-300">
            <span>✓ Cancel anytime</span>
            <span>✓ Instant access</span>
            <span>✓ Pay with Paystack</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border-2 ${plan.color} bg-card p-8 ${plan.name === "Pro" ? "shadow-lg scale-105" : ""}`}>
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold ${plan.name === "Pro" ? "bg-primary text-white" : "bg-amber-400 text-slate-900"}`}>
                  {plan.badge}
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">/{plan.period}</span>
                </div>
              </div>
              <button className={`w-full rounded-full py-3 font-semibold transition-colors mb-6 ${plan.ctaStyle}`}>{plan.cta}</button>
              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                {plan.notIncluded.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>✗</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary">Pro</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-amber-500">Elite</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.name} className={i % 2 === 0 ? "bg-card" : "bg-secondary/50"}>
                  <td className="px-6 py-3 text-sm">{f.name}</td>
                  <td className="px-6 py-3 text-center text-sm">
                    {typeof f.free === "boolean" ? <span className={f.free ? "text-green-500" : "text-muted-foreground"}>{f.free ? "✓" : "✗"}</span> : f.free}
                  </td>
                  <td className="px-6 py-3 text-center text-sm">
                    {typeof f.pro === "boolean" ? <span className={f.pro ? "text-green-500" : "text-muted-foreground"}>{f.pro ? "✓" : "✗"}</span> : f.pro}
                  </td>
                  <td className="px-6 py-3 text-center text-sm">
                    {typeof f.elite === "boolean" ? <span className={f.elite ? "text-green-500" : "text-muted-foreground"}>{f.elite ? "✓" : "✗"}</span> : f.elite}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h2 className="text-3xl font-black mb-4">Ready to Win More?</h2>
        <p className="text-muted-foreground mb-8">Join thousands of football fans using AI predictions to stay ahead.</p>
        <Link href="/sign-up" className="inline-block rounded-full bg-primary px-8 py-4 font-bold text-white hover:bg-primary/90 transition-colors">
          Start Free — Upgrade Anytime
        </Link>
      </section>
    </div>
  )
}
