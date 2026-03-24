import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Briefcase, Users, Zap } from 'lucide-react'
import { SiteFooter, SiteNavigation } from '../components/site-chrome'

export const metadata: Metadata = {
  title: 'Careers | Veloryn',
  description: 'Career opportunities at Veloryn.',
}

const values = [
  {
    title: 'Ownership',
    description: 'Small teams work best when people can carry ideas from concept to delivery.',
    icon: Briefcase,
  },
  {
    title: 'Customer Focus',
    description: 'Product and engineering decisions should make life easier for the businesses using the product.',
    icon: Users,
  },
  {
    title: 'Execution',
    description: 'Velocity matters, but only when it produces something reliable and useful.',
    icon: Zap,
  },
]

export default function CareersPage() {
  return (
    <>
      <SiteNavigation />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-24">
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Careers
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Build products that help SMBs make better decisions
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Veloryn is not hiring for specific open roles right now, but the page is now live and ready.
              If you are strong in product, engineering, or applied AI and want to contribute, you can still reach out.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-8 shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-4 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gray-900 px-8 py-12 text-white md:px-12">
            <h2 className="text-3xl font-bold">No open roles listed today</h2>
            <p className="mt-4 text-lg text-gray-300">
              That does not prevent good conversations. If you think you are a strong fit for the problem space,
              send a short intro and your background.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="mailto:ceo@veloryn.dev" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-gray-100">
                Email Veloryn
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
