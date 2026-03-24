'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Users,
  Lightbulb,
  Mail,
  Coffee,
  Scissors,
  TrendingUp,
  Dumbbell,
  ArrowRight,
  Check,
  ChevronRight,
  Menu,
  X,
  Rocket,
  Target,
  BarChart3,
  Zap
} from 'lucide-react'

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Veloryn</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#solutions" className="text-gray-600 hover:text-purple-600 transition">Solutions</Link>
            <Link href="#features" className="text-gray-600 hover:text-purple-600 transition">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-purple-600 transition">Pricing</Link>
            <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition">Contact</Link>
            <Link href="/demo" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition">
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="#solutions" className="text-gray-600 hover:text-purple-600">Solutions</Link>
              <Link href="#features" className="text-gray-600 hover:text-purple-600">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
              <Link href="/demo" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-center">
                Request Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
          <Rocket className="w-4 h-4 mr-2" />
          Introducing PipelinePilot AI
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Stop Losing Customers.
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Start Predicting Them.
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          AI-powered analytics that tells you <strong>WHO</strong> will convert,
          <strong> WHY</strong> they convert, <strong>WHAT</strong> to improve, and
          <strong> WHO</strong> to target. Built for SMBs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/demo" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition flex items-center justify-center">
            Request a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="#features" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition">
            See How It Works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '50,000+', label: 'Customers Analyzed' },
            { value: 'Rs.2.5Cr+', label: 'Revenue Recovered' },
            { value: '94%', label: 'Prediction Accuracy' },
            { value: '4', label: 'Industries Served' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Problem Section
function ProblemSection() {
  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            SMBs Lose <span className="text-red-400">20-30%</span> Revenue
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            To lead leakage and customer churn. Because they don't know:
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { q: 'WHO will convert?', a: "Just gut feeling", icon: Users },
            { q: 'WHY do they convert?', a: "No clue", icon: Lightbulb },
            { q: 'WHAT to improve?', a: "Everything?", icon: Target },
            { q: 'WHO to target?', a: "Everyone?", icon: BarChart3 },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl p-6 text-center">
              <item.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-500 line-through">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Solution Section
function SolutionSection() {
  return (
    <section id="solutions" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            PipelinePilot AI Answers Everything
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Not just predictions. Causal explanations and actionable recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'WHO will convert?',
              description: 'GradientBoosting + SHAP predictions with 94% accuracy',
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'WHY do they convert?',
              description: 'SEM finds CAUSAL drivers, not just correlations',
              icon: Brain,
              color: 'from-purple-500 to-pink-500',
            },
            {
              title: 'WHAT to improve?',
              description: 'Key Driver Analysis shows exactly where to invest',
              icon: Target,
              color: 'from-orange-500 to-red-500',
            },
            {
              title: 'WHO to target?',
              description: 'Uplift Modeling segments customers into 4 groups',
              icon: BarChart3,
              color: 'from-green-500 to-teal-500',
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition group">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            The 4 Customer Segments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our uplift modeling identifies exactly who to target and who to avoid.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'Persuadables',
              subtitle: 'TARGET THESE',
              description: 'Customers who respond positively to your campaigns. This is where your marketing ROI lives.',
              color: 'bg-green-500',
              icon: '🎯',
            },
            {
              title: 'Sure Things',
              subtitle: 'SAVE MONEY',
              description: "They'll convert or stay anyway. Don't waste campaign budget on them.",
              color: 'bg-blue-500',
              icon: '💰',
            },
            {
              title: 'Lost Causes',
              subtitle: 'LOW PRIORITY',
              description: "Won't convert regardless of what you do. Focus resources elsewhere.",
              color: 'bg-gray-500',
              icon: '⏭️',
            },
            {
              title: 'Sleeping Dogs',
              subtitle: 'AVOID!',
              description: 'Campaigns actually make them WORSE. Targeting them backfires.',
              color: 'bg-red-500',
              icon: '⚠️',
            },
          ].map((segment, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 ${segment.color} rounded-2xl flex items-center justify-center text-3xl`}>
                  {segment.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{segment.title}</h3>
                  <span className={`inline-block px-3 py-1 ${segment.color} text-white text-xs font-bold rounded-full mt-1`}>
                    {segment.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">{segment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Industries Section
function IndustriesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for These Industries
          </h2>
          <p className="text-xl text-gray-600">
            Specialized models for 4 key SMB verticals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Cafes & Restaurants', icon: Coffee, description: 'Reduce churn, increase repeat orders', example: 'Third Wave Coffee' },
            { name: 'Salons & Spas', icon: Scissors, description: 'Boost retention, personalize offers', example: 'Bodycraft, Naturals' },
            { name: 'Marketing Agencies', icon: TrendingUp, description: 'Convert more B2B leads', example: 'Digital Growth Agency' },
            { name: 'Fitness Studios', icon: Dumbbell, description: 'Reduce membership cancellations', example: 'Cult.fit, CrossFit' },
          ].map((industry, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg transition group">
              <industry.icon className="w-12 h-12 text-purple-600 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{industry.description}</p>
              <p className="text-purple-600 text-sm font-medium">e.g., {industry.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Start small, scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              plan: 'Starter',
              price: '$49',
              period: '/month',
              features: ['Up to 500 leads/mo', 'Basic scoring', 'Email support', 'Weekly reports'],
              cta: 'Start Free Trial',
              popular: false,
            },
            {
              plan: 'Growth',
              price: '$99',
              period: '/month',
              features: ['Up to 2,000 leads/mo', 'Full SEM analysis', 'Uplift modeling', 'Priority support', 'Daily reports'],
              cta: 'Start Free Trial',
              popular: true,
            },
            {
              plan: 'Scale',
              price: '$199',
              period: '/month',
              features: ['Unlimited leads', 'Custom models', 'API access', 'Dedicated success manager', 'Real-time dashboard'],
              cta: 'Contact Sales',
              popular: false,
            },
          ].map((tier, i) => (
            <div key={i} className={`rounded-2xl p-8 ${tier.popular ? 'bg-gradient-to-br from-purple-600 to-blue-600 scale-105' : 'bg-gray-800'}`}>
              {tier.popular && (
                <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.plan}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-400 ml-1">{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className={`block text-center py-3 rounded-full font-semibold transition ${
                tier.popular
                  ? 'bg-white text-purple-600 hover:bg-gray-100'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Stop Losing Customers?
        </h2>
        <p className="text-xl opacity-90 mb-8">
          Get a personalized demo and see how much revenue you're leaving on the table.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/demo" className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition flex items-center justify-center">
            Request a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold">Veloryn</span>
            </div>
            <p className="text-gray-400 mb-4">
              Intelligence for SMBs. AI-powered analytics that help you understand customers and grow revenue.
            </p>
            <p className="text-gray-500 text-sm">Bangalore, India</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white transition">Request Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:ceo@veloryn.dev" className="hover:text-white transition">ceo@veloryn.dev</a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Want to see a demo?</p>
              <Link href="/demo" className="text-purple-400 hover:text-purple-300 transition flex items-center mt-1">
                Request Demo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Veloryn. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500 text-sm">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <IndustriesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  )
}
