const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

function addNewUser(newUser) {
  const updatedData = {
    ...data,
    apiResponse: {
      ...data.apiResponse,
      data: {
        ...data.apiResponse.data,
        users: [
          ...data.apiResponse.data.users,
          {
            id: data.apiResponse.data.users.length + 1,
            ...newUser,
            stats: {
              posts: 0,
              followers: 0,
              following: 0,
              ...newUser.stats
            }
          }
        ]
      },
      pagination: {
        ...data.apiResponse.pagination,
        totalUsers: data.apiResponse.pagination.totalUsers + 1
      },
      timestamp: new Date().toISOString()
    }
  };
  
  return updatedData;
}

// Usage
const newUser = {
  name: "tony mwangi",
  email: "tony@example.com",
  location: "Nairobi, Kenya",
  joinDate: "2025-09-29",
  isActive: true
};

const result = addNewUser(newUser);
console.log(JSON.stringify(result, null, 2));

// Save to file
fs.writeFileSync('./data.json', JSON.stringify(result, null, 2));