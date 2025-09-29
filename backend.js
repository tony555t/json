
const fs = require ('fs')
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// console.log('Data loaded:',data);
console.dir(data, { depth: null, colors: true });
