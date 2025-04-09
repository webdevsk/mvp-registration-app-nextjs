"use client"

import { useEffect, useRef, useState } from "react"
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
import { useLocalStorage } from "usehooks-ts"
import { FormValues, formSchema } from "@/lib/form-schema"
import { useMutation } from "@tanstack/react-query"

const steps = [
  { id: 1, name: "Personal Information" },
  { id: 2, name: "Address Details" },
  { id: 3, name: "Account Setup" },
  { id: 4, name: "Confirmation" },
]

const defaultFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  username: "",
  password: "",
  confirmPassword: "",
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [initialFormValues, setFormValues, removeFormValues] = useLocalStorage<Partial<FormValues>>(
    "formValues",
    defaultFormValues
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormValues,
    mode: "onChange",
  })

  // Saving values to local storage
  form.watch((values) => {
    // Skip saving password values
    setFormValues({ ...values, password: "", confirmPassword: "" })
  })

  const submitFormData = async (data: FormValues): Promise<unknown> => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Submission failed")
    }
    return response.json()
  }

  const { mutate, isError, isPending } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (data: unknown) => {
      console.log("Form submitted successfully:", data)
      setIsSubmitted(true)
      removeFormValues()
      form.reset(defaultFormValues)
    },
    onError: (error: Error) => {
      console.error("Error submitting form data:", error)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
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

  const htmlFormRef = useRef<HTMLFormElement | null>(null)
  useEffect(() => {
    if (!htmlFormRef.current) return
    const ctrl = new AbortController()
    window.addEventListener(
      "keydown",
      (e) => {
        if (currentStep === steps.length ? isPending : false) return
        if (e.key === "Enter") {
          e.preventDefault()
          handleNext()
        }
      },
      { signal: ctrl.signal }
    )
    return () => {
      ctrl.abort()
    }
  })
  // Focus first input on slide change
  useEffect(() => {
    if (!htmlFormRef.current) return
    htmlFormRef.current?.querySelector("input")?.focus()
  }, [htmlFormRef, currentStep])

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
            <form ref={htmlFormRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === steps.length ? isPending : false}>
                    {currentStep === steps.length ? (isPending ? "Submitting..." : "Submit") : "Next"}
                    {currentStep !== steps.length && <ArrowRight className="ml-2 h-4 w-4" />}
                    {currentStep === steps.length && !isPending && <CheckCircle className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
          {isError && <div className="mt-2 text-sm text-red-600">Error submitting form data. Please try again.</div>}
        </CardContent>
      </Card>
    </div>
  )
}
