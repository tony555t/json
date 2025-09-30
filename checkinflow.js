import fs from "fs";

// read the JSON file
const rawData = fs.readFileSync("./rooms.json", "utf-8");
const { rooms } = JSON.parse(rawData);

// initialize hotel system using imported rooms
let hotelSystem = {
  hotelId: 101,
  name: "Safari Park Hotel",
  rooms,
  lastUpdated: new Date().toISOString(),
};