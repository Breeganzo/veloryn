'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle, Coffee, Scissors, TrendingUp, Dumbbell } from 'lucide-react'

export default function DemoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    monthly_customers: '',
    current_challenges: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const payload = {
      ...formData,
      monthly_customers: formData.monthly_customers
        ? Number(formData.monthly_customers)
        : null,
      current_challenges: formData.current_challenges || null,
    }

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setIsSubmitted(true)
        return
      }

      setErrorMessage('Demo requests are not reaching the backend right now. Check the deployment and try again.')
    } catch (error) {
      setErrorMessage('Demo requests are not reaching the backend right now. Check the deployment and try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Demo Request Received!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your interest in PipelinePilot AI. Our team will reach out within 24 hours to schedule your personalized demo.
          </p>
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Veloryn</span>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <Link href="/" className="text-purple-600 hover:text-purple-700 flex items-center mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              See PipelinePilot AI
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                In Action
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Get a personalized walkthrough of how PipelinePilot AI can help your business predict, explain, and act on customer behavior.
            </p>

            <div className="space-y-6 mb-8">
              <h3 className="font-semibold text-gray-900">In your demo, you'll see:</h3>
              <ul className="space-y-3">
                {[
                  'How SEM finds CAUSAL drivers of conversion',
                  'The 4-segment uplift model in action',
                  'SHAP explanations for individual predictions',
                  'Revenue impact calculations for your business',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Industries We Serve</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Cafes', icon: Coffee },
                  { name: 'Salons', icon: Scissors },
                  { name: 'Agencies', icon: TrendingUp },
                  { name: 'Fitness', icon: Dumbbell },
                ].map((ind, i) => (
                  <div key={i} className="flex items-center text-gray-600">
                    <ind.icon className="w-5 h-5 text-purple-600 mr-2" />
                    {ind.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Your Demo</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="">Select your industry</option>
                  <option value="cafe">Cafe / Restaurant</option>
                  <option value="salon">Salon / Spa</option>
                  <option value="agency">Marketing Agency</option>
                  <option value="fitness">Fitness Studio / Gym</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Customers/Leads
                </label>
                <input
                  type="number"
                  value={formData.monthly_customers}
                  onChange={(e) => setFormData({ ...formData, monthly_customers: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="e.g., 500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Challenges (Optional)
                </label>
                <textarea
                  value={formData.current_challenges}
                  onChange={(e) => setFormData({ ...formData, current_challenges: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  rows={3}
                  placeholder="Tell us about your current challenges with customer retention or lead conversion..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
              >
                Request Demo
                <Send className="w-5 h-5 ml-2" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our Privacy Policy. We'll never spam you.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
