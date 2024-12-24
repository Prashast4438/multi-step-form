import { create } from "zustand"

const initialFormData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  preferences: {
    notifications: {
      email: false,
      sms: false,
      marketing: false,
    },
    theme: "light",
  },
}

export const useFormStore = create((set) => ({
  formData: initialFormData,
  currentStep: 0,

  // Update form data
  updateFormData: (section, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          ...data,
        },
      },
    })),

  // Update nested form data (for preferences)
  updateNestedFormData: (section, subsection, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...state.formData[section],
          [subsection]: {
            ...state.formData[section][subsection],
            ...data,
          },
        },
      },
    })),

  // Navigation
  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  // Reset form
  resetForm: () =>
    set({
      formData: initialFormData,
      currentStep: 0,
    }),
}))
