// 

// 👉 1. Tunatumia 'node-fetch' kufanya maombi (requests) ya HTTP
// Ikiwa unatumia Node.js < v18, tafadhali install: npm install node-fetch
// Kwa Node 18+ unaweza kutumia 'fetch' moja kwa moja bila kusakinisha chochote

// ⚙️ Kwanza tunafafanua URL ya API
const API_URL = "https://api.example.com/users"; // badilisha na API yako halisi

// 👉 2. Tunaunda function ya kupata data kutoka API
async function getActiveUsers() {
  try {
    // 🔄 3. Tunafanya ombi (request) kwa API
    const response = await fetch(API_URL);

    // 🧾 4. Tukipata majibu, tunayabadili kuwa JSON
    const data = await response.json();

    // 🧠 5. Tunadhani data ina muundo huu:
    // data.apiResponse.data.activeUsers = [ { name, isActive, stats: { posts, followers } }, ... ]

    // ✅ 6. Tunachukua watumiaji kutoka ndani ya data
    const activeUsers = data?.apiResponse?.data?.activeUsers
      // 🔍 Kuchuja watumiaji walioko active pekee
      ?.filter(
        (user) => user.isActive === true || user.isActive === "true"
      )
      // ➕ Kuongeza property mpya ya totalEngagement
      .map((user) => {
        const posts = Number(user.stats.posts) || 0;
        const followers = Number(user.stats.followers) || 0;
        return {
          ...user,
          totalEngagement: posts + followers,
        };
      }) || [];

    // 🔁 7. Kurudisha orodha ya watumiaji walio hai
    return activeUsers;

  } catch (error) {
    // ⚠️ 8. Kushika makosa kama mtandao haupatikani au data si sahihi
    console.error("Kuna kosa wakati wa kupata data kutoka API:", error);
    return [];
  }
}

// 👉 9. Kuita function na kuonyesha matokeo
getActiveUsers().then((users) => {
  console.log("Watumiaji walio hai:", users);
});
