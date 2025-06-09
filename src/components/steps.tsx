import { cn } from "@/lib/utils"
import { useMemo, useState, useRef } from "react"

export const StepSelector = () => {
  const [currentStep, setCurrentStep] = useState(3)
  const containerRef = useRef(null)
  
  const steps = useMemo(() => [
    { id: 1, title: "Order Food", description: "Choose your meal" },
    { id: 2, title: "Add Details", description: "Delivery info" },
    { id: 3, title: "Payment", description: "Pay for order" },
    { id: 4, title: "Confirmation", description: "Order confirmed" },
    { id: 5, title: "Preparation", description: "Kitchen preparing" },
    { id: 6, title: "Delivery", description: "On the way" },
  ], [])

  // Calculate positions for carousel effect
  const getStepPosition = (stepId: number) => {
    const currentIndex = currentStep - 1
    const stepIndex = stepId - 1
    const offset = stepIndex - currentIndex
    
    // Position relative to current step (current step at position 0)
    return offset * 120 // 120px spacing between items
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
    <div className="p-6 max-w-2xl mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Progress</h2>
      
      <div className="mb-6">
        <label className="block mb-3 text-sm font-medium">Simulate Step Progress:</label>
        <div className="flex gap-2 justify-center">
          {[1,2,3,4,5,6].map(num => (
            <button 
              key={num}
              onClick={() => setCurrentStep(num)}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                currentStep === num 
                  ? 'bg-lime-500 text-white shadow-lg' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative h-96 overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 flex items-center justify-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "absolute w-80 p-4 rounded-lg border-2 transition-all duration-700 ease-in-out",
                {
                  "bg-lime-100 border-lime-500 shadow-lg z-10": step.id === currentStep,
                  "bg-green-50 border-green-300": step.id < currentStep,
                  "bg-gray-50 border-gray-200": step.id > currentStep
                }
              )}
              style={{
                transform: `translateY(${getStepPosition(step.id)}px) scale(${getStepScale(step.id)})`,
                opacity: getStepOpacity(step.id),
                zIndex: step.id === currentStep ? 10 : 5 - Math.abs(step.id - currentStep)
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    {
                      "bg-lime-500 text-white": step.id === currentStep,
                      "bg-green-500 text-white": step.id < currentStep,
                      "bg-gray-300 text-gray-600": step.id > currentStep
                    }
                  )}>
                    {step.id < currentStep ? '✓' : step.id}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {step.id < currentStep ? 'Done' : 
                     step.id === currentStep ? 'Active' : 
                     'Pending'}
                  </span>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                <div 
                  className={cn("h-1 rounded-full transition-all duration-500", {
                    "bg-lime-500": step.id === currentStep,
                    "bg-green-500": step.id < currentStep,
                    "bg-gray-300": step.id > currentStep
                  })}
                  style={{
                    width: step.id < currentStep ? '100%' : 
                           step.id === currentStep ? '50%' : '0%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
          disabled={currentStep === 6}
          className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Step {currentStep} of {steps.length}
      </div>
    </div>
  )
}