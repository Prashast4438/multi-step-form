"use client"

import { motion } from "framer-motion"

export function ProgressBar({ progress }) {
  return (
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  )
}
