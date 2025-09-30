const fs = require('fs');

// Page 1 API response
const page1API = {
  "success": true,
  "data": {
    "users": [
      { "id": 1, "name": "User 1" },
      { "id": 2, "name": "User 2" }
    ]
  },
  "pagination": { "page": 1, "totalPages": 3 }
};

// Page 2 API response
const page2API = {
  "success": true,
  "data": {
    "users": [
      { "id": 3, "name": "User 3" },
      { "id": 4, "name": "User 4" }
    ]
  },
  "pagination": { "page": 2, "totalPages": 3 }
};

// Page 3 API response
const page3API = {
  "success": true,
  "data": {
    "users": [
      { "id": 5, "name": "User 5" },
      { "id": 6, "name": "User 6" }
    ]
  },
  "pagination": { "page": 3, "totalPages": 3 }
};

// Merge all pages
const allUsers = {
  success: true,
  data: {
    users: [
      ...page1API.data.users,
      ...page2API.data.users,
      ...page3API.data.users
    ]
  },
  pagination: {
    page: "all",
    totalPages: 3,
    totalUsers: 6
  },
  loadedAt: new Date().toISOString()
};

console.log('All Users Loaded:');
console.log(JSON.stringify(allUsers, null, 2));