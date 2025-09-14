import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, BarChart3, Zap, Brain, Target, ArrowRight, CheckCircle, Sparkles, Activity } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-hero pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm animate-glow">
                <Calculator className="h-10 w-10 text-primary animate-pulse-soft" />
              </div>
              <div className="p-4 rounded-full bg-accent/20 backdrop-blur-sm animate-glow" style={{ animationDelay: '0.5s' }}>
                <TrendingUp className="h-10 w-10 text-accent animate-pulse-soft" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 animate-scale-in">
              Option Pricing Simulator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up">
              Professional-grade European option pricing using advanced mathematical models. 
              Calculate fair prices with Black-Scholes analytical solutions and Monte Carlo simulations 
              with real-time Greeks analysis for comprehensive risk management.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Badge variant="secondary" className="text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Brain className="h-4 w-4 mr-2" />
                Black-Scholes Model
              </Badge>
              <Badge variant="secondary" className="text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
                <BarChart3 className="h-4 w-4 mr-2" />
                Monte Carlo Simulation
              </Badge>
              <Badge variant="secondary" className="text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Target className="h-4 w-4 mr-2" />
                Greeks Analysis
              </Badge>
              <Badge variant="secondary" className="text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
                <Zap className="h-4 w-4 mr-2" />
                Real-time Results
              </Badge>
            </div>

            <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Link to="/calculator">
                <Button size="lg" className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                  <Sparkles className="mr-2 h-5 w-5 animate-pulse-soft" />
                  Start Calculating
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Advanced Pricing Models</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from industry-standard models for accurate option valuation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Black-Scholes Card */}
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/20 group-hover:animate-glow">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Black-Scholes Model</CardTitle>
              </div>
              <CardDescription className="text-base">
                The Nobel Prize-winning analytical solution for European option pricing developed by Fischer Black, Myron Scholes, and Robert Merton
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-primary animate-pulse-soft" />
                  <span>Instant analytical solution with mathematical precision</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-primary animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                  <span>Complete Greeks calculation (Δ, Γ, ν, Θ, ρ) for risk management</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-primary animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                  <span>Sensitivity analysis and hedging insights</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-primary animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
                  <span>Industry standard benchmark for European options</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Formula:</strong> C = S₀N(d₁) - Ke^(-rT)N(d₂)<br />
                  Perfect for quick pricing and comprehensive sensitivity analysis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monte Carlo Card */}
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-accent/20 group-hover:animate-glow">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Monte Carlo Simulation</CardTitle>
              </div>
              <CardDescription className="text-base">
                Numerical simulation using geometric Brownian motion for statistical option pricing validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-accent animate-pulse-soft" />
                  <span>Customizable simulation paths (1K to 1M+ simulations)</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-accent animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                  <span>95% confidence intervals and statistical error analysis</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-accent animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                  <span>Price convergence visualization and path plotting</span>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-2 transition-transform duration-300">
                  <CheckCircle className="h-5 w-5 text-accent animate-pulse-soft" style={{ animationDelay: '0.6s' }} />
                  <span>Reproducible results with seeded random generation</span>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Model:</strong> S_T = S₀ × exp((r-σ²/2)T + σ√T×Z)<br />
                  Ideal for complex scenarios and Black-Scholes validation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for professional option pricing and risk analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border shadow-card text-center p-6 hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group">
            <div className="p-3 rounded-lg bg-primary/20 w-fit mx-auto mb-4 group-hover:animate-glow">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Calculations</h3>
            <p className="text-muted-foreground leading-relaxed">
              Comprehensive option pricing with volatility surfaces, dividend yields, and time decay analysis
            </p>
            <div className="mt-4 flex justify-center">
              <Activity className="h-5 w-5 text-primary animate-pulse-soft" />
            </div>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card text-center p-6 hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group" style={{ animationDelay: '0.2s' }}>
            <div className="p-3 rounded-lg bg-accent/20 w-fit mx-auto mb-4 group-hover:animate-glow">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Results</h3>
            <p className="text-muted-foreground leading-relaxed">
              Instant pricing updates with interactive parameter adjustment and live sensitivity analysis
            </p>
            <div className="mt-4 flex justify-center">
              <Activity className="h-5 w-5 text-accent animate-pulse-soft" />
            </div>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card text-center p-6 hover:shadow-glow transition-all duration-500 hover:scale-105 animate-slide-up group" style={{ animationDelay: '0.4s' }}>
            <div className="p-3 rounded-lg bg-primary/20 w-fit mx-auto mb-4 group-hover:animate-glow">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
            <p className="text-muted-foreground leading-relaxed">
              Complete Greeks suite for comprehensive risk assessment, hedging strategies, and portfolio management
            </p>
            <div className="mt-4 flex justify-center">
              <Activity className="h-5 w-5 text-primary animate-pulse-soft" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;