"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search } from "lucide-react";
import { useAuth } from "@/app/hooks/api";
import { match } from "ts-pattern";
import { Skeleton } from "./ui/skeleton";
import { useQueryState } from "nuqs";
import { usePathname } from "next/navigation";

export const Header = () => {
  const user = useAuth();
  const pathname = usePathname();
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Reddit Marketplace
          </span>
        </Link>

        {pathname !== "/sell" && (
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Reddit digital goods..."
                className="pl-10 bg-accent/50 border-accent focus:border-primary/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        <nav className="flex items-center gap-4">
          {match(user.isLoading)
            .with(true, () => <Skeleton className="w-[200px] h-10" />)
            .with(false, () =>
              match(user?.data)
                .with(null, () => (
                  <Button variant="ghost" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                ))
                .otherwise(() => (
                  <div className="flex items-center gap-4">
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                      asChild
                    >
                      <Link href="/sell">Sell Digital Goods</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-accent"
                      asChild
                    >
                      <Link href="/signin">
                        <LogOut className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                )),
            )
            .exhaustive()}
        </nav>
      </div>
    </header>
  );
};
