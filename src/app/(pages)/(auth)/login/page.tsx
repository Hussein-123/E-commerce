"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {
    setLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      setLoading(false);
      toast.success("Logged in Successfully");
      form.reset();
      window.location.href = "/";
    } else {
      toast.error(response?.error || "Login failed");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container w-full md:w-[80%] lg:w-[50%] mx-auto px-5">
        <h1 className="text-2xl md:text-3xl mb-6 text-center text-emerald-700">
          Login Now
        </h1>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      {...field}
                    />
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
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "password" : "text"}
                        placeholder="Enter your Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-slate-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/forgetPassword"
              className="text-emerald-700 hover:underline block text-right"
            >
              Forgot Password?
            </Link>
            <Button
              className="cursor-pointer w-full min-h-9 sm:min-h-10 text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto w-4 h-4" />
              ) : (
                "Login Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
