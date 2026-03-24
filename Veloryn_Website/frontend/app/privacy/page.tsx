import type { Metadata } from 'next'
import { SiteFooter, SiteNavigation } from '../components/site-chrome'

export const metadata: Metadata = {
  title: 'Privacy Policy | Veloryn',
  description: 'Privacy policy for Veloryn.',
}

const sections = [
  {
    title: 'Information collected',
    body: 'Veloryn may collect contact details you submit through forms on the website, along with technical usage information needed to operate and improve the service.',
  },
  {
    title: 'How information is used',
    body: 'Submitted information is used to respond to inquiries, provide demos, evaluate product interest, and support normal business operations.',
  },
  {
    title: 'Data sharing',
    body: 'Veloryn does not sell personal information. Data may be processed by service providers used for hosting, analytics, infrastructure, and communications.',
  },
  {
    title: 'Retention',
    body: 'Information is retained only as long as reasonably needed for business, legal, or operational purposes.',
  },
  {
    title: 'Requests',
    body: 'If you need access, correction, or deletion help, contact ceo@veloryn.dev and include enough detail for the request to be processed.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SiteNavigation />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-24">
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              Privacy Policy
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Privacy information for visitors and prospective customers
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              This page gives a plain-language overview of how Veloryn handles information submitted through the website.
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
