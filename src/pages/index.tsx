import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function Home() {

  const [currentStep, setCurrentStep] = useState(1)

  const totalSteps = 6

  const validateStep1 = () => {
    return true
  }

  const validateStep2 = () => {
    return true
  }

  const validateStep3 = () => {
    return true
  }

  const validateStep4 = () => {
    return true
  }

  const handleNext = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
      case 4:
        isValid = validateStep4()
        break
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (validateStep4()) {
      // Simulate API call
      console.log("Submitting form data:")
      alert("Account created successfully!")
      // Reset form or redirect
    }
  }

  const getStepIcon = (step: number) => {
    return <span className="size-24 bg-amber-500">{step}</span>
  }

  const getStepTitle = () => {
    const titles = ["Personal Information", "Account Security", "Profile Setup", "Review & Confirm"]
    return titles[currentStep - 1]
  }

  const getStepDescription = () => {
    const descriptions = [
      "Tell us who you are",
      "Secure your account",
      "Personalize your profile",
      "Review and create your account",
    ]
    return descriptions[currentStep - 1]
  }
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[140px_1fr_20px] items-center justify-items-center min-h-screen p-32 gap-64 sm:p-40 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="text-center w-full">
        <div className="flex justify-center mb-16">{getStepIcon(currentStep)}</div>
        <div className="text-2xl font-bold">{getStepTitle()}</div>
        <div>{getStepDescription()}</div>

        {/* Progress Bar */}
        <div className="mt-24">
          <div className="flex w-full justify-between text-sm text-muted-foreground mb-8">
            <span>
              Step {currentStep} of {totalSteps} total steps
            </span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-8" />
        </div>
      </div>
      <main className="row-start-2 items-center sm:items-start px-24 space-y-6 h-full flex-grow border border-red-400 w-full">
        {currentStep === 1 && (
          <div className="space-y-4">
            Step 1
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            Step 2
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            Step 3
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">

            Step 4

          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-24 flex-wrap items-center justify-center bg-lime-400">
        This is the footer <br />
        And this is more content
      </footer>
    </div>
  );
}
