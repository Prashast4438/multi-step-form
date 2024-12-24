"use client"

import { useFormStore } from "@/store/form-store"
import { useState } from "react"
import { validateZipCode } from "@/utils/validation"

export function AddressDetails() {
  const { formData, updateFormData } = useFormStore()
  const [errors, setErrors] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case "zipCode":
        return validateZipCode(value) ? "" : "Invalid postal code format"
      default:
        return value.trim() ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData("address", { [name]: value })
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="street">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-input bg-background"
          placeholder="123 Main St"
        />
        {errors.street && (
          <p className="mt-1 text-sm text-destructive">{errors.street}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
            placeholder="New York"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-destructive">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.address.state}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
            placeholder="NY"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-destructive">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="zipCode">
            Postal Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
            placeholder="10001"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-destructive">{errors.zipCode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
            placeholder="United States"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-destructive">{errors.country}</p>
          )}
        </div>
      </div>
    </div>
  )
}
