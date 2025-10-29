import clsx from 'clsx'

type Tone = 'info' | 'success' | 'error' | 'warning'

export default function Alert({ tone = 'info', children }: { tone?: Tone, children: React.ReactNode }) {
  const styles: Record<Tone, string> = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  }
  return (
    <div className={clsx('border rounded-md px-3 py-2 text-sm', styles[tone])}>
      {children}
    </div>
  )
}