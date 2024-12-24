// Simulated API delay
const DELAY = 1500

// Simulated API error rate (0 to 1)
const ERROR_RATE = 0.1

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

// Simulate API response
const simulateResponse = async (data) => {
  await new Promise(resolve => setTimeout(resolve, DELAY))
  
  // Simulate random failures
  if (Math.random() < ERROR_RATE) {
    throw new ApiError("Something went wrong", 500)
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    submittedAt: new Date().toISOString()
  }
}

export const api = {
  // Submit form data
  submitForm: async (formData) => {
    try {
      const response = await simulateResponse(formData)
      return response
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError("Network error", 503)
    }
  },

  // Get form submission by ID
  getSubmission: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, DELAY))
      // Simulate not found error
      throw new ApiError("Submission not found", 404)
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError("Network error", 503)
    }
  }
}
