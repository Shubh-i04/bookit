import Link from 'next/link'

export default function ExperienceCard({exp}: any) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={exp.image} alt={exp.title} className="w-full h-40 object-cover rounded" />
      <h2 className="mt-2 text-lg font-medium">{exp.title}</h2>
      <p className="text-sm text-gray-600">{exp.shortDescription}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="font-semibold">₹{exp.price}</div>
        <Link href={`/details/${exp.id}`} className="text-blue-600">View</Link>
      </div>
    </div>
  )
}
