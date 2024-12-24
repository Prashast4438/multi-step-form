import { MultiStepForm } from "@/components/multi-step-form"

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <main className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Multi-Step Form</h1>
        <MultiStepForm />
      </main>
    </div>
  )
}