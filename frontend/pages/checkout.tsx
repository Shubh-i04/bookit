import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../lib/api'

export default function Checkout() {
  const router = useRouter()
  const { expId, slot } = router.query as any

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [promoValidation, setPromoValidation] = useState<{valid: boolean, message?: string} | null>(null)

  const validatePromo = async () => {
    if (!promo) {
      setPromoValidation(null)
      return
    }
    try {
      const result = await api.validatePromo(promo)
      setPromoValidation(result)
      if (result.valid) {
        setError('')
      }
    } catch (err) {
      console.error(err)
      setPromoValidation({ valid: false, message: 'Failed to validate promo' })
    }
  }

  const submit = async () => {
    setError('')
    if (!name || !email) { 
      setError('Name and email required')
      return 
    }
    if (!expId || !slot) {
      setError('Invalid booking parameters')
      return
    }
    setLoading(true)
    try {
      const booking = await api.createBooking({
        experienceId: parseInt(expId),
        slotDate: slot,
        userName: name,
        email,
        promoCode: promo || undefined
      })
      router.push('/result?status=success&bookingId=' + booking.id)
    } catch (err: any) {
      console.error(err)
      setError(err?.response?.data?.message || 'Booking failed')
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <Link href="/" className="text-blue-600 mb-4 inline-block">&larr; Back</Link>
      <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
      <p className="text-sm text-gray-600 mb-4">Slot: {slot}</p>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Your name" 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Your email" 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Promo Code (optional)</label>
          <div className="flex gap-2">
            <input 
              value={promo} 
              onChange={e => setPromo(e.target.value)} 
              placeholder="Enter promo code" 
              className="flex-1 p-2 border rounded"
            />
            <button 
              onClick={validatePromo} 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={!promo}
            >
              Validate
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
        <div className="flex items-center justify-between pt-4">
          <button 
            onClick={submit} 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
          <Link href="/" className="text-gray-600 hover:text-gray-800">Cancel</Link>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </main>
  )
}
