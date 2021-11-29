const express = require('express');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 3000;
const hostname = '0.0.0.0';

server.use(express.static('./dist'));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

server.listen(PORT, hostname, () => {
  console.log(`App is listening on port 3000...`);
});
