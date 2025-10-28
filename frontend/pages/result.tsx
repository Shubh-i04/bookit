import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Result() {
  const router = useRouter()
  const { status, bookingId } = router.query

  return (
    <main className="max-w-xl mx-auto p-4">
      {status === 'success' ? (
        <>
          <h1 className="text-2xl font-bold">Booking Confirmed</h1>
          <p className="mt-2">Booking ID: {bookingId}</p>
          <Link href="/" className="text-blue-600 mt-4 inline-block">Back to Home</Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Booking Failed</h1>
          <p className="mt-2">Please try again.</p>
          <Link href="/" className="text-blue-600 mt-4 inline-block">Back to Home</Link>
        </>
      )}
    </main>
  )
}
