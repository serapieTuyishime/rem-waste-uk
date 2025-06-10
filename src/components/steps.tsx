import { cn } from "@/lib/utils"
import { useMemo, useRef } from "react"

export const StepSelector = ({ currentStep }: { currentStep: number }) => {
  const containerRef = useRef(null)

  const steps = useMemo(() => [
    { id: 1, title: "Postcode" },
    { id: 2, title: "Waste type" },
    { id: 3, title: "Select skip" },
    { id: 4, title: "Permit check"},
    { id: 5, title: "Choose date"},
    { id: 6, title: "Payment" },
  ], [])


  const getStepPosition = (stepId: number) => {
    const currentIndex = currentStep - 1
    const stepIndex = stepId - 1
    const offset = stepIndex - currentIndex

    return offset * 30
  }

  const getStepScale = (stepId: number) => {
    const currentIndex = currentStep - 1
    const stepIndex = stepId - 1
    const distance = Math.abs(stepIndex - currentIndex)

    if (distance === 0) return 1.1 // Current step is larger
    if (distance === 1) return 0.95 // Adjacent steps slightly smaller
    return 0.8 // Distant steps much smaller
  }

  const getStepOpacity = (stepId: number) => {
    const currentIndex = currentStep - 1
    const stepIndex = stepId - 1
    const distance = Math.abs(stepIndex - currentIndex)

    if (distance === 0) return 1 // Current step fully visible
    if (distance === 1) return 0.8 // Adjacent steps slightly faded
    if (distance === 2) return 0.5 // Further steps more faded
    return 0.3 // Distant steps very faded
  }

  return (
    <div className="h-100 w-180">
      <div className="relative h-full overflow-hidden w-full" ref={containerRef}>
        <div className="absolute inset-0 flex items-center justify-center ">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "absolute w-150 p-8 rounded-lg transition-all duration-700 ease-in-out",
                {
                  "bg-lime-100 shadow-lg z-10": step.id === currentStep,
                  "bg-green-50": step.id < currentStep,
                  "bg-gray-50": step.id > currentStep
                }
              )}
              style={{
                transform: `translateY(${getStepPosition(step.id)}px) scale(${getStepScale(step.id)})`,
                opacity: getStepOpacity(step.id),
                zIndex: step.id === currentStep ? 10 : 5 - Math.abs(step.id - currentStep)
              }}
            >
              <h3 className="font-semibold text-gray-800 text-sm">{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}