"use client"

import { motion } from "framer-motion"

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  blur: {
    scale: 1
  }
}

const labelVariants = {
  focus: {
    y: -5,
    color: "hsl(var(--primary))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  blur: {
    y: 0,
    color: "hsl(var(--muted-foreground))"
  }
}

export function FormField({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.label
        className="block text-sm font-medium mb-1"
        variants={labelVariants}
        initial="blur"
        whileFocus="focus"
        animate="blur"
      >
        {label}
      </motion.label>
      <motion.div
        variants={inputVariants}
        initial="blur"
        whileFocus="focus"
        animate="blur"
      >
        {children}
      </motion.div>
      {error && (
        <motion.p
          className="mt-1 text-sm text-destructive"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
