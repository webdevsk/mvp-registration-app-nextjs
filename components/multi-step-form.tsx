"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PersonalInfoStep } from "@/components/steps/personal-info-step"
import { AddressDetailsStep } from "@/components/steps/address-details-step"
import { AccountSetupStep } from "@/components/steps/account-setup-step"
import { FormStepper } from "@/components/form-stepper"

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
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type FormValues = z.infer<typeof formSchema>

const steps = [
  { id: 1, name: "Personal Information" },
  { id: 2, name: "Address Details" },
  { id: 3, name: "Account Setup" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!")
  }

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "email", "phoneNumber"]
        break
      case 2:
        fieldsToValidate = ["streetAddress", "city", "zipCode"]
        break
      case 3:
        fieldsToValidate = ["username", "password", "confirmPassword"]
        break
    }

    const isStepValid = await form.trigger(fieldsToValidate)

    if (isStepValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      } else {
        form.handleSubmit(onSubmit)()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="space-y-6">
      <FormStepper steps={steps} currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && <PersonalInfoStep control={form.control} />}
              {currentStep === 2 && <AddressDetailsStep control={form.control} />}
              {currentStep === 3 && <AccountSetupStep control={form.control} />}

              <div className="mt-8 flex justify-between">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  Previous
                </Button>

                <Button type="button" onClick={handleNext}>
                  {currentStep === steps.length ? "Submit" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
