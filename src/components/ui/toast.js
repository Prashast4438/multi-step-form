"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

const TOAST_DURATION = 5000

export function Toast({ message, type = "success", onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, TOAST_DURATION)

    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 ${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2`}
        >
          <span>{message}</span>
          <button
            onClick={() => {
              setIsVisible(false)
              onClose?.()
            }}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
