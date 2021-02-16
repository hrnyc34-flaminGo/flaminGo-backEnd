var app = require('./server.js');
var PORT = process.env.PORT || 7777;

app.listen(PORT, () => { console.log(`listening on ${PORT}`); });