"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SellerVerification() {
  const [redditUsername, setRedditUsername] = React.useState("");
  const [isVerified, setIsVerified] = React.useState(false);

  const handleVerification = () => {
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Seller Verification</CardTitle>
        <CardDescription>
          Verify your Reddit account using zkPass
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="reddit-username"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Reddit Username
            </label>
            <Input
              id="reddit-username"
              placeholder="Enter your Reddit username"
              value={redditUsername}
              onChange={(e) => setRedditUsername(e.target.value)}
            />
          </div>
          {isVerified && (
            <div className="text-sm text-green-600">
              ✓ Verified: 10,000+ karma, active in r/learnprogramming
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleVerification}
          disabled={isVerified}
        >
          {isVerified ? "Verified" : "Verify with zkPass"}
        </Button>
      </CardFooter>
    </Card>
  );
}
