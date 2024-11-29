import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ListingCard } from "@/components/listing-card"

// Mock data
const mockListings = [
  { id: 1, profileUrl: "https://example.com/profile1", headline: "Senior Software Engineer", connections: 500, accountAge: 5, price: 1000, currency: "USD" },
  { id: 2, profileUrl: "https://example.com/profile2", headline: "Marketing Specialist", connections: 1000, accountAge: 3, price: 750, currency: "USD" },
  { id: 3, profileUrl: "https://example.com/profile3", headline: "UX Designer", connections: 750, accountAge: 4, price: 900, currency: "USD" },
  { id: 4, profileUrl: "https://example.com/profile4", headline: "Data Scientist", connections: 600, accountAge: 2, price: 1200, currency: "USD" },
  { id: 5, profileUrl: "https://example.com/profile5", headline: "Product Manager", connections: 1500, accountAge: 7, price: 1500, currency: "USD" },
  { id: 6, profileUrl: "https://example.com/profile6", headline: "Content Creator", connections: 2000, accountAge: 3, price: 800, currency: "USD" },
]

export const BrowsePage = () => {
  return (
    <React.Fragment>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Browse Listings</h1>
        <div className="flex gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search listings..."
            className="max-w-sm"
          />
          <Button type="submit">Search</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default BrowsePage;
