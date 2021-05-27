const mongoose = require('mongoose');
const uri = process.env.URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to MongoDB using Mongoose!');
  })
  .catch((e) => {
    console.log('failed to connect to MongoDB. see error: ', e);
  });
const db = mongoose.connection;
module.exports = { db };
