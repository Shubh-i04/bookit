import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Details() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    axios.get((process.env.NEXT_PUBLIC_API_URL || '') + '/experiences/' + id)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="p-4">Loading...</p>
  if (!data) return <p className="p-4">Not found</p>

  return (
    <main className="max-w-2xl mx-auto p-4">
      <img src={data.image} alt={data.title} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
      <p className="text-gray-700 mt-2">{data.description}</p>

      <h3 className="mt-4 font-semibold">Available Slots</h3>
      <ul className="mt-2">
        {data.availableSlots?.map((s:any,i:number)=>(
          <li key={i} className="p-2 bg-white rounded my-1 flex justify-between">
            <div>{s}</div>
            <Link href={`/checkout?expId=${data.id}&slot=${encodeURIComponent(s)}`} className="text-blue-600">Book</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
