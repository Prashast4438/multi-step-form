"use client"

import { useFormStore } from "@/store/form-store"

export function Preferences() {
  const { formData, updateNestedFormData, updateFormData } = useFormStore()

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    updateNestedFormData("preferences", "notifications", { [name]: checked })
  }

  const handleThemeChange = (e) => {
    const { value } = e.target
    updateFormData("preferences", { theme: value })
  }

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-medium mb-4">Communication Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="email"
              checked={formData.preferences.notifications.email}
              onChange={handleNotificationChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>Email notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sms"
              checked={formData.preferences.notifications.sms}
              onChange={handleNotificationChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>SMS notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="marketing"
              checked={formData.preferences.notifications.marketing}
              onChange={handleNotificationChange}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>Marketing communications</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Theme Preference</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={formData.preferences.theme === "light"}
              onChange={handleThemeChange}
              className="h-4 w-4 border-gray-300"
            />
            <span>Light theme</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={formData.preferences.theme === "dark"}
              onChange={handleThemeChange}
              className="h-4 w-4 border-gray-300"
            />
            <span>Dark theme</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="theme"
              value="system"
              checked={formData.preferences.theme === "system"}
              onChange={handleThemeChange}
              className="h-4 w-4 border-gray-300"
            />
            <span>System preference</span>
          </label>
        </div>
      </div>
    </div>
  )
}
