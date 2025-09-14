// Black-Scholes pricing model implementation
export interface BlackScholesInputs {
  S: number; // Current stock price
  K: number; // Strike price
  T: number; // Time to maturity (in years)
  r: number; // Risk-free interest rate (as decimal, e.g., 0.05 for 5%)
  sigma: number; // Volatility (as decimal, e.g., 0.20 for 20%)
  q?: number; // Dividend yield (as decimal, optional, default 0)
}

export interface BlackScholesResult {
  optionPrice: number;
  greeks: {
    delta: number;     // Price sensitivity to underlying asset price
    gamma: number;     // Rate of change of delta
    theta: number;     // Time decay (per day)
    vega: number;      // Volatility sensitivity (per 1% vol change)
    rho: number;       // Interest rate sensitivity (per 1% rate change)
  };
}

// Standard normal cumulative distribution function
function normCDF(x: number): number {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

// Standard normal probability density function
function normPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// Error function approximation
function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
}

export function calculateBlackScholes(inputs: BlackScholesInputs, isCall: boolean = true): BlackScholesResult {
  const { S, K, T, r, sigma, q = 0 } = inputs;
  
  // Ensure T is not zero to avoid division by zero
  if (T <= 0) {
    throw new Error("Time to maturity must be positive");
  }
  
  if (sigma <= 0) {
    throw new Error("Volatility must be positive");
  }
  
  // Black-Scholes d1 and d2 parameters
  const d1 = (Math.log(S / K) + (r - q + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  // Cumulative normal distribution values
  const Nd1 = normCDF(d1);
  const Nd2 = normCDF(d2);
  const NegD1 = normCDF(-d1);
  const NegD2 = normCDF(-d2);
  
  // Discount and dividend adjustment factors
  const discountFactor = Math.exp(-r * T);
  const dividendFactor = Math.exp(-q * T);
  
  // Option price calculation using Black-Scholes formula
  let optionPrice: number;
  if (isCall) {
    // Call option: C = S₀e^(-qT)N(d₁) - Ke^(-rT)N(d₂)
    optionPrice = S * dividendFactor * Nd1 - K * discountFactor * Nd2;
  } else {
    // Put option: P = Ke^(-rT)N(-d₂) - S₀e^(-qT)N(-d₁)
    optionPrice = K * discountFactor * NegD2 - S * dividendFactor * NegD1;
  }
  
  // Greeks calculation
  const pdfD1 = normPDF(d1);
  
  // Delta: First derivative with respect to underlying price
  const delta = isCall 
    ? dividendFactor * Nd1 
    : -dividendFactor * NegD1;
  
  // Gamma: Second derivative with respect to underlying price (same for calls and puts)
  const gamma = (dividendFactor * pdfD1) / (S * sigma * Math.sqrt(T));
  
  // Theta: Time decay (converted to per-day)
  const theta = isCall
    ? (-(S * pdfD1 * sigma * dividendFactor) / (2 * Math.sqrt(T)) - r * K * discountFactor * Nd2 + q * S * dividendFactor * Nd1) / 365
    : (-(S * pdfD1 * sigma * dividendFactor) / (2 * Math.sqrt(T)) + r * K * discountFactor * NegD2 - q * S * dividendFactor * NegD1) / 365;
  
  // Vega: Sensitivity to volatility (converted to per 1% volatility change)
  const vega = (S * dividendFactor * pdfD1 * Math.sqrt(T)) / 100;
  
  // Rho: Sensitivity to interest rate (converted to per 1% rate change)
  const rho = isCall
    ? (K * T * discountFactor * Nd2) / 100
    : (-K * T * discountFactor * NegD2) / 100;
  
  return {
    optionPrice: Math.max(0, optionPrice), // Ensure non-negative price
    greeks: {
      delta: delta,
      gamma: gamma,
      theta: theta,
      vega: vega,
      rho: rho
    }
  };
}