import { SellDialog } from "@/components/sell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react"

export const Home = () => {
  return (
    <div className="text-center flex flex-col flex-1">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to the Marketplace
      </h1>
      <p className="mb-8 text-muted-foreground">
        Find and sell professional services and digital assets
      </p>
      <div className="space-x-4">
        <Button asChild size="lg">
          <Link href="/browse">Browse Listings</Link>
        </Button>
        <SellDialog>
          Create a Listing
        </SellDialog>
      </div>
    </div>
  );
}

export default Home;
