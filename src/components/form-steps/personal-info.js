"use client"

import { useFormStore } from "@/store/form-store"
import { useState } from "react"
import { validateEmail, validatePhone } from "@/utils/validation"
import { FormField } from "@/components/ui/form-field"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function PersonalInfo() {
  const { formData, updateFormData } = useFormStore()
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return validateEmail(value) ? "" : "Invalid email format"
      case "phone":
        return validatePhone(value) ? "" : "Invalid phone number format"
      default:
        return value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData("personal", { [name]: value })
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4 max-w-md"
    >
      <FormField label="Full Name" error={errors.fullName}>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.personal.fullName}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="John Doe"
        />
      </FormField>

      <FormField label="Email" error={errors.email}>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.personal.email}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="john@example.com"
        />
      </FormField>

      <FormField label="Phone Number" error={errors.phone}>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.personal.phone}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="+1 (555) 000-0000"
        />
      </FormField>
    </motion.div>
  )
}
