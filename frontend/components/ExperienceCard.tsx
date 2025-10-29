import Link from 'next/link'

// ===================================================================
// Step 1: Define the shape of your 'exp' data
// ===================================================================
interface Experience {
  id: string;
  image: string;
  title: string;
  shortDescription: string;
  price: number;
}

// ===================================================================
// Step 2: Define the props for your component
// ===================================================================
interface ExperienceCardProps {
  exp: Experience;
}

// ===================================================================
// Step 3: Use the new props type instead of 'any'
// ===================================================================
export default function ExperienceCard({exp}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-lg hover:scale-[1.02] transition-transform">
      <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">{exp.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{exp.shortDescription}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="font-semibold">₹{exp.price}</div>
          <Link href={`/experiences/${exp.id}`} className="text-blue-600 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-2 py-1">View</Link>
        </div>
      </div>
    </div>
  )
}
