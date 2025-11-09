"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  resetCodeSchema,
  ResetCodeSchemaType,
} from "@/schema/resetCode.schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const form = useForm<ResetCodeSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });

  async function handleResetCode(values: ResetCodeSchemaType) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === "Success") {
      setLoading(false);
      toast.success("Code verified successfully");
      form.reset();
      navigate.push("/resetPassword");
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
            Enter Verification Code
          </h1>
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleResetCode)}
            >
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <InputOTP
                          maxLength={6}
                          {...field}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <div className="text-center text-sm">
                          {field.value === "" ? (
                            <>Enter your one-time password.</>
                          ) : (
                            <>You entered: {field.value}</>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="cursor-pointer w-full md:w-[50%] mx-auto block">
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
