import { notFound } from "next/navigation"
import QuizTakeClient from "./quiz-take-client"

interface QuizPageProps {
  params: {
    id: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  if (!params.id) {
    notFound()
  }

  return <QuizTakeClient quizId={params.id} />
}

export async function generateMetadata({ params }: QuizPageProps) {
  return {
    title: "Take Quiz - Creator Research LMS",
    description: "Take your course quiz to test your knowledge and earn completion credit.",
  }
}