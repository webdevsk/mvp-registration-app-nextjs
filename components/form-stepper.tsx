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
  return (
    <div className="relative">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={cn(
                "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                currentStep > step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : currentStep === step.id
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
              )}>
              {currentStep > step.id ? <CheckIcon className="h-5 w-5" /> : step.id}
            </div>
            <span className="mt-2 hidden text-sm font-medium sm:block">{step.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-5 right-0 left-0 h-0.5 -translate-y-1/2">
        <div className="bg-muted-foreground/30 h-full" />
        <div
          className="bg-primary absolute top-0 left-0 h-full transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
