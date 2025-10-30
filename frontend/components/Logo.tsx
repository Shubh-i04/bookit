import React from 'react'

export default function Logo({ className = 'h-9' }: { className?: string }) {
  const navy = '#0F2A50'

  const Globe = ({ size = '1em' }: { size?: string }) => (
    <svg viewBox="0 0 24 24" style={{ height: size, width: size }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke={navy} strokeWidth="2"/>
      <path d="M2 12h20M12 2v20M4 7.5h16M4 16.5h16" stroke={navy} strokeWidth="1.6" fill="none"/>
    </svg>
  )

  return (
    <div className={`flex items-end leading-none select-none ${className}`} aria-label="BookIt">
      <span className="font-semibold tracking-tight text-[18px] sm:text-[20px]" style={{color: navy}}>Bo</span>
      <span className="mx-[2px] inline-flex items-center justify-center align-baseline">
        <Globe size="0.95em" />
      </span>
      <span className="font-semibold tracking-tight text-[18px] sm:text-[20px]" style={{color: navy}}>k</span>
      <span className="relative font-semibold tracking-tight text-[18px] sm:text-[20px]" style={{color: navy}}>
        i</span>
      <span className="font-semibold tracking-tight text-[18px] sm:text-[20px]" style={{color: navy}}>t</span>
    </div>
  )
}
