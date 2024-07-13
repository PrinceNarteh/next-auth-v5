"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/components/shared/form-error";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormSuccess } from "@/components/shared/form-success";
import { registerAction } from "@/actions/register.action";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { InputField } from "../shared/input-field";

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
            <InputField
              name="name"
              label="Name"
              placeholder="John Doe"
              disabled={isPending}
            />
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
            <InputField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="******"
              disabled={isPending}
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
