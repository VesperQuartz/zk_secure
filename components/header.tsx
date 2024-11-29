import Link from "next/link";
import React from "react"
import { Button } from "@/components/ui/button";
import { SVGLinkedin } from "./icons";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex gap-2">
          <SVGLinkedin className="w-6 h-6 bg-red-500 stroke-white" /> Marketplace
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button asChild variant="secondary">
                <Link href="/browse">Browse</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="secondary">
                <Link href="/sell">Sell</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
