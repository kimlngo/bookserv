const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const { ENV } = require('./util/constant');

const DB_CONNECTION = ENV.DATABASE.replace('<PASSWORD>', ENV.DATABASE_PASSWORD);

mongoose.connect(DB_CONNECTION).then(() => {
  console.log('DB Connection Successful');
});

const PORT = ENV.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});
