import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Result() {
  const router = useRouter()
  const { status, bookingId } = router.query

  return (
    <main className="max-w-xl mx-auto p-4">
      {status === 'success' ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4">Your booking has been successfully processed.</p>
          <div className="bg-gray-50 rounded p-4 mb-6">
            <p className="text-sm text-gray-600">Booking ID</p>
            <p className="text-xl font-mono font-semibold">{bookingId}</p>
          </div>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4 text-red-600">✗</div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Booking Failed</h1>
          <p className="text-gray-600 mb-6">Something went wrong. Please try again.</p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      )}
    </main>
  )
}
