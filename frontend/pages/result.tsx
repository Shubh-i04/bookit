import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Result() {
  const router = useRouter()
  const { status, bookingId, message } = router.query as { status?: string, bookingId?: string, message?: string }

  const renderContent = () => {
    switch (status) {
      case 'success':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-green-700">Booking Confirmed</h1>
            {bookingId && <p className="mt-2">Your booking ID is <span className="font-mono">{bookingId}</span>.</p>}
          </div>
        )
      case 'failure':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-700">Booking Failed</h1>
            <p className="mt-2 text-gray-700">{message || 'Something went wrong. Please try again.'}</p>
          </div>
        )
      case 'soldout':
        return (
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-orange-700">Slot Sold Out</h1>
            <p className="mt-2 text-gray-700">The selected slot is no longer available. Please choose another slot.</p>
          </div>
        )
      default:
        return (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Booking Status</h1>
            <p className="mt-2 text-gray-700">Awaiting status...</p>
          </div>
        )
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-100 p-8 text-center max-w-lg w-full">
        <div className="text-5xl mb-3">
          {status === 'success' ? '✅' : status === 'soldout' ? '⚠️' : status === 'failure' ? '❌' : 'ℹ️'}
        </div>
        {renderContent()}
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Back to Home</Link>
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">Go Back</button>
        </div>
      </div>
    </main>
  )
}

