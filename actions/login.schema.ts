"use server";

import { LoginSchema, LoginSchemaType } from "@/schemas";

export const loginAction = async (data: LoginSchemaType) => {
  const validatedData = LoginSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      error: "Invalid fields",
    };
  }

  return {
    success: "Email sent!",
  };
};
