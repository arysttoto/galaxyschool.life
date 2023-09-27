import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <>
    <Link href="/" className="block" aria-label="Cruip">
      <Image
          src="/icon.png"
          alt="Precedent logo"
          width="35"
          height="35"
          className="mr-2 rounded-sm"
        ></Image>
    </Link>
    </>
  )
}
