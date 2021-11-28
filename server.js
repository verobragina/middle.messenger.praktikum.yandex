const express = require('express');
const server = express();
const PORT = 3000;

server.use(express.static('./dist'));

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});
