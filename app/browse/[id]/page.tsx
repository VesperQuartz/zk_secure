import React from "react"
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"

const mockListings = [
  { id: 1, profileUrl: "https://example.com/profile1", headline: "Senior Software Engineer", connections: 500, accountAge: 5, price: 1000, currency: "USD" },
  { id: 2, profileUrl: "https://example.com/profile2", headline: "Marketing Specialist", connections: 1000, accountAge: 3, price: 750, currency: "USD" },
  { id: 3, profileUrl: "https://example.com/profile3", headline: "UX Designer", connections: 750, accountAge: 4, price: 900, currency: "USD" },
  { id: 4, profileUrl: "https://example.com/profile4", headline: "Data Scientist", connections: 600, accountAge: 2, price: 1200, currency: "USD" },
  { id: 5, profileUrl: "https://example.com/profile5", headline: "Product Manager", connections: 1500, accountAge: 7, price: 1500, currency: "USD" },
  { id: 6, profileUrl: "https://example.com/profile6", headline: "Content Creator", connections: 2000, accountAge: 3, price: 800, currency: "USD" },
]

export const ListingDetailPage = ({ params }: { params: { id: string } }) => {
  const listing = mockListings.find(l => l.id === parseInt(params.id))

  if (!listing) {
    notFound()
  }

  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">{listing.headline}</h1>
        <div className="bg-background border border-muted rounded-lg p-6 mb-6">
          <p className="text-lg mb-4"><strong>Profile URL:</strong> <a href={listing.profileUrl} className="text-secondary hover:underline">{listing.profileUrl}</a></p>
          <p className="text-lg mb-4"><strong>Connections:</strong> {listing.connections}</p>
          <p className="text-lg mb-4"><strong>Account Age:</strong> {listing.accountAge} years</p>
          <p className="text-2xl font-bold text-secondary mb-6">{listing.price} {listing.currency}</p>
          <Button size="lg">Contact Seller</Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ListingDetailPage;
