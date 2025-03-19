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
import { LoginSchema, LoginValues } from "../../AuthSchema";
import Link from "next/link";
import { CircleCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import AlertError from "@/components/AlertError";
import useSignin from "../../hooks/useSignin";

function SigninForm() {
  const { mutate, isPending, isSuccess, isError, error } = useSignin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    mutate(values);
  }

  return (
    <Card className="gap-5">
      <CardHeader className="text-center">
        <CardTitle className="text-xl truncate">
          Let&apos;s get productive {form.watch("username")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/admin/reset-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                        tabIndex={-1}
                      >
                        Forgot your password?
                      </Link>
                    </div>
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
              <Button type="submit" className="w-full">
                {isPending && <Loader2 className="animate-spin size-5" />}
                {isSuccess && (
                  <CircleCheck className="stroke-green-600 size-5" />
                )}
                {!isPending && !isSuccess && "Sign in"}
              </Button>
            </form>
          </Form>
          {isError && <AlertError message={error?.message} />}
        </div>
      </CardContent>
      <div className="text-center text-sm">
        <Link
          href="/admin/signup"
          className="text-sm underline-offset-4 hover:underline"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </Card>
  );
}

export default SigninForm;
