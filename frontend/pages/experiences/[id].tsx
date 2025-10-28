import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api, Experience } from '../../lib/api'

export default function ExperienceDetails() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    api.getExperience(id as string)
      .then(exp => setData(exp))
      .catch(err => {
        console.error(err)
        setError('Failed to load experience')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>
  if (!data) return <p className="p-4">Not found</p>

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Link href="/" className="text-blue-600 mb-4 inline-block">&larr; Back to Home</Link>
      <img src={data.image} alt={data.title} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
      <p className="text-gray-700 mt-2">{data.description}</p>
      <div className="mt-4 text-xl font-semibold">₹{data.price}</div>

      <h3 className="mt-6 font-semibold text-lg">Available Slots</h3>
      {data.availableSlots && data.availableSlots.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {data.availableSlots.map((slot, i) => (
            <li key={i} className="p-3 bg-white rounded shadow flex justify-between items-center">
              <div className="text-gray-800">{slot}</div>
              <Link 
                href={`/checkout?expId=${data.id}&slot=${encodeURIComponent(slot)}`} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Book
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-2">No available slots</p>
      )}
    </main>
  )
}
