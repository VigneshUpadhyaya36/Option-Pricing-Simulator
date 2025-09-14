import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp } from "lucide-react";

export interface FormInputs {
  spotPrice: number;
  strikePrice: number;
  maturity: number;
  riskFreeRate: number;
  volatility: number;
  dividendYield: number;
  optionType: 'call' | 'put';
  monteCarloPaths: number;
  timeSteps: number;
  randomSeed: number;
}

interface OptionPricingFormProps {
  onCalculate: (inputs: FormInputs) => void;
  isCalculating?: boolean;
}

export function OptionPricingForm({ onCalculate, isCalculating }: OptionPricingFormProps) {
  const [inputs, setInputs] = useState<FormInputs>({
    spotPrice: 100,
    strikePrice: 100,
    maturity: 1,
    riskFreeRate: 0.05,
    volatility: 0.2,
    dividendYield: 0,
    optionType: 'call',
    monteCarloPaths: 100000,
    timeSteps: 252,
    randomSeed: 42
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (inputs.spotPrice <= 0) newErrors.spotPrice = "Must be positive";
    if (inputs.strikePrice <= 0) newErrors.strikePrice = "Must be positive";
    if (inputs.maturity <= 0) newErrors.maturity = "Must be positive";
    if (inputs.riskFreeRate < 0) newErrors.riskFreeRate = "Cannot be negative";
    if (inputs.volatility <= 0 || inputs.volatility > 1) newErrors.volatility = "Must be between 0 and 1";
    if (inputs.dividendYield < 0) newErrors.dividendYield = "Cannot be negative";
    if (inputs.monteCarloPaths < 1000) newErrors.monteCarloPaths = "Minimum 1,000 paths";
    if (inputs.timeSteps < 1) newErrors.timeSteps = "Must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      onCalculate(inputs);
    }
  };

  const updateInput = (key: keyof FormInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Option Parameters
        </CardTitle>
        <CardDescription>
          Enter the option parameters for Black-Scholes and Monte Carlo pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Parameters */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spotPrice">Current Stock Price ($)</Label>
                <Input
                  id="spotPrice"
                  type="number"
                  step="0.01"
                  value={inputs.spotPrice}
                  onChange={(e) => updateInput('spotPrice', parseFloat(e.target.value) || 0)}
                  className={errors.spotPrice ? "border-destructive" : ""}
                />
                {errors.spotPrice && <p className="text-sm text-destructive">{errors.spotPrice}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="strikePrice">Strike Price ($)</Label>
                <Input
                  id="strikePrice"
                  type="number"
                  step="0.01"
                  value={inputs.strikePrice}
                  onChange={(e) => updateInput('strikePrice', parseFloat(e.target.value) || 0)}
                  className={errors.strikePrice ? "border-destructive" : ""}
                />
                {errors.strikePrice && <p className="text-sm text-destructive">{errors.strikePrice}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maturity">Time to Maturity (years)</Label>
                <Input
                  id="maturity"
                  type="number"
                  step="0.01"
                  value={inputs.maturity}
                  onChange={(e) => updateInput('maturity', parseFloat(e.target.value) || 0)}
                  className={errors.maturity ? "border-destructive" : ""}
                />
                {errors.maturity && <p className="text-sm text-destructive">{errors.maturity}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="optionType">Option Type</Label>
                <Select value={inputs.optionType} onValueChange={(value) => updateInput('optionType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Call Option</SelectItem>
                    <SelectItem value="put">Put Option</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="riskFreeRate">Risk-Free Rate (%)</Label>
                <Input
                  id="riskFreeRate"
                  type="number"
                  step="0.001"
                  value={(inputs.riskFreeRate * 100).toFixed(1)}
                  onChange={(e) => updateInput('riskFreeRate', (parseFloat(e.target.value) || 0) / 100)}
                  className={errors.riskFreeRate ? "border-destructive" : ""}
                />
                {errors.riskFreeRate && <p className="text-sm text-destructive">{errors.riskFreeRate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="volatility">Volatility (%)</Label>
                <Input
                  id="volatility"
                  type="number"
                  step="0.01"
                  value={(inputs.volatility * 100).toFixed(1)}
                  onChange={(e) => updateInput('volatility', (parseFloat(e.target.value) || 0) / 100)}
                  className={errors.volatility ? "border-destructive" : ""}
                />
                {errors.volatility && <p className="text-sm text-destructive">{errors.volatility}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
                <Input
                  id="dividendYield"
                  type="number"
                  step="0.01"
                  value={(inputs.dividendYield * 100).toFixed(1)}
                  onChange={(e) => updateInput('dividendYield', (parseFloat(e.target.value) || 0) / 100)}
                  className={errors.dividendYield ? "border-destructive" : ""}
                />
                {errors.dividendYield && <p className="text-sm text-destructive">{errors.dividendYield}</p>}
              </div>
            </div>
          </div>

          <Separator />

          {/* Monte Carlo Parameters */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monte Carlo Settings
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monteCarloPaths">Number of Paths</Label>
                <Input
                  id="monteCarloPaths"
                  type="number"
                  value={inputs.monteCarloPaths}
                  onChange={(e) => updateInput('monteCarloPaths', parseInt(e.target.value) || 0)}
                  className={errors.monteCarloPaths ? "border-destructive" : ""}
                />
                {errors.monteCarloPaths && <p className="text-sm text-destructive">{errors.monteCarloPaths}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSteps">Time Steps</Label>
                <Input
                  id="timeSteps"
                  type="number"
                  value={inputs.timeSteps}
                  onChange={(e) => updateInput('timeSteps', parseInt(e.target.value) || 0)}
                  className={errors.timeSteps ? "border-destructive" : ""}
                />
                {errors.timeSteps && <p className="text-sm text-destructive">{errors.timeSteps}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="randomSeed">Random Seed</Label>
                <Input
                  id="randomSeed"
                  type="number"
                  value={inputs.randomSeed}
                  onChange={(e) => updateInput('randomSeed', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            disabled={isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Option Price"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}