"use client"

import type { UseFormReturn } from "react-hook-form"
import type { FormValues } from "@/components/multi-step-form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ConfirmationStepProps {
  form: UseFormReturn<FormValues>
}

export function ConfirmationStep({ form }: ConfirmationStepProps) {
  const values = form.getValues()

  const sections = [
    {
      title: "Personal Information",
      items: [
        { label: "Full Name", value: values.fullName },
        { label: "Email", value: values.email },
        { label: "Phone Number", value: values.phoneNumber },
      ],
    },
    {
      title: "Address Details",
      items: [
        { label: "Street Address", value: values.streetAddress },
        { label: "City", value: values.city },
        { label: "Zip Code", value: values.zipCode },
      ],
    },
    {
      title: "Account Setup",
      items: [
        { label: "Username", value: values.username },
        { label: "Password", value: "••••••••" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Confirm Your Information</h2>
        <p className="text-muted-foreground text-sm">Please review your information before submitting.</p>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="py-3">
              <h3 className="text-sm font-medium">{section.title}</h3>
            </CardHeader>
            <CardContent className="py-3">
              <dl className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-2 gap-4">
                    <dt className="text-muted-foreground text-sm font-medium">{item.label}</dt>
                    <dd className="text-sm">{item.value}</dd>
                    {itemIndex < section.items.length - 1 && <Separator className="col-span-2 my-1" />}
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
