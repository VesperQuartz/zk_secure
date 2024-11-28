import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SVGLinkedin } from "./icons";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <SVGLinkedin /> Marketplace
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button asChild variant="secondary">
                <Link href="/login">Browse</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="secondary">
                <Link href="/register">Sell</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
