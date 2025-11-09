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
import { useRouter } from "next/navigation";
import {
  forgetPasswordSchema,
  ForgetPasswordSchemaType,
} from "@/schema/forgetPassword.schema";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function handleForgotPassword(values: ForgetPasswordSchemaType) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.statusMsg === "success") {
      setLoading(false);
      toast.success("Check your email");
      form.reset();
      navigate.push("/resetCode");
    } else {
      toast.error(data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-[50vh]">
        <div className="container w-full md:w-[80%] lg:w-[50%] mx-auto px-5">
          <h1 className="text-2xl mb-6 text-center text-emerald-700">
            Email Address
          </h1>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleForgotPassword)}
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
              <Button className="cursor-pointer w-full">
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
