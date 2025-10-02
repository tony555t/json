// merge-live.js
import fs from "fs";

// 1. Load local JSON data
const rawData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(rawData);

// 2. Fetch weather data from Open-Meteo
async function getWeatherData() {
  const nairobiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-1.2921&longitude=36.8219&current=temperature_2m";
  const lagosUrl = "https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current=temperature_2m";

  const [nairobiRes, lagosRes] = await Promise.all([
    fetch(nairobiUrl),
    fetch(lagosUrl)
  ]);

  const [nairobiData, lagosData] = await Promise.all([
    nairobiRes.json(),
    lagosRes.json()
  ]);

  return {
    nairobi: {
      temp: nairobiData.current.temperature_2m,
      unit: nairobiData.current_units.temperature_2m
    },
    lagos: {
      temp: lagosData.current.temperature_2m,
      unit: lagosData.current_units.temperature_2m
    }
  };
}

// 3. Fetch exchange rate data
async function getExchangeRates() {
  const url = "https://open.er-api.com/v6/latest/USD";
  const res = await fetch(url);
  const json = await res.json();

  // Debug the response
  console.log("Exchange API response:", json);

  // Validate data before accessing
  if (!json || !json.rates) {
    throw new Error("Exchange rate data missing from API response");
  }

  // Check if KES and NGN exist
  if (!json.rates.KES || !json.rates.NGN) {
    throw new Error("KES or NGN rates not found in API response");
  }

  return {
    KES_USD: 1 / json.rates.KES,
    NGN_USD: 1 / json.rates.NGN,
    USD_KES: json.rates.KES,
    USD_NGN: json.rates.NGN
  };
}


// 4. Merge all data
async function mergeWithExternalData() {
  const [weatherData, exchangeRate] = await Promise.all([
    getWeatherData(),
    getExchangeRates()
  ]);

  return {
    ...data,
    externalServices: {
      weatherData,
      exchangeRate
    },
    timestamp: new Date().toISOString()
  };
}

// 5. Run and print
mergeWithExternalData().then((merged) => {
  console.log(JSON.stringify(merged, null, 2));
  fs.writeFileSync("merged.json", JSON.stringify(merged, null, 2));
  console.log("2 Merged data saved to merged.json");
});
