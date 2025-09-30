const fs = require('fs');

let hotelSystem = {
  "hotelId": 101,
  "name": "Safari Park Hotel",
  "rooms": [
    {
      "roomId": "R001",
      "roomNumber": "101",
      "roomType": "Standard Room",
      "status": "Available", // Available, Occupied, Cleaning, Maintenance
      "currentBooking": null
    },
    {
      "roomId": "R002",
      "roomNumber": "102",
      "roomType": "Standard Room",
      "status": "Occupied",
      "currentBooking": {
        "bookingId": "BK001",
        "guestName": "John Doe",
        "checkIn": "2025-09-25",
        "checkOut": "2025-09-30"
      }
    }
  ],
  "lastUpdated": new Date().toISOString()
};

// Check-in function
function checkIn(roomId, bookingDetails) {
  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map(room => {
      if (room.roomId === roomId && room.status === "Available") {
        console.log(`✅ Check-in: ${bookingDetails.guestName} → Room ${room.roomNumber}`);
        return {
          ...room,
          status: "Occupied",
          currentBooking: {
            ...bookingDetails,
            checkedInAt: new Date().toISOString()
          }
        };
      }
      return room;
    }),
    lastUpdated: new Date().toISOString()
  };
  
  hotelSystem = updatedSystem;
  return updatedSystem;
}

// Check-out function
function checkOut(roomId) {
  const room = hotelSystem.rooms.find(r => r.roomId === roomId);
  
  if (!room || room.status !== "Occupied") {
    console.log(` Cannot check out Room ${roomId}`);
    return hotelSystem;
  }
  
  console.log(`Check-out: ${room.currentBooking.guestName} from Room ${room.roomNumber}`);
  
  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map(r => {
      if (r.roomId === roomId) {
        return {
          ...r,
          status: "Cleaning", // Room needs cleaning before being available again
          currentBooking: {
            ...r.currentBooking,
            checkedOutAt: new Date().toISOString(),
            status: "Completed"
          },
          previousBooking: { ...r.currentBooking }
        };
      }
      return r;
    }),
    lastUpdated: new Date().toISOString()
  };
  
  hotelSystem = updatedSystem;
  return updatedSystem;
}

// Mark room as ready
function markRoomReady(roomId) {
  const updatedSystem = {
    ...hotelSystem,
    rooms: hotelSystem.rooms.map(room => {
      if (room.roomId === roomId && room.status === "Cleaning") {
        console.log(`✅ Room ${room.roomNumber} is now ready for new guests`);
        return {
          ...room,
          status: "Available",
          currentBooking: null
        };
      }
      return room;
    }),
    lastUpdated: new Date().toISOString()
  };
  
  hotelSystem = updatedSystem;
  return updatedSystem;
}

// Test the flow
console.log('🏨 CHECK-IN/CHECK-OUT SYSTEM\n');

console.log('--- CHECK-IN NEW GUEST ---');
checkIn("R001", {
  bookingId: "BK002",
  guestName: "Antony Odhiambo",
  checkIn: "2025-09-29",
  checkOut: "2025-10-05"
});

console.log('\n--- CHECK-OUT GUEST ---');
checkOut("R002");

console.log('\n--- MARK ROOM AS READY ---');
markRoomReady("R002");

console.log('\n📊 Final Room Status:');
hotelSystem.rooms.forEach(room => {
  console.log(`   Room ${room.roomNumber}: ${room.status}`);
  if (room.currentBooking) {
    console.log(`      Guest: ${room.currentBooking.guestName}`);
  }
});

fs.writeFileSync('./hotel-checkin-system.json', JSON.stringify(hotelSystem, null, 2));
console.log('\n✅ Saved to hotel-checkin-system.json');