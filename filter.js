
// const fs = require("fs")

// const rawData = fs.readFileSync("data.json","utf8");
// const data = JSON.parse(rawData)

// const fs = require("fs")

// const rawData = fs.readFileSync("data.json","utf-8");
// const data = JSON.parse(rawData)


// function getActiveUsers(){
//   const activeUsers = data.apiResponse.data.activeUsers

//   .filter(user => user.isActive === true ||
//     user.isActive === "true"
//   )
//   .map(user => {
//     const posts = Number(user.stats.posts) || 0;
//     const followers= Number(user.stats.followers) || 0;

//     return{
//       ...user,
//       totalEngagement: posts + followers
//     };
//   });
// }

// function getActiveUsers() {
//   const activeUsers = data.apiResponse.data.users
    
//     .filter(user => user.isActive === true ||
//          user.isActive === "true")
//     .map(user => {
//       const posts = Number(user.stats.posts) || 0;
//       const followers = Number(user.stats.followers) || 0;

//       return {
//         ...user,
//         totalEngagement: posts + followers
//       };
//     });

//   return activeUsers;
// }





const fs = require("fs");

const rawData = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(rawData);


function getActiveUsers() {
  const activeUsers = data?.apiResponse?.data?.activeUsers
  
    ?.filter(
      (user) => user.isActive === true || user.isActive === "true"
    )
    .map((user) => {
      const posts = Number(user.stats.posts) || 0;
      const followers = Number(user.stats.followers) || 0;

      return {
        ...user,
        totalEngagement: posts + followers,
      };
    }) || []; 

  return activeUsers;
}

const result = getActiveUsers();
console.log(result);
