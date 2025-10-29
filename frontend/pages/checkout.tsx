import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { api, Experience } from '../lib/api'

export default function Checkout() {
  const router = useRouter()
  const { expId, slot, qty: qtyQuery } = router.query as { expId?: string; slot?: string; qty?: string }

  const [exp, setExp] = useState<Experience | null>(null)
  const [qty, setQty] = useState<number>(parseInt(qtyQuery || '1') || 1)
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    if (expId) api.getExperience(expId).then(setExp).catch(()=>{})
  }, [expId])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [promoValidation, setPromoValidation] = useState<{valid: boolean, message?: string, type?: string, value?: number} | null>(null)

  const emailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const validatePromo = async () => {
    if (!promo) { setPromoValidation(null); return }
    try {
      const result = await api.validatePromo(promo)
      setPromoValidation(result)
      if (result.valid) setError('')
    } catch (err) {
      setPromoValidation({ valid: false, message: 'Failed to validate promo' })
    }
  }

  const submit = async () => {
    setError('')
    if (!name.trim() || !email.trim()) { setError('Name and email required'); return }
    if (!emailValid(email)) { setError('Please enter a valid email'); return }
    if (!agree) { setError('Please agree to the terms and safety policy'); return }
    if (!expId || !slot) { setError('Invalid booking parameters'); return }

    setLoading(true)
    try {
      const booking = await api.createBooking({
        experienceId: parseInt(expId),
        slotDate: slot,
        userName: name.trim(),
        email: email.trim(),
        promoCode: promo || undefined
      })
      router.push('/result?status=success&bookingId=' + booking.id)
    } catch (err) {
      let msg = 'Booking failed'
      if (axios.isAxiosError(err)) msg = err.response?.data?.message || msg
      if (msg.toLowerCase().includes('slot already booked')) router.push('/result?status=soldout')
      else router.push('/result?status=failure&message=' + encodeURIComponent(msg))
    } finally {
      setLoading(false)
    }
  }

  const base = exp?.price || 0
  const taxRate = 0.06
  const subtotal = Math.round(base * qty)
  const taxes = Math.round(subtotal * taxRate)
  const total = subtotal + taxes

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-700 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1 py-0.5 mb-2 inline-block">&larr; Back</Link>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Checkout</h1>
      <p className="text-sm text-gray-600 mb-4">Slot: {slot}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className={`w-full border rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${!name && error ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full border rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${email && !emailValid(email) ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Promo Code (optional)</label>
            <div className="flex gap-2">
              <input 
                id="promo"
                value={promo}
                onChange={e => setPromo(e.target.value)}
                placeholder="PROMO2025"
                className="flex-1 border rounded-md px-4 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-300"
              />
              <button 
                onClick={validatePromo}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50"
                disabled={!promo || loading}
              >
                Apply
              </button>
            </div>
            {promoValidation && (
              <p className={`text-sm mt-1 ${promoValidation.valid ? 'text-green-600' : 'text-red-600'}`}>
                {promoValidation.valid ? 
                  `✓ Promo applied: ${promoValidation.type === 'percent' ? `${promoValidation.value}% off` : `₹${promoValidation.value} off`}` : 
                  `✗ ${promoValidation.message || 'Invalid promo code'}`
                }
              </p>
            )}
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" checked={agree} onChange={e=> setAgree(e.target.checked)} />
            I agree to the terms and safety policy.
          </label>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="text-gray-500">Experience:</span> {exp?.title || '—'}</p>
              <p><span className="text-gray-500">Slot:</span> {slot}</p>
              <p><span className="text-gray-500">Qty:</span> {qty}</p>
              <p><span className="text-gray-500">Subtotal:</span> {exp ? `₹${subtotal}` : '—'}</p>
              <p><span className="text-gray-500">Taxes (6%):</span> {exp ? `₹${taxes}` : '—'}</p>
              <p className="font-medium">Total: {exp ? `₹${total}` : '—'}</p>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <Link href="/" className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Cancel</Link>
              <button 
                onClick={submit}
                className="px-5 py-2.5 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 disabled:opacity-60" 
                disabled={loading}
              >
                Pay and Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </main>
  )
}
