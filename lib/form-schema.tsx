"use client"
import { z } from "zod"

// Define the form schema for all steps

export const formSchema = z
  .object({
    // Step 1: Personal Information
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),

    // Step 2: Address Details
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip code must be at least 5 digits")
      .regex(/^\d+$/, "Zip code must contain only numbers"),

    // Step 3: Account Setup
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(30, "Username cannot exceed 30 characters")
      .regex(/^[a-zA-Z0-9_.-]+$/, "Username can only contain letters, numbers, underscores, dots, and hyphens")
      .regex(/^[a-zA-Z0-9].*$/, "Username must start with a letter or number")
      .regex(/.*[a-zA-Z0-9]$/, "Username must end with a letter or number"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(({ username }) => !username.includes("..") && !username.includes("__") && !username.includes("--"), {
    message: "Username cannot contain consecutive dots, underscores, or hyphens",
    path: ["username"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type FormValues = z.infer<typeof formSchema>
