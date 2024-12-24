"use client"

import { useFormStore } from "@/store/form-store"

export function Review() {
  const { formData } = useFormStore()

  const getNotificationPreferences = () => {
    const notifications = []
    if (formData.preferences.notifications.email) notifications.push("Email")
    if (formData.preferences.notifications.sms) notifications.push("SMS")
    if (formData.preferences.notifications.marketing) notifications.push("Marketing")
    return notifications.length > 0 ? notifications.join(", ") : "None"
  }

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-medium mb-3">Personal Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Full Name:</span>{" "}
            {formData.personal.fullName || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {formData.personal.email || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{" "}
            {formData.personal.phone || "Not provided"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Address Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Street:</span>{" "}
            {formData.address.street || "Not provided"}
          </p>
          <p>
            <span className="font-medium">City:</span>{" "}
            {formData.address.city || "Not provided"}
          </p>
          <p>
            <span className="font-medium">State:</span>{" "}
            {formData.address.state || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Postal Code:</span>{" "}
            {formData.address.zipCode || "Not provided"}
          </p>
          <p>
            <span className="font-medium">Country:</span>{" "}
            {formData.address.country || "Not provided"}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Preferences</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Theme:</span>{" "}
            {formData.preferences.theme.charAt(0).toUpperCase() +
              formData.preferences.theme.slice(1)}
          </p>
          <p>
            <span className="font-medium">Notifications:</span>{" "}
            {getNotificationPreferences()}
          </p>
        </div>
      </div>
    </div>
  )
}
