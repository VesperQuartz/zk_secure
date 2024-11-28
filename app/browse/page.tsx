import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockListings = [
  {
    id: 1,
    title: "Professional Service 1",
    price: 100,
    category: "Consulting",
  },
  { id: 2, title: "Digital Asset 1", price: 50, category: "Design" },
  { id: 3, title: "Professional Service 2", price: 150, category: "Marketing" },
];

export default function Browse() {
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Input
          type="search"
          placeholder="Search listings..."
          className="flex-grow bg-background border-muted"
        />
        <Button type="submit">Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing) => (
          <div
            key={listing.id}
            className="border border-muted rounded p-4 bg-background"
          >
            <h2 className="text-xl font-semibold text-primary">
              {listing.title}
            </h2>
            <p className="text-muted-foreground">Price: ${listing.price}</p>
            <p className="text-muted-foreground">
              Category: {listing.category}
            </p>
            <Button className="mt-2">View Details</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
