"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { useCreateUser } from "@/app/hooks/api";
import { useGenerate, useVerifyEvm } from "@/app/hooks";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const signup = useCreateUser();
  const generate = useGenerate();
  const verify = useVerifyEvm();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    generate.mutate(
      {
        schemaId: process.env.NEXT_PUBLIC_SCHEMA_ID1!,
      },
      {
        onSuccess: (data) => {
          verify.mutate(
            {
              res: data,
              schemaId: process.env.NEXT_PUBLIC_SCHEMA_ID1!,
            },
            {
              onSuccess: (data) => {
                toast({
                  title: "verification successful",
                });
                if (data) {
                  signup.mutate(values, {
                    onSuccess: () => {
                      toast({
                        title: "Account created successfully",
                      });
                      router.push("/");
                    },
                    onError: (data) => {
                      toast({
                        title: data.message,
                        variant: "destructive",
                      });
                    },
                  });
                }
              },
              onError: () => {
                toast({
                  title: "Verification failed",
                  variant: "destructive",
                });
              },
            },
          );
        },
      },
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                type="submit"
                disabled={
                  signup.isPending || generate.isPending || verify.isPending
                }
              >
                {(signup.isPending ||
                  generate.isPending ||
                  verify.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase"> */}
            {/*   <span className="bg-background px-2 text-muted-foreground"> */}
            {/*     Or continue with */}
            {/*   </span> */}
            {/* </div> */}
          </div>
          {/* <div className="grid grid-cols-2 gap-6"> */}
          {/*   <Button variant="outline"> */}
          {/*     <Github className="mr-2 h-4 w-4" /> */}
          {/*     GitHub */}
          {/*   </Button> */}
          {/*   <Button variant="outline"> */}
          {/*     <span className="sr-only">Google</span> */}
          {/*     Google */}
          {/*   </Button> */}
          {/* </div> */}
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
