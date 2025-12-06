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
import { registerSchema, registerSchemaType } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.message === "success") {
      setLoading(false);
      toast.success("Registered Successfully, You can login now");
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
          Register Now
        </h1>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "password" : "text"}
                        placeholder="Confirm Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-slate-400"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="cursor-pointer w-full min-h-9 sm:min-h-10 text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto w-4 h-4" />
              ) : (
                "Register Now"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
