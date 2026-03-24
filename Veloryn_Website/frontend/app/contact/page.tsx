'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    request_type: 'general',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        return
      }

      setErrorMessage('Contact form is not reaching the backend right now. Check the deployment and try again.')
    } catch (error) {
      setErrorMessage('Contact form is not reaching the backend right now. Check the deployment and try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out! We'll get back to you within 24 hours.
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
        <Link href="/" className="text-purple-600 hover:text-purple-700 flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Have questions about PipelinePilot AI? Want to discuss a partnership?
              Or just want to say hi? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:ceo@veloryn.dev" className="text-purple-600 hover:text-purple-700">
                    ceo@veloryn.dev
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Bangalore, India</p>
                  <p className="text-sm text-gray-500 mt-1">Koramangala</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Answers</h3>
              <div className="space-y-4">
                {[
                  {
                    q: 'How quickly can I get started?',
                    a: 'After your demo, you can be up and running within 24-48 hours.',
                  },
                  {
                    q: 'Do I need technical skills?',
                    a: 'No! PipelinePilot AI is designed for business users. Just upload your data.',
                  },
                  {
                    q: 'Is there a free trial?',
                    a: 'Yes, all plans come with a 14-day free trial. No credit card required.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-1">{faq.q}</h4>
                    <p className="text-gray-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

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
                  Email *
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
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What can we help with? *
                </label>
                <select
                  required
                  value={formData.request_type}
                  onChange={(e) => setFormData({ ...formData, request_type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="general">General Inquiry</option>
                  <option value="demo">Request a Demo</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  rows={5}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
