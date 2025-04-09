"use client"

import type { Control } from "react-hook-form"
import type { FormValues } from "../../lib/form-schema"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface AddressDetailsStepProps {
  control: Control<FormValues>
}

export function AddressDetailsStep({ control }: AddressDetailsStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Address Details</h2>
        <p className="text-muted-foreground text-sm">Please provide your address information.</p>
      </div>

      <FormField
        control={control}
        name="streetAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="New York" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zip Code</FormLabel>
            <FormControl>
              <Input
                placeholder="10001"
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
