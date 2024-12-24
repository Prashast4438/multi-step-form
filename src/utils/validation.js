export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/
  return phoneRegex.test(phone)
}

export const validateZipCode = (zipCode) => {
  // Allow any alphanumeric postal code format with optional spaces and hyphens
  const zipRegex = /^[\w\s-]{3,10}$/
  return zipRegex.test(zipCode)
}

export const validateStep = (step, formData) => {
  const errors = {}
  let isValid = true

  switch (step) {
    case 0: // Personal Info
      if (!formData.personal.fullName.trim()) {
        errors.fullName = "Full name is required"
        isValid = false
      }
      if (!formData.personal.email) {
        errors.email = "Email is required"
        isValid = false
      } else if (!validateEmail(formData.personal.email)) {
        errors.email = "Invalid email format"
        isValid = false
      }
      if (!formData.personal.phone) {
        errors.phone = "Phone number is required"
        isValid = false
      } else if (!validatePhone(formData.personal.phone)) {
        errors.phone = "Invalid phone number format"
        isValid = false
      }
      break

    case 1: // Address
      if (!formData.address.street.trim()) {
        errors.street = "Street address is required"
        isValid = false
      }
      if (!formData.address.city.trim()) {
        errors.city = "City is required"
        isValid = false
      }
      if (!formData.address.state.trim()) {
        errors.state = "State is required"
        isValid = false
      }
      if (!formData.address.zipCode) {
        errors.zipCode = "Postal code is required"
        isValid = false
      } else if (!validateZipCode(formData.address.zipCode)) {
        errors.zipCode = "Invalid postal code format"
        isValid = false
      }
      if (!formData.address.country.trim()) {
        errors.country = "Country is required"
        isValid = false
      }
      break

    case 2: // Preferences
      // Preferences are optional
      break

    default:
      break
  }

  return { isValid, errors }
}
