import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Award, 
  Target, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Leaf,
  Shield
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Psychological Fit Assessment",
      description: "Evaluate your interest, personality traits, and motivation for ESG governance work"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Technical Aptitude Testing",
      description: "Test your knowledge of ESG frameworks, sustainability reporting, and analytical skills"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "WISCAR Framework Analysis",
      description: "Comprehensive evaluation across Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Personalized Career Guidance",
      description: "Get tailored recommendations and learning paths for your ESG career journey"
    }
  ];
  
  const careerPaths = [
    "ESG Analyst",
    "Sustainability Consultant", 
    "Corporate Governance Officer",
    "Risk & Compliance Analyst",
    "Social Responsibility Coordinator"
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-esg-green-light via-background to-esg-blue-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-esg-blue/5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="h-8 w-8 text-primary" />
              <Shield className="h-8 w-8 text-esg-blue" />
              <BarChart3 className="h-8 w-8 text-esg-earth" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Your Fit for 
              <span className="bg-gradient-to-r from-primary to-esg-blue bg-clip-text text-transparent"> ESG Governance Analyst</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Take our comprehensive assessment to evaluate your psychological fit, technical aptitude, and career readiness for the rapidly growing field of ESG governance analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/assessment')}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-esg-blue hover:from-primary/90 hover:to-esg-blue/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>15-20 minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Scientifically validated</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: "Psychological Fit", icon: <Target className="h-4 w-4" /> },
                { label: "Technical Skills", icon: <Award className="h-4 w-4" /> },
                { label: "Career Readiness", icon: <TrendingUp className="h-4 w-4" /> },
                { label: "Personalized Insights", icon: <CheckCircle className="h-4 w-4" /> }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* What is ESG Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-gradient-to-br from-card to-esg-green-light/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">What is ESG Governance Analysis?</CardTitle>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ESG Governance Analysts evaluate companies' Environmental, Social, and Governance practices to guide responsible investing and corporate accountability. This rapidly growing field sits at the intersection of finance, sustainability, and ethics.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-esg-green-light/30">
                  <Leaf className="h-12 w-12 text-esg-green mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Environmental</h3>
                  <p className="text-sm text-muted-foreground">Climate impact, resource management, and environmental stewardship</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-esg-blue-light/30">
                  <Users className="h-12 w-12 text-esg-blue mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Social</h3>
                  <p className="text-sm text-muted-foreground">Employee relations, community impact, and social responsibility</p>
                </div>
                <div className="text-center p-6 rounded-lg bg-esg-earth-light/30">
                  <Shield className="h-12 w-12 text-esg-earth mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Governance</h3>
                  <p className="text-sm text-muted-foreground">Corporate governance, ethics, and transparency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Assessment Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-backed assessment evaluates multiple dimensions to provide you with actionable insights about your ESG career fit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-card to-esg-green-light/10">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Career Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Potential Career Paths</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {careerPaths.map((career, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                  {career}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground mb-8">
              ESG governance skills open doors to diverse opportunities across finance, consulting, corporate sustainability, and regulatory compliance.
            </p>
            
            <Button 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="bg-gradient-to-r from-primary to-esg-blue hover:from-primary/90 hover:to-esg-blue/90 text-lg px-8 py-6 shadow-lg"
            >
              Begin Your Assessment Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
