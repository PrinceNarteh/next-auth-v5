"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/shared/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/shared/form-success";
import { registerAction } from "@/actions/register.action";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";

export const RegisterForm = () => {
  const [message, setMessage] = useState<{
    error: string | undefined;
    success: string | undefined;
  }>({ success: "", error: "" });
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    setMessage({ error: "", success: "" });
    startTransition(() => {
      registerAction(data).then((data) => {
        setMessage({
          success: data.success,
          error: data.error,
        });
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="John Doe"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@email.com"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={message.error} />
            <FormSuccess message={message.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
