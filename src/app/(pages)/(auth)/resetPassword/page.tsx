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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/resetPassword.schema";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.token) {
      setLoading(false);
      toast.success("Password Reset Successfully");
      form.reset();
      navigate.push("/login");
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container w-full md:w-[80%] lg:w-[50%] mx-auto px-5">
        <h1 className="text-2xl md:text-3xl mb-6 text-center text-emerald-700">
          Reset Password
        </h1>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
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
              href="/forgotPassword"
              className="text-emerald-700 hover:underline block text-right"
            >
              Forgot Password?
            </Link>
            <Button className="cursor-pointer w-full">
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
