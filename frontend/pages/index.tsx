import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Experience = {
  id: number | string
  title: string
  shortDescription: string
  price: number
  image: string
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + '/experiences')
      .then(res => setExperiences(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">BookIt — Experiences</h1>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiences.map(exp => (
          <div key={exp.id} className="bg-white rounded-lg shadow p-4">
            <img src={exp.image} alt={exp.title} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 text-lg font-medium">{exp.title}</h2>
            <p className="text-sm text-gray-600">{exp.shortDescription}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="font-semibold">₹{exp.price}</div>
              <Link href={`/details/${exp.id}`} className="text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
