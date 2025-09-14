// Monte Carlo simulation for option pricing
export interface MonteCarloInputs {
  S: number; // Current stock price
  K: number; // Strike price
  T: number; // Time to maturity (in years)
  r: number; // Risk-free interest rate (as decimal)
  sigma: number; // Volatility (as decimal)
  q?: number; // Dividend yield (as decimal, optional, default 0)
  numPaths: number; // Number of simulation paths (recommended: 10,000 - 1,000,000)
  numSteps: number; // Number of time steps (recommended: 50 - 252 for daily steps)
  seed?: number; // Random seed for reproducibility (optional)
}

export interface MonteCarloResult {
  optionPrice: number;
  standardError: number;
  confidenceInterval: [number, number]; // 95% confidence interval
  convergencePath: number[]; // Price convergence data for visualization
  paths: number[][]; // Sample price paths for visualization (max 100 paths)
}

// Simple linear congruential generator for reproducible random numbers
class SimpleRandom {
  private seed: number;
  
  constructor(seed: number = Date.now()) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }
  
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
  
  // Box-Muller transformation for normal random variables
  nextGaussian(): number {
    const u1 = this.next();
    const u2 = this.next();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}

export function monteCarloOptionPrice(inputs: MonteCarloInputs, isCall: boolean = true): MonteCarloResult {
  const { S, K, T, r, sigma, q = 0, numPaths, numSteps, seed } = inputs;
  
  // Input validation
  if (T <= 0) throw new Error("Time to maturity must be positive");
  if (sigma <= 0) throw new Error("Volatility must be positive");
  if (numPaths < 1000) throw new Error("Number of paths should be at least 1,000 for reliable results");
  if (numSteps < 1) throw new Error("Number of steps must be at least 1");
  
  // Time step and Geometric Brownian Motion parameters
  const dt = T / numSteps;
  const drift = (r - q - 0.5 * sigma * sigma) * dt;
  const diffusion = sigma * Math.sqrt(dt);
  const discountFactor = Math.exp(-r * T);
  
  // Initialize random number generator
  const rng = new SimpleRandom(seed);
  const payoffs: number[] = [];
  const convergencePath: number[] = [];
  const samplePaths: number[][] = [];
  
  // Store sample paths for visualization (limited to 100 for performance)
  const maxStoredPaths = Math.min(numPaths, 100);
  
  let runningSum = 0;
  let runningSumSquared = 0;
  
  // Monte Carlo simulation loop
  for (let i = 0; i < numPaths; i++) {
    let currentPrice = S;
    const path: number[] = [currentPrice];
    
    // Simulate one price path using Geometric Brownian Motion
    // dS = S(μdt + σdW) where μ = r - q
    for (let j = 0; j < numSteps; j++) {
      const z = rng.nextGaussian(); // Standard normal random variable
      // Exact solution: S(t+dt) = S(t) * exp((r-q-σ²/2)dt + σ√dt*Z)
      currentPrice *= Math.exp(drift + diffusion * z);
      
      // Store path data for visualization
      if (i < maxStoredPaths) {
        path.push(currentPrice);
      }
    }
    
    // Calculate option payoff at maturity
    const payoff = isCall 
      ? Math.max(currentPrice - K, 0)  // Call payoff: max(S_T - K, 0)
      : Math.max(K - currentPrice, 0); // Put payoff: max(K - S_T, 0)
    
    payoffs.push(payoff);
    runningSum += payoff;
    runningSumSquared += payoff * payoff;
    
    // Store path for visualization
    if (i < maxStoredPaths) {
      samplePaths.push(path);
    }
    
    // Store convergence data for visualization (every 1% of paths or at the end)
    const convergeStep = Math.max(1, Math.floor(numPaths / 100));
    if ((i + 1) % convergeStep === 0 || i === numPaths - 1) {
      const currentMean = runningSum / (i + 1);
      const currentPrice = discountFactor * currentMean;
      convergencePath.push(currentPrice);
    }
  }
  
  // Statistical calculations
  const meanPayoff = runningSum / numPaths;
  const variance = (runningSumSquared / numPaths) - (meanPayoff * meanPayoff);
  const standardError = Math.sqrt(variance / numPaths);
  
  // Present value of option
  const optionPrice = discountFactor * meanPayoff;
  const priceStandardError = discountFactor * standardError;
  
  // 95% confidence interval using normal approximation
  const confidenceInterval: [number, number] = [
    Math.max(0, optionPrice - 1.96 * priceStandardError), // Lower bound (non-negative)
    optionPrice + 1.96 * priceStandardError  // Upper bound
  ];
  
  return {
    optionPrice: Math.max(0, optionPrice), // Ensure non-negative price
    standardError: priceStandardError,
    confidenceInterval,
    convergencePath,
    paths: samplePaths
  };
}