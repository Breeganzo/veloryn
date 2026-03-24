import type { Metadata } from 'next'
import { SiteFooter, SiteNavigation } from '../components/site-chrome'

export const metadata: Metadata = {
  title: 'Terms of Use | Veloryn',
  description: 'Terms of use for Veloryn.',
}

const sections = [
  {
    title: 'Website use',
    body: 'The website is provided for information about Veloryn and its products. You may use it lawfully and in a way that does not interfere with normal operation.',
  },
  {
    title: 'Content',
    body: 'Product descriptions, pricing, and availability may change over time. Nothing on the site should be treated as a binding offer unless explicitly stated in writing.',
  },
  {
    title: 'Intellectual property',
    body: 'Site content, branding, and related materials remain the property of Veloryn unless otherwise noted.',
  },
  {
    title: 'No warranty',
    body: 'The website is provided on an as-is basis. Veloryn does not guarantee uninterrupted availability or that all content is free from error.',
  },
  {
    title: 'Contact',
    body: 'Questions about these terms can be sent to ceo@veloryn.dev.',
  },
]

export default function TermsPage() {
  return (
    <>
      <SiteNavigation />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-24">
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Terms of Use
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Basic terms for accessing the Veloryn website
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              These terms are a concise operating baseline for public use of the site and its content.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                <p className="mt-4 text-gray-600">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
