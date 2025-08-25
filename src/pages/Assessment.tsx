import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  section: string;
  type: 'psychometric' | 'technical' | 'wiscar';
  question: string;
  options: string[];
  correctAnswer?: number;
}

const questions: Question[] = [
  // Psychometric Questions
  {
    id: "psych1",
    section: "Interest Assessment",
    type: "psychometric",
    question: "How interested are you in analyzing corporate sustainability practices?",
    options: ["Not at all interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]
  },
  {
    id: "psych2",
    section: "Personality Traits",
    type: "psychometric",
    question: "I enjoy working with detailed financial and compliance data.",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"]
  },
  {
    id: "psych3",
    section: "Motivation Style",
    type: "psychometric",
    question: "I am motivated by making a positive environmental and social impact through my work.",
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"]
  },
  
  // Technical Questions
  {
    id: "tech1",
    section: "ESG Knowledge",
    type: "technical",
    question: "What does ESG stand for in corporate governance?",
    options: ["Economic, Social, Governance", "Environmental, Strategic, Governance", "Environmental, Social, Governance", "Ethical, Social, Global"],
    correctAnswer: 2
  },
  {
    id: "tech2",
    section: "Frameworks",
    type: "technical",
    question: "Which framework is commonly used for sustainability reporting?",
    options: ["GAAP", "IFRS", "GRI Standards", "SOX"],
    correctAnswer: 2
  },
  {
    id: "tech3",
    section: "Data Analysis",
    type: "technical",
    question: "A company's carbon emissions increased by 15% while revenue grew by 8%. What does this suggest about their carbon intensity?",
    options: ["Carbon intensity improved", "Carbon intensity worsened", "Carbon intensity remained stable", "Cannot determine from this data"],
    correctAnswer: 1
  },
  
  // WISCAR Questions
  {
    id: "wiscar1",
    section: "Will (Persistence)",
    type: "wiscar",
    question: "When faced with complex ESG analysis requiring weeks of research, I:",
    options: ["Often lose motivation", "Sometimes struggle to maintain focus", "Usually stay committed", "Always see it through to completion", "Thrive on long-term challenges"]
  },
  {
    id: "wiscar2",
    section: "Cognitive Readiness",
    type: "wiscar",
    question: "How comfortable are you with analyzing conflicting data sources to form conclusions?",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"]
  },
  {
    id: "wiscar3",
    section: "Real-World Alignment",
    type: "wiscar",
    question: "How well do you think you'd handle presenting ESG findings to senior executives?",
    options: ["Would find it very challenging", "Somewhat challenging", "Moderately confident", "Very confident", "Extremely confident"]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: parseInt(value)
    }));
  };
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate scores and navigate to results
      const scores = calculateScores(answers);
      localStorage.setItem('assessmentResults', JSON.stringify(scores));
      navigate('/results');
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const calculateScores = (answers: Record<string, number>) => {
    const psychometricQuestions = questions.filter(q => q.type === 'psychometric');
    const technicalQuestions = questions.filter(q => q.type === 'technical');
    const wiscarQuestions = questions.filter(q => q.type === 'wiscar');
    
    // Calculate psychometric score (0-100)
    const psychometricScore = psychometricQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] || 0) * 20; // Convert 1-5 scale to 0-100
    }, 0) / psychometricQuestions.length;
    
    // Calculate technical score (0-100)
    const technicalScore = technicalQuestions.reduce((acc, q) => {
      const userAnswer = answers[q.id];
      const isCorrect = q.correctAnswer !== undefined && userAnswer === q.correctAnswer;
      return acc + (isCorrect ? 100 : 0);
    }, 0) / technicalQuestions.length;
    
    // Calculate WISCAR scores
    const wiscarScore = wiscarQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] || 0) * 20;
    }, 0) / wiscarQuestions.length;
    
    // Overall confidence score
    const overallScore = (psychometricScore * 0.3 + technicalScore * 0.4 + wiscarScore * 0.3);
    
    return {
      psychometric: Math.round(psychometricScore),
      technical: Math.round(technicalScore),
      wiscar: Math.round(wiscarScore),
      overall: Math.round(overallScore),
      recommendation: overallScore >= 70 ? 'Yes' : overallScore >= 50 ? 'Maybe' : 'No'
    };
  };
  
  const canProceed = answers[currentQ.id] !== undefined;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-esg-green-light via-background to-esg-blue-light py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">ESG Governance Analyst Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-esg-green-light/20">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span className="text-sm font-medium text-primary">{currentQ.section}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RadioGroup 
              value={answers[currentQ.id]?.toString() || ""} 
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-esg-green-light/30 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-esg-blue text-primary-foreground"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;