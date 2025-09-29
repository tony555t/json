const fs = require("fs");

//readfile
const rawData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(rawData);

function updateUser(userId, updates) {
  const updatedUsers = data.apiResponse.data.users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        ...updates, 
        stats: {
          ...user.stats,
          ...(updates.stats || {}) 
        }
      };
    }
    return user;
  });

  const updatedData = {
    ...data,
    apiResponse: {
      ...data.apiResponse,
      data: {
        ...data.apiResponse.data,
        users: updatedUsers
      },
      timestamp: new Date().toISOString() 
    }
  };

  return updatedData;
}

const updated = updateUser(3, {
//   name: "jack mwangi", 
  location:"kisii ,kenya",
  isActive:"false",
  stats: { posts: 10 ,
           location: "kisii ,kenya" ,
           following:"200",
           followers:"1000"

  }       
});

// Step 4: Save back to file
fs.writeFileSync("data.json", JSON.stringify(updated, null, 2));

console.log("User updated successfully!");
console.log(updated.apiResponse.data.users.find(u => u.id === 1));
