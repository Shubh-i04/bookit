import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { api, Experience } from '../lib/api'

export default function Home() {
  const router = useRouter()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getExperiences()
      .then(data => setExperiences(data))
      .catch(err => {
        console.error(err)
        setError('Failed to load experiences')
      })
      .finally(() => setLoading(false))
  }, [])

  const q = (router.query.q as string)?.toLowerCase() || ''
  const filtered = useMemo(() => {
    const bySearch = (e: Experience) => !q || e.title.toLowerCase().includes(q) || e.shortDescription.toLowerCase().includes(q)
    return experiences.filter(bySearch)
  }, [experiences, q])

  return (
    <main className="py-4">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">BookIt — Experiences</h1>
      {loading && (
        <div className="mb-4 flex items-center gap-2 text-gray-600"><span className="sr-only">Loading</span><div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin"/></div>
      )}
      {error && <div className="mb-4"><span className="text-red-600 text-sm">{error}</span></div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map(exp => (
          <div key={exp.id} className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-lg hover:scale-[1.02] transition-transform">
            <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover rounded-t-2xl" />
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900">{exp.title}</h2>
              <p className="mt-1 text-sm text-gray-600">{exp.shortDescription}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="font-semibold text-gray-900">₹{exp.price}</div>
                <Link href={`/experiences/${exp.id}`} className="text-blue-600 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">View</Link>
              </div>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <div className="col-span-full text-sm text-gray-600">No experiences found.</div>
        )}
      </div>
    </main>
  )
}
