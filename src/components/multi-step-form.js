"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Stepper } from "@/components/ui/stepper"
import { FormStep } from "@/components/ui/form-step"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Spinner } from "@/components/ui/spinner"
import { Toast } from "@/components/ui/toast"
import { PersonalInfo } from "@/components/form-steps/personal-info"
import { AddressDetails } from "@/components/form-steps/address-details"
import { Preferences } from "@/components/form-steps/preferences"
import { Review } from "@/components/form-steps/review"
import { useFormStore } from "@/store/form-store"
import { validateStep } from "@/utils/validation"
import { api } from "@/services/api"

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "address", title: "Address" },
  { id: "preferences", title: "Preferences" },
  { id: "review", title: "Review" },
]

export function MultiStepForm() {
  const { formData, currentStep, setCurrentStep, resetForm } = useFormStore()
  const [errors, setErrors] = useState({})
  const [direction, setDirection] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const validateCurrentStep = () => {
    if (currentStep === steps.length - 1) return true // Review step
    const validation = validateStep(currentStep, formData)
    setErrors(validation.errors)
    return validation.isValid
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    setDirection(-1)
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const response = await api.submitForm(formData)
      setToast({
        type: "success",
        message: "Form submitted successfully!"
      })
      resetForm()
    } catch (error) {
      setToast({
        type: "error",
        message: error.message || "Failed to submit form"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo errors={errors} />
      case 1:
        return <AddressDetails errors={errors} />
      case 2:
        return <Preferences errors={errors} />
      case 3:
        return <Review />
      default:
        return null
    }
  }

  return (
    <div className="mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 max-w-xl">
        <div className="mb-8">
          <Stepper currentStep={currentStep} steps={steps} />
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-primary dark:bg-black rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[600px] flex flex-col">
          <div className="flex-1 mb-8">
            <FormStep>
              {currentStep === 0 && <PersonalInfo />}
              {currentStep === 1 && <AddressDetails />}
              {currentStep === 2 && <Preferences />}
              {currentStep === 3 && <Review />}
            </FormStep>
          </div>

          <div className="flex justify-between pt-6 border-t mt-16">
            <button
              onClick={prevStep}
              className={`px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-opacity duration-300 ${
                currentStep === 0 ? "opacity-0" : "opacity-100"
              }`}
            >
              Previous
            </button>
            <button
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white dark:text-black bg-primary dark:bg-primary/90 rounded-md hover:bg-primary/90 dark:hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" />
                  Submitting...
                </>
              ) : currentStep === steps.length - 1 ? (
                "Submit"
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
