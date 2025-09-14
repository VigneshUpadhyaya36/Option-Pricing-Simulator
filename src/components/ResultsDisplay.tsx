import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlackScholesResult } from "@/lib/blackScholes";
import { MonteCarloResult } from "@/lib/monteCarlo";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from "recharts";
import { TrendingUp, Calculator, Target, DollarSign } from "lucide-react";

interface ResultsDisplayProps {
  blackScholesResult?: BlackScholesResult;
  monteCarloResult?: MonteCarloResult;
  optionType: 'call' | 'put';
}

export function ResultsDisplay({ blackScholesResult, monteCarloResult, optionType }: ResultsDisplayProps) {
  if (!blackScholesResult && !monteCarloResult) {
    return null;
  }

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatNumber = (value: number, decimals: number = 4) => value.toFixed(decimals);

  const greeksData = blackScholesResult ? [
    { name: 'Delta', value: blackScholesResult.greeks.delta, color: '#3B82F6' },
    { name: 'Gamma', value: blackScholesResult.greeks.gamma, color: '#10B981' },
    { name: 'Theta', value: blackScholesResult.greeks.theta, color: '#F59E0B' },
    { name: 'Vega', value: blackScholesResult.greeks.vega, color: '#8B5CF6' },
    { name: 'Rho', value: blackScholesResult.greeks.rho, color: '#EF4444' }
  ] : [];

  const convergenceData = monteCarloResult?.convergencePath.map((price, index) => ({
    iteration: index + 1,
    price: price
  })) || [];

  const pathsData = monteCarloResult?.paths.slice(0, 10).map((path, pathIndex) => 
    path.map((price, step) => ({
      step,
      price,
      pathIndex
    }))
  ).flat() || [];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prices">Option Prices</TabsTrigger>
          <TabsTrigger value="greeks">Greeks Analysis</TabsTrigger>
          <TabsTrigger value="monte-carlo">Monte Carlo</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blackScholesResult && (
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Black-Scholes Price
                  </CardTitle>
                  <CardDescription>Analytical solution using closed-form formula</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatCurrency(blackScholesResult.optionPrice)}
                    </div>
                    <Badge variant="secondary" className="mb-4">
                      {optionType.charAt(0).toUpperCase() + optionType.slice(1)} Option
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {monteCarloResult && (
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Monte Carlo Price
                  </CardTitle>
                  <CardDescription>Simulation-based pricing with confidence interval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {formatCurrency(monteCarloResult.optionPrice)}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      ±{formatCurrency(monteCarloResult.standardError)} (std error)
                    </div>
                    <div className="text-xs text-muted-foreground">
                      95% CI: {formatCurrency(monteCarloResult.confidenceInterval[0])} - {formatCurrency(monteCarloResult.confidenceInterval[1])}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {blackScholesResult && monteCarloResult && (
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  Price Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">Difference</div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(Math.abs(blackScholesResult.optionPrice - monteCarloResult.optionPrice))}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">% Difference</div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatPercent(Math.abs(blackScholesResult.optionPrice - monteCarloResult.optionPrice) / blackScholesResult.optionPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Within CI?</div>
                    <div className="text-2xl font-bold">
                      <Badge 
                        variant={
                          blackScholesResult.optionPrice >= monteCarloResult.confidenceInterval[0] && 
                          blackScholesResult.optionPrice <= monteCarloResult.confidenceInterval[1] 
                            ? "default" 
                            : "destructive"
                        }
                      >
                        {blackScholesResult.optionPrice >= monteCarloResult.confidenceInterval[0] && 
                         blackScholesResult.optionPrice <= monteCarloResult.confidenceInterval[1] 
                          ? "Yes" 
                          : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="greeks" className="space-y-4">
          {blackScholesResult ? (
            <div className="space-y-4">
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle>Option Greeks</CardTitle>
                  <CardDescription>Risk sensitivities and price derivatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={greeksData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="bg-gradient-card border-border shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">Delta</div>
                      <div className="text-2xl font-bold">{formatNumber(blackScholesResult.greeks.delta)}</div>
                      <div className="text-xs text-muted-foreground">Price sensitivity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">Gamma</div>
                      <div className="text-2xl font-bold">{formatNumber(blackScholesResult.greeks.gamma)}</div>
                      <div className="text-xs text-muted-foreground">Delta sensitivity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">Theta</div>
                      <div className="text-2xl font-bold">{formatNumber(blackScholesResult.greeks.theta)}</div>
                      <div className="text-xs text-muted-foreground">Time decay (per day)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">Vega</div>
                      <div className="text-2xl font-bold">{formatNumber(blackScholesResult.greeks.vega)}</div>
                      <div className="text-xs text-muted-foreground">Volatility sensitivity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-border shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-muted-foreground">Rho</div>
                      <div className="text-2xl font-bold">{formatNumber(blackScholesResult.greeks.rho)}</div>
                      <div className="text-xs text-muted-foreground">Rate sensitivity</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="bg-gradient-card border-border shadow-card">
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  Greeks analysis requires Black-Scholes calculation
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="monte-carlo" className="space-y-4">
          {monteCarloResult ? (
            <div className="space-y-4">
              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle>Price Convergence</CardTitle>
                  <CardDescription>How the Monte Carlo price estimate converges over iterations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={convergenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="iteration" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--accent))" 
                          strokeWidth={2}
                          dot={false}
                        />
                        {blackScholesResult && (
                          <ReferenceLine 
                            y={blackScholesResult.optionPrice} 
                            stroke="hsl(var(--primary))" 
                            strokeDasharray="5 5"
                            label="Black-Scholes"
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle>Sample Price Paths</CardTitle>
                  <CardDescription>First 10 simulated stock price paths</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pathsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="step" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        {[...Array(10)].map((_, i) => (
                          <Line 
                            key={i}
                            type="monotone" 
                            dataKey="price" 
                            data={pathsData.filter(d => d.pathIndex === i)}
                            stroke={`hsl(${210 + i * 15} 70% 60%)`}
                            strokeWidth={1}
                            dot={false}
                            connectNulls={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-gradient-card border-border shadow-card">
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  Monte Carlo analysis requires simulation calculation
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}