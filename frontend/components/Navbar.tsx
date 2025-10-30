import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Logo from './Logo'

export default function Navbar() {
  const router = useRouter()
  const [q, setQ] = useState<string>('')

  useEffect(() => {
    const current = (router.query.q as string) || ''
    setQ(current)
  }, [router.query.q])

  const applySearch = (val: string) => {
    const pathname = router.pathname
    const query = { ...router.query, q: val || undefined }
    router.replace({ pathname, query }, undefined, { shallow: true })
  }

  const onChange = (val: string) => {
    setQ(val)
  }

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between py-3 gap-3">
          <Link href="/" className="flex items-center gap-2 min-w-[140px]" aria-label="BookIt">
            <Logo className="h-9" />
          </Link>
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') applySearch(q) }}
                placeholder="Search experiences…"
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={() => applySearch(q)}
                className="inline-flex h-9 px-3 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
