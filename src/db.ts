import mongoose from 'mongoose';

async function dbConnect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.APP_DB_USERNAME}:${process.env.APP_DB_PASSWORD}@euawsdevclustertodo.cy9u888.mongodb.net/${process.env.APP_DB_NAME}`
    );

    console.log('Connection to the database was successful');
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}

export default dbConnect;
