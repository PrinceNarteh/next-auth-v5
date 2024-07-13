"use server";

import bcrypt from "bcrypt";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import { db } from "@/lib/db";
import constants from "@/constants";

export const registerAction = async (data: RegisterSchemaType) => {
  try {
    const validatedData = RegisterSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        error: "Invalid fields",
      };
    }

    const { confirmPassword, ...res } = validatedData.data;
    const hashedPassword = await bcrypt.hash(validatedData.data.password, 10);
    await db.user.create({
      data: {
        ...res,
        password: hashedPassword,
      },
    });

    return {
      success: "User created successfully.",
    };
  } catch (error: any) {
    if (error.code === constants.DB_UNIQUE_ERROR_CODE) {
      return { error: "Email already in used." };
    }
    return { error: "Internal server error" };
  }
};
