"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Settings, User, FileText, HelpCircle, LogOut, Home as HomeIcon } from "lucide-react"
import { Geist, Geist_Mono } from "next/font/google"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { StepSelector } from "@/components/steps"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

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

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <SidebarProvider defaultOpen={false}>
        <Sidebar side="right" collapsible="offcanvas">
          <SidebarHeader>
            <div className="p-4">
              <h2 className="text-xl font-bold">Setup Wizard</h2>
              <p className="text-sm text-muted-foreground">Complete your account setup</p>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent >
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={true}>
                      <a href="#">
                        <HomeIcon className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Documents</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Setup Progress</SidebarGroupLabel>
              <SidebarGroupContent>
                Second group
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-screen relative">
            <div className="p-8 text-center">

              <div className="flex justify-between items-start mb-4 absolute w-full p-24">
                <div className="top-16">
                  <StepSelector
                    currentStep={currentStep}
                  />
                </div>
                <SidebarTrigger
                  className="ml-auto"
                  iconClassName="size-28" />
              </div>
            </div>

            <main className="p-32 space-y-6 flex-grow bg-lime-400 flex flex-col justify-between">
              <div className="flex-grow">
                {currentStep === 1 && <div className="space-y-4">
                  Step 1
                </div>}

                {currentStep === 2 && <div className="space-y-4">Step 2</div>}

                {currentStep === 3 && <div className="space-y-4">Step 3</div>}

                {currentStep === 4 && <div className="space-y-6">Step 4</div>}
              </div>
              <div className="flex justify-between justify-self-end pt-6">
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

            <footer className="p-4 text-center text-sm text-muted-foreground">
              This is the footer <br />
              And this is more content
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
