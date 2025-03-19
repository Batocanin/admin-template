"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
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
import { ResetPasswordSchema, ResetPasswordValues } from "../../AuthSchema";
import Link from "next/link";

function ResetPasswordForm() {
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ResetPasswordValues) {
    console.log(values);
  }

  return (
    <Card className="gap-5">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="text-center text-sm">
        <Link
          href="/admin/signin"
          className="text-sm underline-offset-4 hover:underline"
        >
          Remember your password?
        </Link>
      </div>
    </Card>
  );
}

export default ResetPasswordForm;
