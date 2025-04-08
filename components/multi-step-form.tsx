"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { PersonalInfoStep } from "@/components/steps/personal-info-step"
import { AddressDetailsStep } from "@/components/steps/address-details-step"
import { AccountSetupStep } from "@/components/steps/account-setup-step"
import { ConfirmationStep } from "@/components/steps/confirmation-step"
import { FormStepper } from "@/components/form-stepper"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

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
  { id: 4, name: "Confirmation" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
    setIsSubmitted(true)
    // Here you would typically send the data to your backend
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
      case 4:
        // No validation needed for confirmation step
        form.handleSubmit(onSubmit)()
        return
    }

    const isStepValid = await form.trigger(fieldsToValidate)

    if (isStepValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
            <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Registration Complete!</h2>
            <p className="text-muted-foreground">
              Thank you for registering. Your account has been created successfully.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setIsSubmitted(false)
                setCurrentStep(1)
                form.reset()
              }}>
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <FormStepper steps={steps} currentStep={currentStep} />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && <PersonalInfoStep control={form.control} />}
              {currentStep === 2 && <AddressDetailsStep control={form.control} />}
              {currentStep === 3 && <AccountSetupStep control={form.control} />}
              {currentStep === 4 && <ConfirmationStep form={form} />}

              <CardFooter className="px-0 pt-4">
                <div className="flex w-full justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={currentStep === 1 ? "pointer-events-none opacity-0" : ""}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <Button type="button" onClick={handleNext}>
                    {currentStep === steps.length ? "Submit" : "Next"}
                    {currentStep !== steps.length ? (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    ) : (
                      <CheckCircle className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
