"use client"

import type { Control } from "react-hook-form"
import type { FormValues } from "../../lib/form-schema"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PersonalInfoStepProps {
  control: Control<FormValues>
}

export function PersonalInfoStep({ control }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <p className="text-muted-foreground text-sm">Please provide your personal details.</p>
      </div>

      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="1234567890"
                {...field}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/[^\d]/g, "")
                  field.onChange(value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
