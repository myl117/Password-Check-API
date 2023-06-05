const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
});
