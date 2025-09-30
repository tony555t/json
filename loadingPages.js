import fs from "fs";

const page1API = {
    "success": true,
    "data": {
        "users": [
            { "id": 1, "name": "user 1" },
            { "id": 2, "name": "user 2" }
        ]
    },
    "pagination": { "page": 1, "totalPages": 3 }
};

const page2API = {
    "success": true,
    "data": {
        "users": [
            { "id": 3, "name": "user 3" },
            { "id": 4, "name": "user 4" }
        ]
    },
    "pagination": { "page": 2, "totalPages": 3 }
};

const page3API = {
    "success": true,
    "data": {
        "users": [
            { "id": 5, "name": "user 5" },
            { "id": 6, "name": "user 6" }
        ]
    },
    "pagination": { "page": 3, "totalPages": 3 }
};

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

console.log("All users loaded:");
console.log(JSON.stringify(allUsers, null, 2));