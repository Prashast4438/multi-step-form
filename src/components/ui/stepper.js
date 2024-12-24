"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

const stepVariants = {
  inactive: {
    backgroundColor: "var(--background)",
    borderColor: "hsl(var(--muted))",
    color: "hsl(var(--muted-foreground))",
    opacity: 0.5,
  },
  active: {
    backgroundColor: "var(--background)",
    borderColor: "hsl(var(--primary))",
    color: "hsl(var(--primary))",
    opacity: 1,
  },
  complete: {
    backgroundColor: "hsl(var(--primary))",
    borderColor: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    opacity: 1,
  },
}

export function Stepper({ steps, currentStep }) {
  return (
    <div className="relative flex w-full justify-between">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index
        const isCurrent = currentStep === index

        return (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={
                isCompleted ? "complete" : isCurrent ? "active" : "inactive"
              }
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2"
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`mt-2 text-sm ${
                isCurrent ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </motion.span>
          </div>
        )
      })}
      <div className="absolute top-5 left-0 -z-10 h-[2px] w-full bg-muted">
        <motion.div
          className="h-full bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: currentStep / (steps.length - 1) }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
