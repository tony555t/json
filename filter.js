
const fs = require("fs")

const rawData = fs.readFileSync("data.json","utf8");
const data = JSON.parse(rawData)

function getActiveUsers() {
  const activeUsers = data.apiResponse.data.users
    
    .filter(user => user.isActive === true || user.isActive === "true")
    .map(user => {
      const posts = Number(user.stats.posts) || 0;
      const followers = Number(user.stats.followers) || 0;

      return {
        ...user,
        totalEngagement: posts + followers
      };
    });

  return activeUsers;
}



const active  = getActiveUsers();
console.log(active)
