import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target, 
  Download,
  Home,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

interface AssessmentResults {
  psychometric: number;
  technical: number;
  wiscar: number;
  overall: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  
  useEffect(() => {
    const storedResults = localStorage.getItem('assessmentResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);
  
  if (!results) {
    return <div>Loading...</div>;
  }
  
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="h-6 w-6 text-esg-green" />;
      case 'Maybe': return <AlertCircle className="h-6 w-6 text-esg-earth" />;
      case 'No': return <XCircle className="h-6 w-6 text-destructive" />;
      default: return null;
    }
  };
  
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-esg-green text-primary-foreground';
      case 'Maybe': return 'bg-esg-earth text-primary-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  const getInsights = () => {
    const insights = [];
    
    if (results.psychometric >= 80) {
      insights.push("Strong psychological fit for ESG governance work with high interest in sustainability and ethical decision-making.");
    } else if (results.psychometric >= 60) {
      insights.push("Good psychological alignment with some areas for development in ESG interest and motivation.");
    } else {
      insights.push("Consider exploring ESG fundamentals to build stronger interest and motivation in sustainability practices.");
    }
    
    if (results.technical >= 80) {
      insights.push("Excellent technical foundation with strong knowledge of ESG frameworks and analytical skills.");
    } else if (results.technical >= 60) {
      insights.push("Solid technical understanding with opportunities to deepen ESG-specific knowledge.");
    } else {
      insights.push("Recommended to build foundational knowledge in ESG frameworks, sustainability reporting, and governance principles.");
    }
    
    if (results.wiscar >= 80) {
      insights.push("High readiness with strong persistence, learning ability, and real-world job alignment.");
    } else if (results.wiscar >= 60) {
      insights.push("Good overall readiness with some areas to strengthen for optimal performance.");
    } else {
      insights.push("Focus on building persistence, analytical thinking, and familiarity with ESG analyst responsibilities.");
    }
    
    return insights;
  };
  
  const getNextSteps = () => {
    if (results.recommendation === 'Yes') {
      return [
        "Apply for entry-level ESG Analyst positions",
        "Pursue GRI Standards certification",
        "Join ESG professional networks and communities",
        "Start building a portfolio of ESG analysis projects"
      ];
    } else if (results.recommendation === 'Maybe') {
      return [
        "Complete ESG fundamentals course",
        "Gain experience through internships or volunteer projects",
        "Develop stronger data analysis skills",
        "Retake assessment after 6 months of development"
      ];
    } else {
      return [
        "Explore foundational courses in sustainability and governance",
        "Consider alternative roles like Data Analyst or Compliance Assistant",
        "Build analytical and research skills",
        "Reassess career interests and motivations"
      ];
    }
  };
  
  const careerPaths = [
    { title: "ESG Analyst", description: "Assess ESG risks and compliance for investment decisions" },
    { title: "Sustainability Consultant", description: "Guide corporate sustainability strategies and implementation" },
    { title: "Corporate Governance Officer", description: "Manage governance policies and regulatory compliance" },
    { title: "Risk & Compliance Analyst", description: "Monitor regulatory adherence and risk assessment" },
    { title: "Social Responsibility Coordinator", description: "Implement social impact and community initiatives" }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-esg-green-light via-background to-esg-blue-light py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your ESG Governance Analyst Assessment Results</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your readiness and career fit</p>
        </div>
        
        {/* Overall Recommendation */}
        <Card className="mb-8 border-0 bg-gradient-to-r from-card to-esg-green-light/30 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getRecommendationIcon(results.recommendation)}
              <Badge className={`text-lg px-6 py-2 ${getRecommendationColor(results.recommendation)}`}>
                {results.recommendation === 'Yes' ? 'Highly Recommended' : 
                 results.recommendation === 'Maybe' ? 'Conditionally Recommended' : 'Not Currently Recommended'}
              </Badge>
            </div>
            <CardTitle className="text-2xl">Overall Confidence Score: {results.overall}%</CardTitle>
          </CardHeader>
        </Card>
        
        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Psychological Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{results.psychometric}%</span>
                  <Badge variant={results.psychometric >= 70 ? "default" : results.psychometric >= 50 ? "secondary" : "destructive"}>
                    {results.psychometric >= 70 ? "Strong" : results.psychometric >= 50 ? "Moderate" : "Developing"}
                  </Badge>
                </div>
                <Progress value={results.psychometric} className="h-2" />
                <p className="text-sm text-muted-foreground">Interest, personality, and motivation alignment</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-esg-blue" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-esg-blue">{results.technical}%</span>
                  <Badge variant={results.technical >= 70 ? "default" : results.technical >= 50 ? "secondary" : "destructive"}>
                    {results.technical >= 70 ? "Strong" : results.technical >= 50 ? "Moderate" : "Developing"}
                  </Badge>
                </div>
                <Progress value={results.technical} className="h-2" />
                <p className="text-sm text-muted-foreground">ESG knowledge and analytical skills</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-esg-earth" />
                WISCAR Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-esg-earth">{results.wiscar}%</span>
                  <Badge variant={results.wiscar >= 70 ? "default" : results.wiscar >= 50 ? "secondary" : "destructive"}>
                    {results.wiscar >= 70 ? "Strong" : results.wiscar >= 50 ? "Moderate" : "Developing"}
                  </Badge>
                </div>
                <Progress value={results.wiscar} className="h-2" />
                <p className="text-sm text-muted-foreground">Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Insights */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Personalized Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getInsights().map((insight, index) => (
                <div key={index} className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Next Steps and Career Guidance */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getNextSteps().map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Related Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerPaths.slice(0, 3).map((career, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-medium text-foreground">{career.title}</h4>
                    <p className="text-sm text-muted-foreground">{career.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-esg-blue"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;