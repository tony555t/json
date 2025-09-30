import fs from "fs"

const rawData = fs.readFileSync("./rooms.json", "utf-8");
    const{rooms} = JSON.parse(rawData)

let hotelSystem = {
  hotelId: 101,
  name: "Safari Park Hotel",
  rooms,


  lastUpdated: new Date().toISOString(),
};

// CHECK-IN FUNCTION
function checkIn(roomId, bookingDetails) {
  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map((room) => {
      if (room.roomId === roomId && room.status === "Available") {
        console.log(` Check-in: ${bookingDetails.guestName} → Room ${room.roomNumber}`);
        return {
          ...room,
          status: "Occupied",
          currentBooking: {
            ...bookingDetails,
            checkedInAt: new Date().toISOString(),
          },
        };
      }
      return room;
    }),
    lastUpdated: new Date().toISOString(),
  };

  hotelSystem = updatedSystem;
  return updatedSystem;
}

// CHECK-OUT FUNCTION
function checkOut(roomId) {
  const room = hotelSystem.rooms.find((r) => r.roomId === roomId);

  if (!room) {
    console.log(`Room with ID ${roomId} not found`);
    return hotelSystem;
  }

  if (room.status !== "Occupied") {
    console.log(`Cannot checkout room ${roomId}, current status: ${room.status}`);
    return hotelSystem;
  }

  console.log(` Check-out: ${room.currentBooking.guestName} from Room ${room.roomNumber}`);

  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map((r) => {
      if (r.roomId === roomId) {
        return {
          ...r,
          status: "Cleaning",
          previousBooking: {
            ...r.currentBooking,
            checkedOutAt: new Date().toISOString(),
            status: "Completed",
          },
          currentBooking: null,
        };
      }
      return r;
    }),
    lastUpdated: new Date().toISOString(),
  };

  hotelSystem = updatedSystem;
  return updatedSystem;
}

//  MARK ROOM AS READY FUNCTION
function markRoomReady(roomId) {
  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map((room) => {
      if (room.roomId === roomId && room.status === "Cleaning") {
        console.log(`🧹 Room ${room.roomNumber} is now ready for new guests`);
        return {
          ...room,
          status: "Available",
          currentBooking: null,
        };
      }
      return room;
    }),
    lastUpdated: new Date().toISOString(),
  };
  hotelSystem = updatedSystem;
  return updatedSystem;
}

// TEST THE FLOW
console.log("Check-in / Check-out System");

console.log("\n--- CHECK-IN NEW GUEST ---");
checkIn("R006", {
  bookingId: "BK003",
  guestName: "son min",
  checkIn: "2025-09-29",
  checkOut: "2025-10-05",
});

console.log("\n--- CHECK-OUT GUEST ---");
checkOut("R002");

console.log("\n--- MARK ROOM AS READY ---");
markRoomReady("R002");

console.log("\n Final Room Status:");
// hotelSystem.rooms.forEach((room) => {
//   console.log(`   Room ${room.roomNumber}: ${room.status}`);
//   if (room.currentBooking) {
//     console.log(`      Guest: ${room.currentBooking.guestName}`);
//   }
// });
// console.log("\n Final Room Status:");

// console.log("\n Final Room Status:");

console.log("\nFinal Room Status (Grouped & Sorted):");


const statusOrder = ["Occupied", "Reserved", "Under Maintenance", "Cleaning", "Available"];

// group rooms by status
const groupedRooms = {};

statusOrder.forEach((status) => {
  groupedRooms[status] = hotelSystem.rooms.filter((room) => room.status === status);
});

// display grouped rooms
statusOrder.forEach((status) => {
  const rooms = groupedRooms[status];
  if (rooms.length > 0) {
    console.log(`\n--- ${status.toUpperCase()} ROOMS ---`);
    rooms.forEach((room) => {
      console.log(`   Room ${room.roomNumber}: ${room.status}`);
      if (room.currentBooking) {
        console.log(`      Guest: ${room.currentBooking.guestName}`);
      }
    });
  }
});


