"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useGenerate } from "@/app/hooks";
import { useAddProduct } from "@/app/hooks/api";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least $1.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  fileUrl: z.string().url({
    message: "Please enter a valid URL for your digital product.",
  }),
});

const categories = [
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

export default function SellDigitalGoodsPage() {
  const generate = useGenerate();

  const product = useAddProduct();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      category: "",
      fileUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    product.mutate(values, {
      onSuccess: (data) => {
        toast({
          title: data?.message,
        });
      },
    });
    // generate.mutate({
    //   schemaId: "6ee3b90f5c904721a8dad25e68fd3a62",
    // });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        className="hidden"
        onClick={() =>
          generate.mutate({
            schemaId: process.env.NEXT_PUBLIC_SCHEMA_ID2!,
          })
        }
      >
        Generate Test
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sell Digital Goods</CardTitle>
          <CardDescription>
            Create a new listing for your digital product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your product title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a catchy title for your digital product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product in detail"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your digital product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="9.99"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Set a competitive price for your product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.label}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the most appropriate category for your product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/your-product-file.zip"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a URL where your digital product can be accessed
                      or downloaded.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={product.isPending}
              >
                {product.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {product.isPending ? "Creating Listing..." : "Create Listing"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
