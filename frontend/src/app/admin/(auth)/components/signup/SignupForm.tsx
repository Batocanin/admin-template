"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import { SignupSchema, SignupValues } from "../../AuthSchema";
import Link from "next/link";
import { CircleCheck, Eye, EyeOff, Loader2 } from "lucide-react";

import useSignup from "../../hooks/useSignup";
import AlertError from "@/components/AlertError";

function SignupForm() {
  const { mutate, isPending, isSuccess, isError, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupValues) {
    mutate(values);
  }

  return (
    <Card className="gap-5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl truncate">Request Admin Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border" />
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
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                        {!showPassword ? (
                          <Eye
                            strokeWidth={1.7}
                            className="absolute top-2 right-3 size-5 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        ) : (
                          <EyeOff
                            strokeWidth={1.7}
                            className="absolute top-2 right-3 size-5 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        )}
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending || isSuccess}
                type="submit"
                className="w-full disabled:opacity-100"
              >
                {isPending && <Loader2 className="animate-spin size-5" />}
                {isSuccess && (
                  <CircleCheck className="stroke-green-600 size-5" />
                )}
                {!isPending && !isSuccess && "Sign up"}
              </Button>
            </form>
          </Form>
          {isError && <AlertError message={error.message} />}
        </div>
      </CardContent>
      <div className="text-center text-sm">
        <Link
          href="/admin/signin"
          className="text-sm underline-offset-4 hover:underline"
        >
          Already have an account?
        </Link>
      </div>
    </Card>
  );
}

export default SignupForm;
