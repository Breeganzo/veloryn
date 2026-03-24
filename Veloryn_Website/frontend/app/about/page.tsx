import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, LineChart, Target } from 'lucide-react'
import { SiteFooter, SiteNavigation } from '../components/site-chrome'

export const metadata: Metadata = {
  title: 'About | Veloryn',
  description: 'Learn how Veloryn helps small and medium businesses turn customer behavior into clear, practical decisions.',
}

const principles = [
  {
    title: 'Explainable AI',
    description: 'Predictions alone are not enough. Veloryn focuses on why customers behave the way they do.',
    icon: Brain,
  },
  {
    title: 'Decision-Ready Insights',
    description: 'The product is designed to help teams choose the next action, not just read another dashboard.',
    icon: Target,
  },
  {
    title: 'Built for SMBs',
    description: 'The experience is shaped around smaller operating teams that need useful answers quickly.',
    icon: LineChart,
  },
]

export default function AboutPage() {
  return (
    <>
      <SiteNavigation />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 pt-24">
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
              About Veloryn
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-6xl">
              Practical customer intelligence for growing businesses
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
              Veloryn helps small and medium businesses understand who will convert, why customers churn,
              and where to invest next. The goal is simple: make advanced analytics usable for teams that need
              clarity, not complexity.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {principles.map((item) => (
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
            <h2 className="text-3xl font-bold">What Veloryn is building</h2>
            <p className="mt-4 text-lg text-gray-300">
              The platform combines prediction, causal analysis, segmentation, and business recommendations
              into a workflow that is easier to act on. Instead of forcing teams to stitch together multiple tools,
              Veloryn brings the key questions into one product.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/demo" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-purple-700 transition hover:bg-gray-100">
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Contact the Team
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
