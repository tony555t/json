
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





// const fs = require("fs");

// const rawData = fs.readFileSync("data.json", "utf-8");
// const data = JSON.parse(rawData);


// function getActiveUsers() {
//   const activeUsers = data?.apiResponse?.data?.activeUsers
  
//     
//       (user) => user.isActive === true || user.isActive === "true"
//     )
//     .map((user) => {
//       const posts = Number(user.stats.posts) || 0;
//       const followers = Number(user.stats.followers) || 0;

//       return {
//         ...user,
//         totalEngagement: posts + followers,
//       };
//     }) || []; 

//   return activeUsers;
// }

// const result = getActiveUsers();
// console.log(result);

// const API_URL = "https://jsonplaceholder.typicode.com/users"; 
// async function getActiveUsers(){
//   try{
//     const response = await fetch (API_URL);
//      const data = await response.json();

//      const activeUsers = data?.apiResponse?.data?.activeUsers

//      ?.filter((user) => user.isActive === true || user.isActive === "true")

//      .map((user)=>{
//       const posts = Number(user.stats.posts) || 0;
//       const followers= Number ( user.stats.followers) || 0;
//       return{
//         ...user,totalEngament:posts + followers
//       }
//      })|| {}
//   return activeUsers;

//   }
//   catch (error){
//     console.error("waiting to long to fetch the data:", error);
//     return [];
//   }
// }

// getActiveUsers().then((user)=>{
//   console.log("watumiaji walio hai:", users)
// })

// Use your local data or custom API
import fs from 'fs';

async function getActiveUsers() {
  try {
    // Read local JSON file
    const fileContent = fs.readFileSync('./data.json', 'utf8');
    const data = JSON.parse(fileContent);
    
    const users = data?.apiResponse?.data?.users || [];
    
    const activeUsers = users
      .filter((user) => user.isActive === true || user.isActive === "true")
      .map((user) => {
        const posts = Number(user.stats?.posts) || 0;
        const followers = Number(user.stats?.followers) || 0;
        
        return {
          ...user,
          totalEngagement: posts + followers
        };
      });
    
    return activeUsers;
    
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

getActiveUsers().then((users) => { 
  console.log("Watumiaji walio hai:", users);
  console.log(`Total: ${users.length}`);
});