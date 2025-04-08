import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
}

interface FormStepperProps {
  steps: Step[]
  currentStep: number
}

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  // Calculate progress percentage more precisely
  const totalSteps = steps.length
  const halfOfEach = 100 / totalSteps / 2
  const progressPercentage = (currentStep / totalSteps) * 100 - halfOfEach

  return (
    <div className="relative mb-8">
      {/* Step indicators */}
      <div className="flex w-full items-center">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-1 flex-col items-center">
            <div
              className={cn(
                "z-10 flex size-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                currentStep > step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep === step.id
                    ? "border-primary text-primary"
                    : "border-muted-foreground/40 text-muted-foreground"
              )}>
              {currentStep > step.id ? <CheckIcon className="h-5 w-5" /> : step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-sm font-medium transition-colors duration-200",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground/70",
                // Hide text on small screens but show for the current step
                "hidden sm:block"
              )}>
              {step.name}
            </span>
            {/* Show abbreviated step name on mobile */}
            <span
              className={cn(
                "mt-2 text-xs font-medium transition-colors duration-200 sm:hidden",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground/70"
              )}>
              {step.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar background */}
      <div className="absolute top-5 right-0 left-0 h-0.5 -translate-y-1/2">
        <div className="bg-muted-foreground/20 h-full rounded-full" />
        {/* Active progress bar */}
        <div
          className="bg-primary absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `calc(${progressPercentage}% - (40px/2))`, // Adjust for the size of the step indicators
          }}
        />
      </div>
    </div>
  )
}
