import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"

export function MainNav() {
  return (
    <div className="flex gap-2">
      <Image alt="logo" src="/logo.png" height={35} width={35} />
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  )
}
