import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { api, Experience } from '../../lib/api'

// Define a type for our time slots for better type safety
interface TimeSlot {
  time: string;
  soldOut?: boolean;
  left?: number;
}

export default function ExperienceDetails() {
  // ===================================================================
  // All hooks MUST be at the top level of the component
  // ===================================================================
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [qty, setQty] = useState<number>(1)
  
  // MOVED THIS LINE TO THE TOP to fix the runtime error
  const dateInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof id === 'string') {
      api.getExperience(id)
        .then(exp => setData(exp))
        .catch(err => {
          console.error(err)
          setError('Failed to load experience')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  // Conditional returns are now safe
  if (loading) return (
    <div className="p-6 flex items-center justify-center gap-2 text-gray-600"><span className="sr-only">Loading</span><div className="h-5 w-5 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin"/></div>
  )
  if (error) return <p className="p-6 text-red-600 text-center">{error}</p>
  if (!data) return <p className="p-6 text-center">Not found</p>

  // --- All Logic Before Return ---
  const next5 = Array.from({ length: 5 }).map((_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toISOString().slice(0, 10) })
  const dateChoices = data.availableDates?.length ? data.availableDates : next5

// Build time slots: supports either strings or objects from API
  const times: TimeSlot[] = (data as any).availableTimes?.map((t: any) => (typeof t === 'string' ? { time: t } : t)) ||
                             data.availableSlots?.map(s => ({ time: s.split(' ')[1] || s })) ||
                             []

  const taxRate = 0.06
  const subtotal = Math.round(data.price * qty)
  const taxes = Math.round(subtotal * taxRate)
  const total = subtotal + taxes
  
  const finalSlot = selectedDate && selectedTime ? `${selectedDate} ${selectedTime}` : null

  return (
    <main className="max-w-6xl mx-auto py-6 px-4">
      <Link href="/" className="text-sm text-blue-700 hover:underline">&larr; Back to Home</Link>
      
      <div className="mt-4 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Image and Details */}
        <div className="flex-1">
          <img src={data.image} alt={data.title} className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg" />
          <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-gray-700 mt-3 leading-relaxed">{data.description}</p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Date</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {dateChoices.map((d) => (
                <button key={d} onClick={() => setSelectedDate(d)} className={`px-4 py-2 rounded-lg border transition-colors ${selectedDate === d ? 'bg-yellow-400 text-black border-yellow-400' : 'hover:bg-gray-100'}`}>{new Date(d + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}</button>
              ))}
              <button type="button" aria-label="Pick date" onClick={() => dateInputRef.current?.showPicker ? dateInputRef.current.showPicker() : dateInputRef.current?.click()} className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-700 hover:bg-gray-100 transition">
<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </button>
              <input ref={dateInputRef} type="date" className="sr-only" onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Time</h3>
            <div className="flex flex-wrap gap-2">
              {times.map((t, i) => (
                <button key={i} disabled={t.soldOut} onClick={() => setSelectedTime(t.time)} className={`px-4 py-2 rounded-lg border text-sm transition-colors ${t.soldOut ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' : selectedTime === t.time ? 'bg-yellow-400 text-black border-yellow-400' : 'hover:bg-gray-100'}`}>
                  {new Date(`1970-01-01T${t.time}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  {t.left ? <span className="ml-2 text-red-600 text-xs">{t.left} left</span> : null}
                  {t.soldOut ? <span className="ml-2 text-gray-600 text-xs">Sold out</span> : null}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">All times are in IST (GMT +5:30)</p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold">About</h3>
            <p className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
          </div>
        </div>

        {/* Right Column: Booking Card */}
        <aside className="w-full lg:w-80">
          <div className="border rounded-xl shadow-lg p-5 bg-white sticky top-6">
            <div className="text-sm text-gray-600">Starts at</div>
            <div className="text-2xl font-semibold text-gray-900">₹{data.price}</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Quantity</span>
              <div className="inline-flex items-center rounded-lg border">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-1.5 hover:bg-gray-100 rounded-l-lg">-</button>
                <div className="px-4 border-l border-r">{qty}</div>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-1.5 hover:bg-gray-100 rounded-r-lg">+</button>
              </div>
            </div>
            <div className="mt-6 space-y-2 border-t pt-4 text-sm text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Taxes & Fees</span><span>₹{taxes}</span></div>
              <div className="flex justify-between font-bold text-base text-black"><span>Total</span><span>₹{total}</span></div>
            </div>
            <Link href={finalSlot ? `/checkout?expId=${data.id}&slot=${encodeURIComponent(finalSlot)}&qty=${qty}` : '#'} passHref legacyBehavior>
              <a
                onClick={(e) => !finalSlot && e.preventDefault()}
                className={`mt-6 w-full text-center block px-5 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-sm transition-all ${!finalSlot ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
              >
                Confirm
              </a>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  )
}