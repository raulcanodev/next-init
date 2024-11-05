import Link from 'next/link'

export function SideBanner() {
  return (
    <div
    className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-cover bg-center"
    style={{ backgroundImage: `url('/black-building.jpg')` }}
  >
    <div>
      <Link href="/" className="text-2xl font-bold">
        Cvpage
      </Link>
    </div>
    <div>
      <blockquote className="text-xl">
        &ldquo;Fools are fascinated by complexity, geniuses by simplicity.&ldquo;
      </blockquote>
      <p className="mt-4">
        <span className="text-xl font-bold">- Alan Perlis </span>
      </p>
    </div>
  </div>
  )
}