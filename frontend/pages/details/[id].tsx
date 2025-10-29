import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Experience } from '../../lib/api'
import { FiCalendar } from 'react-icons/fi' // You'll need to install react-icons

export default function Details() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)

  // --- NEW STATE for date and time selection ---
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  useEffect(() => {
    if (typeof id === 'string') {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL || ''}/experiences/${id}`)
        .then(res => {
          setData(res.data)
          // Pre-select the first available date if it exists
          if (res.data.availableDates?.length) {
            setSelectedDate(res.data.availableDates[0])
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <p className="p-6 text-center">Loading...</p>
  if (!data) return <p className="p-6 text-center">Experience not found.</p>

  // --- LOGIC to determine date and time choices ---
  // Generate next 5 days if no specific dates are provided from backend
  const next5Days = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d.toISOString().slice(0, 10)
  })

  const dateChoices = data.availableDates?.length ? data.availableDates : next5Days
  const timeChoices = data.availableTimes || ['09:00', '11:00', '14:00', '17:00'] // Fallback times

  // Construct the final slot string for checkout
  const finalSlot = selectedDate && selectedTime ? `${selectedDate} ${selectedTime}` : null

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to all experiences</Link>
      
      {/* --- NEW Two-Column Layout --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Image */}
        <div>
          <img src={data.image} alt={data.title} className="w-full h-80 object-cover rounded-lg shadow-md" />
        </div>

        {/* Column 2: Details, Date, Time, and Booking */}
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-lg text-gray-600 mt-2">₹{data.price}</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Date</h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {dateChoices.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 text-sm rounded-md border transition-colors ${selectedDate === date ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-100'}`}
                >
                  {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                </button>
              ))}
              <label className="relative cursor-pointer p-2.5 rounded-md border hover:bg-gray-100">
                <FiCalendar className="h-5 w-5 text-gray-500" />
                <input 
                  type="date"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => setSelectedDate(e.target.value)}
                  value={selectedDate || ''} 
                />
              </label>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Time</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {timeChoices.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 text-sm rounded-md border transition-colors ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-100'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="font-semibold text-xl">Total: ₹{data.price}</p>
            <Link 
              href={finalSlot ? `/checkout?expId=${data.id}&slot=${encodeURIComponent(finalSlot)}` : '#'}
              passHref
              legacyBehavior
            >
              <a
                className={`block text-center mt-4 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg transition-all ${!finalSlot ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={(e) => !finalSlot && e.preventDefault()}
              >
                Book Now
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-bold">About this experience</h2>
        <p className="text-gray-700 mt-4 leading-relaxed">{data.description}</p>
      </div>
    </main>
  )
}