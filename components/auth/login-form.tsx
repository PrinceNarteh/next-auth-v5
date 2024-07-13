"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { loginAction } from "@/actions/login.action";
import { InputField } from "@/components/shared/input-field";

export const LoginForm = () => {
  const [message, setMessage] = useState<{
    error: string | undefined;
    success: string | undefined;
  }>({ success: "", error: "" });
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    setMessage({ error: "", success: "" });
    startTransition(() => {
      loginAction(data).then((data) => {
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
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputField
              type="email"
              label="Email"
              name="email"
              placeholder="john.doe@email.com"
              disabled={isPending}
            />
            <InputField
              type="password"
              label="Password"
              name="password"
              placeholder="******"
              disabled={isPending}
            />
            <FormError message={message.error} />
            <FormSuccess message={message.success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
