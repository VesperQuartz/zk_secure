"use client"
import Link from "next/link";
import React from "react"
import { Button } from "@/components/ui/button";
import { SVGLinkedin } from "./icons";
import { useUserStore } from "@/app/store";
import { AddUser } from "./add-user";
import { SellDialog } from "./sell";

export const Header = () => {
  const user = useUserStore(state => state.user);
  console.log("user:", user);
  return (
    <header className="bg-primary text-primary-foreground">
      {!user ? <AddUser /> : null}
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
              <SellDialog>
                Sell
              </SellDialog>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
