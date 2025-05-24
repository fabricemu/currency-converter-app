// lib/exchange.ts

const BASE_URL = 'https://api.exchangerate.host';
const ACCESS_KEY = 'f8cc7aba94f2a42023e1e5694716f663'; // replace this or pass dynamically

type CurrencyList = string; // e.g., "USD,AUD,CAD"

async function fetchExchange(endpoint: string, params: Record<string, string | number>): Promise<any> {
  const query = new URLSearchParams({
    access_key: ACCESS_KEY,
    format: '1',
    ...params,
  }).toString();

  const response = await fetch(`${BASE_URL}/${endpoint}?${query}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}

// 1. Live Exchange Rates
export async function getLiveRates(source: string, currencies: CurrencyList) {
  return fetchExchange('live', {
    source,
    currencies,
  });
}

// 2. Historical Rates for a Specific Date
export async function getHistoricalRates(date: string, source: string, currencies: CurrencyList) {
  return fetchExchange('historical', {
    date,
    source,
    currencies,
  });
}

// 3. Convert Amount from One Currency to Another
export async function convertCurrency(from: string, to: string, amount: number) {
  return fetchExchange('convert', {
    from,
    to,
    amount,
  });
}

// 4. Timeframe: Get Exchange Rates Over a Period
export async function getTimeframeRates(start_date: string, end_date: string, source: string, currencies: CurrencyList) {
  return fetchExchange('timeframe', {
    start_date,
    end_date,
    source,
    currencies,
  });
}

// 5. Change in Exchange Over Time
export async function getCurrencyChange(source: string, currencies: CurrencyList, start_date?: string, end_date?: string) {
  const params: Record<string, string> = {
    source,
    currencies,
  };
  if (start_date) params.start_date = start_date;
  if (end_date) params.end_date = end_date;

  return fetchExchange('change', params);
}
