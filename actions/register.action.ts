"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas";

export const registerAction = async (data: RegisterSchemaType) => {
  const validatedData = RegisterSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      error: "Invalid fields",
    };
  }

  return {
    success: "Email sent!",
  };
};
