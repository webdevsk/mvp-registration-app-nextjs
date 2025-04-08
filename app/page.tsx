import { MultiStepForm } from "@/components/multi-step-form"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Registration Form</h1>
        <MultiStepForm />
      </div>
    </main>
  )
}
