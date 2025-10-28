import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

export default function Checkout() {
  const router = useRouter()
  const { expId, slot } = router.query as any

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setError('')
    if (!name || !email) { setError('Name and email required'); return }
    setLoading(true)
    try {
      const validate = await axios.post((process.env.NEXT_PUBLIC_API_URL || '') + '/promo/validate', { code: promo })
      const booking = await axios.post((process.env.NEXT_PUBLIC_API_URL || '') + '/bookings', {
        experienceId: expId, slotDate: slot, userName: name, email, promoCode: promo
      })
      router.push('/result?status=success&bookingId=' + booking.data.id)
    } catch (err:any) {
      console.error(err)
      setError(err?.response?.data?.message || 'Booking failed')
    } finally { setLoading(false) }
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold">Checkout</h1>
      <p className="text-sm text-gray-600">Slot: {slot}</p>
      <div className="space-y-2 mt-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="w-full p-2 border rounded" />
        <input value={promo} onChange={e=>setPromo(e.target.value)} placeholder="Promo code (optional)" className="w-full p-2 border rounded" />
        <div className="flex items-center justify-between">
          <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
          <Link href="/">Cancel</Link>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </main>
  )
}
