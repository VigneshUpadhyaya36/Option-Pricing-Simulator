import { useState } from "react";
import { OptionPricingForm, FormInputs } from "@/components/OptionPricingForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { calculateBlackScholes, BlackScholesResult } from "@/lib/blackScholes";
import { monteCarloOptionPrice, MonteCarloResult } from "@/lib/monteCarlo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calculator as CalculatorIcon, Database, Info, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Calculator = () => {
  const [blackScholesResult, setBlackScholesResult] = useState<BlackScholesResult>();
  const [monteCarloResult, setMonteCarloResult] = useState<MonteCarloResult>();
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentInputs, setCurrentInputs] = useState<FormInputs>();
  const { toast } = useToast();

  const handleCalculate = async (inputs: FormInputs) => {
    setIsCalculating(true);
    setCurrentInputs(inputs);
    
    try {
      // Black-Scholes calculation
      const bsInputs = {
        S: inputs.spotPrice,
        K: inputs.strikePrice,
        T: inputs.maturity,
        r: inputs.riskFreeRate,
        sigma: inputs.volatility,
        q: inputs.dividendYield
      };
      
      const bsResult = calculateBlackScholes(bsInputs, inputs.optionType === 'call');
      setBlackScholesResult(bsResult);
      
      // Monte Carlo calculation (simulate delay for large calculations)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mcInputs = {
        ...bsInputs,
        numPaths: inputs.monteCarloPaths,
        numSteps: inputs.timeSteps,
        seed: inputs.randomSeed
      };
      
      const mcResult = monteCarloOptionPrice(mcInputs, inputs.optionType === 'call');
      setMonteCarloResult(mcResult);
      
      toast({
        title: "Calculation Complete",
        description: `${inputs.optionType.charAt(0).toUpperCase() + inputs.optionType.slice(1)} option priced successfully`,
      });
      
    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "Calculation Error",
        description: "An error occurred during pricing calculation",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleDatabaseInfo = () => {
    toast({
      title: "Database Integration Required",
      description: "Connect to Supabase to save and manage calculation history",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm">
                <CalculatorIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Option Pricing Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate European option prices using Black-Scholes and Monte Carlo methods
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Database Integration Notice */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Database Integration Available</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Save calculation history, compare results, and export data by connecting to Supabase.
                  Enable features like run history, filtering, and CSV exports.
                </p>
                <Button variant="outline" onClick={handleDatabaseInfo} className="text-sm">
                  <Info className="h-4 w-4 mr-2" />
                  Learn More About Database Features
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <OptionPricingForm onCalculate={handleCalculate} isCalculating={isCalculating} />

        {/* Results */}
        <ResultsDisplay 
          blackScholesResult={blackScholesResult}
          monteCarloResult={monteCarloResult}
          optionType={currentInputs?.optionType || 'call'}
        />
      </div>
    </div>
  );
};

export default Calculator;