import Link from 'next/link'
import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Listing {
  id: number
  profileUrl: string
  headline: string
  connections: number
  accountAge: number
  price: number
  currency: string
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary truncate">{listing.headline}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">Connections: {listing.connections}</p>
        <p className="text-sm text-muted-foreground mb-2">Account Age: {listing.accountAge} years</p>
        <p className="text-lg font-bold text-secondary">
          {listing.price} {listing.currency}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/browse/${listing.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

