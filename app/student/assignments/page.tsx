"use client"

import { useState } from "react"
import { Sidebar, SidebarProvider, SidebarContent, SidebarInset } from "@/components/ui/sidebar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Circle, ArrowRight, ArrowLeft } from "lucide-react"

const steps = [
  { id: 1, title: "Instructions", description: "Read assignment details" },
  { id: 2, title: "Submission", description: "Submit your work" },
  { id: 3, title: "Instructor example", description: "Review example" },
  { id: 4, title: "Give feedback", description: "Provide feedback" },
]

export default function AssignmentPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full print:block">
        <Sidebar className="print:hidden">
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start bg-accent">
                  Assignments
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Grades
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Resources
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="print:w-full print:m-0 print:shadow-none">
          <div className="p-6 max-w-4xl mx-auto print:max-w-none print:p-4">
            {/* Header */}
            <div className="mb-8 print:mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2 print:text-2xl">Assignment: Project Summary</h1>
              <div className="flex items-center gap-4 text-muted-foreground print:flex-col print:items-start print:gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>⏱️ 60 minutes to complete</span>
                </div>
                <Badge variant="secondary">Due: March 15, 2024</Badge>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="mb-8 print:mb-6">
              <div className="flex items-center justify-between relative print:flex-col print:items-start print:gap-4">
                {/* Progress line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-border print:hidden" />
                <div
                  className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-300 print:hidden"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10 print:flex-row print:gap-3">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className="flex items-center justify-center w-12 h-12 rounded-full border-2 bg-background transition-all duration-200 hover:scale-105 print:w-8 print:h-8 print:hover:scale-100"
                      style={{
                        borderColor: currentStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                        backgroundColor: currentStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--background))",
                        color:
                          currentStep >= step.id ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="h-6 w-6 print:h-4 print:w-4" />
                      ) : currentStep === step.id ? (
                        <span className="font-semibold print:text-sm">{step.id}</span>
                      ) : (
                        <Circle className="h-6 w-6 print:h-4 print:w-4" />
                      )}
                    </button>
                    <div className="mt-2 text-center print:mt-0 print:text-left">
                      <div className="font-medium text-sm print:text-xs">{step.title}</div>
                      <div className="text-xs text-muted-foreground print:hidden">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <Card className="print:shadow-none print:border-0">
                    <CardHeader>
                      <h2 className="text-2xl font-semibold print:text-xl">Assignment Instructions</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg print:bg-transparent print:border print:p-3">
                        <p className="text-foreground leading-relaxed">
                          Using what you've learned in section one, write a project summary that is 500 words or more.
                          Your summary should demonstrate understanding of the key concepts covered and provide a
                          comprehensive overview of your project approach.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold print:text-base">Requirements:</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Minimum 500 words</li>
                          <li>Include at least 3 key concepts from section one</li>
                          <li>Provide specific examples from your project</li>
                          <li>Use proper formatting and structure</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="print:shadow-none print:border-0">
                    <CardHeader>
                      <h3 className="text-xl font-semibold print:text-lg">Questions for this assignment</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 border-l-4 border-primary bg-primary/5 print:bg-transparent">
                          <p className="font-medium mb-2">
                            1. Why is it important to include this information in a project summary?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Consider the audience and purpose of your summary when answering this question.
                          </p>
                        </div>

                        <div className="p-4 border-l-4 border-primary bg-primary/5 print:bg-transparent">
                          <p className="font-medium mb-2">
                            2. How do the concepts from section one apply to your specific project?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Provide concrete examples and explain the connections clearly.
                          </p>
                        </div>

                        <div className="p-4 border-l-4 border-primary bg-primary/5 print:bg-transparent">
                          <p className="font-medium mb-2">
                            3. What challenges did you encounter and how did you address them?
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reflect on your problem-solving process and lessons learned.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStep === 2 && (
                <Card className="print:shadow-none print:border-0">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold print:text-xl">Submit Your Work</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-6 border-2 border-dashed border-border rounded-lg text-center print:p-4">
                      <div className="space-y-4">
                        <div className="text-muted-foreground">
                          <p>Upload your project summary document</p>
                          <p className="text-sm">Accepted formats: PDF, DOC, DOCX</p>
                        </div>
                        <Button className="print:hidden">Choose File</Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Submission Checklist:</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Document meets minimum word count (500 words)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">All questions have been addressed</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Document is properly formatted</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="print:shadow-none print:border-0">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold print:text-xl">Instructor Example</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg print:bg-transparent print:border">
                      <h3 className="font-semibold mb-3">Sample Project Summary</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="mb-3">
                          This project demonstrates the application of user-centered design principles learned in
                          section one to create an intuitive mobile application interface...
                        </p>
                        <p className="mb-3">
                          The key concepts applied include information architecture, visual hierarchy, and accessibility
                          guidelines. Each of these elements played a crucial role...
                        </p>
                        <p className="text-muted-foreground text-sm">
                          [This is a truncated example - your full summary should be 500+ words]
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg print:bg-transparent">
                      <h4 className="font-semibold text-amber-800 mb-2">Note from Instructor:</h4>
                      <p className="text-amber-700 text-sm">
                        Notice how this example clearly connects theory to practice and provides specific examples. Use
                        this as a guide for structuring your own summary.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card className="print:shadow-none print:border-0">
                  <CardHeader>
                    <h2 className="text-2xl font-semibold print:text-xl">Give Feedback</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Rate this assignment (1-5 stars)</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="text-2xl text-muted-foreground hover:text-yellow-400 print:hidden"
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          What did you find most helpful about this assignment?
                        </label>
                        <textarea
                          className="w-full p-3 border rounded-lg resize-none print:border-gray-300"
                          rows={3}
                          placeholder="Share your thoughts..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">What could be improved?</label>
                        <textarea
                          className="w-full p-3 border rounded-lg resize-none print:border-gray-300"
                          rows={3}
                          placeholder="Suggestions for improvement..."
                        />
                      </div>

                      <Button className="print:hidden">Submit Feedback</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 print:hidden">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.print()}>
                  Print Assignment
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="flex items-center gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="flex items-center gap-2">
                    Complete Assignment
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
