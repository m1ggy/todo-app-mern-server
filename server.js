const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const db = require('./database/connect');
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/todosRoute'));

app.listen(port, () => {
  if (db) {
    console.log(db);
  }
  console.log(`server is running on port ${port}`);
});

module.exports = {
  app,
};
