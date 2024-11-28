import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Marketplace
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/browse" className="hover:text-secondary">Browse</Link></li>
            <li><Link href="/sell" className="hover:text-secondary">Sell</Link></li>
            <li><Button asChild variant="secondary"><Link href="/login">Login</Link></Button></li>
            <li><Button asChild variant="outline"><Link href="/register">Register</Link></Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

