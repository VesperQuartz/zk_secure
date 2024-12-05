"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllProduct } from "@/app/hooks/api";
import { Badge } from "./ui/badge";
import { match } from "ts-pattern";
import { CongratsDialog } from "./congract-dialog";
import { useQueryState } from "nuqs";
import { CheckCircle } from "lucide-react";
import { formatDistance } from "date-fns";

const categories = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Design Assets",
    value: "design-assets",
  },
  {
    label: "Courses & Tutorials",
    value: "courses-tutorials",
  },
  {
    label: "E-books & Guides",
    value: "ebook-guides",
  },
  {
    label: "Software & Plugins",
    value: "software-plugins",
  },
];

export const Marketplace = () => {
  const products = useGetAllProduct();
  const [isExploding, setIsExploding] = React.useState(false);

  // Use nuqs to manage category and search in URL
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const [search] = useQueryState("search", {
    defaultValue: "",
  });

  return (
    <div className="min-h-screen bg-background">
      <CongratsDialog
        isOpen={isExploding}
        onClose={() => setIsExploding(false)}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-4 mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Reddit Marketplace
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and purchase high-quality digital products from verified
            Reddit creators
          </p>
        </div>

        <Tabs
          value={category}
          onValueChange={(value) => setCategory(value)}
          className="space-y-8"
        >
          <TabsList className="w-full justify-center border-b h-14 rounded-none p-0 bg-transparent gap-8">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-8 transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.data
                  ?.filter(
                    (product) =>
                      (cat.value === "all" ||
                        product.products.category === cat.value) &&
                      (search === "" ||
                        product.products.title
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        product.products.description
                          .toLowerCase()
                          .includes(search.toLowerCase())),
                  )
                  .map((product) => (
                    <Card
                      key={product.products.id}
                      className="group hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="line-clamp-2 text-xl">
                            {product.products.title}
                          </CardTitle>
                          {match(product.users.verified)
                            .with(1, () => (
                              <Badge
                                variant="default"
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified Redditor
                              </Badge>
                            ))
                            .otherwise(() => null)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className="capitalize bg-accent/50"
                          >
                            {product.products.category.replace("-", " & ")}
                          </Badge>
                          <span className="font-semibold text-2xl text-orange-500">
                            ${product.products.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>by</span>
                          <span className="font-medium">{product.users.username}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-3">
                          {product.products.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created{" "}
                          {formatDistance(
                            new Date(product.products.createdAt!),
                            new Date(),
                            { addSuffix: true },
                          )}
                        </p>
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
                          onClick={() => setIsExploding(true)}
                        >
                          Buy Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
