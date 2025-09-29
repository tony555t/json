const fs = require("fs");


const rawData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(rawData);





function addMetadata(source, requestId) {
  const enrichedData = {
    ...data,
    metadata: {
      source: source,
      requestId: requestId,
      serverTime: new Date().toISOString(),
      nodeVersion: process.version
    },
    apiResponse: {
      ...data.apiResponse,
      timestamp: new Date().toISOString()
    }
  };
  
  return enrichedData;
}

// Usage
const withMeta = addMetadata('android-app', 'req-12345');
console.log(withMeta.metadata);

// {
//   source: "android-app",
//   requestId: "req-12345",
//   serverTime: "2025-09-29T10:30:00.000Z",
//   nodeVersion: "v22.18.0"
// }