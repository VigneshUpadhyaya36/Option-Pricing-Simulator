import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowLeft, Users, Code, Database, TestTube, FileText, BarChart3, Sparkles, Award, BookOpen } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Mehul Kaushik",
      regNo: "230905024",
      role: "Lead Developer & Documentation Specialist",
      contributions: [
        "Software Requirements Specification (SRS) documentation",
        "System architecture and flowchart design", 
        "Black-Scholes mathematical model implementation",
        "Financial model validation and testing",
        "Technical documentation and user guides"
      ],
      skills: ["Mathematical Modeling", "Technical Writing", "Financial Engineering", "Algorithm Design", "Python/TypeScript"],
      avatar: "MK",
      expertise: "Quantitative Finance & Documentation"
    },
    {
      name: "Hiten Raj Singh", 
      regNo: "230905152",
      role: "Full-Stack Developer & UI/UX Designer",
      contributions: [
        "Monte Carlo simulation module development",
        "Entity-Relationship (ER) design and database modeling",
        "Modern responsive UI/UX development",
        "Comprehensive testing and debugging",
        "Performance optimization and user experience"
      ],
      skills: ["React/TypeScript", "Database Design", "UI/UX Design", "Testing & QA", "Performance Optimization"],
      avatar: "HRS",
      expertise: "Frontend Development & User Experience"
    },
    {
      name: "Vignesh Upadhyaya",
      regNo: "230905006", 
      role: "Backend Developer & System Architect",
      contributions: [
        "PostgreSQL database setup and optimization",
        "System module integration and architecture design",
        "UML diagram creation and system modeling",
        "Backend API development and integration testing",
        "DevOps and deployment pipeline setup"
      ],
      skills: ["Backend Development", "Database Administration", "System Architecture", "DevOps", "API Development"],
      avatar: "VU",
      expertise: "Backend Systems & Integration"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full animate-float" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6 animate-scale-in">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm animate-glow">
                <Users className="h-8 w-8 text-primary animate-pulse-soft" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-slide-up">
              Meet Our Expert Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Three dedicated developers combining quantitative finance expertise, 
              modern web development, and robust system architecture to create 
              a professional-grade option pricing simulator.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:animate-glow transition-all duration-300">
                  {member.avatar}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="font-medium text-primary">
                  {member.role}
                </CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {member.regNo}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {member.expertise}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary animate-pulse-soft" />
                    Key Contributions
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {member.contributions.map((contribution, idx) => (
                      <li key={idx} className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                        <Sparkles className="w-3 h-3 text-primary mt-1 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: `${idx * 0.2}s` }} />
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent animate-pulse-soft" />
                    Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs hover:scale-105 transition-transform duration-300 hover:bg-accent/20"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Overview */}
        <Card className="bg-gradient-card border-border shadow-card mb-8 hover:shadow-glow transition-all duration-500 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20 animate-glow">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              Project Overview
            </CardTitle>
            <CardDescription className="text-lg">
              A comprehensive European option pricing simulator built with cutting-edge web technologies 
              and rigorous financial mathematics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary animate-pulse-soft" />
                  Advanced Features
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse-soft" />
                    <div>
                      <span className="font-medium text-foreground">Black-Scholes Analytical Model:</span> 
                      <br />Complete implementation with all Greeks (Δ, Γ, ν, Θ, ρ) for comprehensive risk analysis
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                    <div>
                      <span className="font-medium text-foreground">Monte Carlo Simulation:</span> 
                      <br />High-performance numerical simulation with customizable paths and statistical validation
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                    <div>
                      <span className="font-medium text-foreground">Advanced Visualizations:</span> 
                      <br />Interactive charts for convergence analysis, Greeks sensitivity, and price path plotting
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
                    <div>
                      <span className="font-medium text-foreground">Real-time Validation:</span> 
                      <br />Comprehensive input validation with financial constraints and error handling
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.8s' }} />
                    <div>
                      <span className="font-medium text-foreground">Professional UI/UX:</span> 
                      <br />Modern, responsive design with animations and accessible interfaces
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Database className="h-5 w-5 text-accent animate-pulse-soft" />
                  Technology Stack
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Code className="w-4 h-4 text-accent mt-0.5 flex-shrink-0 animate-pulse-soft" />
                    <div>
                      <span className="font-medium text-foreground">Frontend:</span> 
                      <br />React 18 with TypeScript for type-safe, modern development
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Code className="w-4 h-4 text-accent mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                    <div>
                      <span className="font-medium text-foreground">Styling:</span> 
                      <br />Tailwind CSS with custom design system and semantic color tokens
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Code className="w-4 h-4 text-accent mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                    <div>
                      <span className="font-medium text-foreground">Visualization:</span> 
                      <br />Recharts for professional financial data visualization and charting
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Code className="w-4 h-4 text-accent mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
                    <div>
                      <span className="font-medium text-foreground">Components:</span> 
                      <br />Shadcn/ui and Radix UI for accessible, customizable component library
                    </div>
                  </li>
                  <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                    <Code className="w-4 h-4 text-accent mt-0.5 flex-shrink-0 animate-pulse-soft" style={{ animationDelay: '0.8s' }} />
                    <div>
                      <span className="font-medium text-foreground">Backend Ready:</span> 
                      <br />Supabase integration prepared for database persistence and user management
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                <TestTube className="h-5 w-5 text-primary animate-pulse-soft" />
                Development Excellence & Methodology
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                This project exemplifies modern software engineering practices in financial technology. 
                Our team employed <span className="font-medium text-foreground">agile development methodologies</span> with 
                clear role distribution and expertise-based task allocation. Each team member leveraged their specialized 
                knowledge - from <span className="font-medium text-foreground">quantitative finance and mathematical modeling</span> 
                to <span className="font-medium text-foreground">full-stack web development and system architecture</span>. 
                <br /><br />
                The result is a <span className="font-medium text-foreground">professional-grade financial tool</span> that 
                successfully bridges theoretical financial mathematics with practical, user-friendly software implementation. 
                Our commitment to <span className="font-medium text-foreground">code quality, documentation, and testing</span> ensures 
                reliability and maintainability for future enhancements and academic or professional use.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-500 animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              <Mail className="h-6 w-6 text-primary animate-pulse-soft" />
              Get In Touch
            </CardTitle>
            <CardDescription className="text-lg">
              Interested in our work, want to collaborate, or contribute to the project?
              <br />We'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="outline" size="sm" className="hover:scale-110 transition-all duration-300 hover:shadow-glow group">
                <Github className="h-4 w-4 mr-2 group-hover:animate-pulse-soft" />
                View on GitHub
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-110 transition-all duration-300 hover:shadow-glow group">
                <Mail className="h-4 w-4 mr-2 group-hover:animate-pulse-soft" />
                Contact Team
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-110 transition-all duration-300 hover:shadow-glow group">
                <Linkedin className="h-4 w-4 mr-2 group-hover:animate-pulse-soft" />
                Connect
              </Button>
            </div>
            <div className="pt-4 border-t border-border/50 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-muted-foreground">
                This project showcases our commitment to excellence in financial technology development.
                <br />Ready to build the future of quantitative finance together.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;