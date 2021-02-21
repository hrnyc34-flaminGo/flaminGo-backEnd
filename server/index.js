// require('dotenv').config();

const app = require('./server.js');
// const PORT = process.env.PORT || 7777;
const PORT = 7777;

app.listen(PORT, () => { console.log(`listening on ${PORT}`); });