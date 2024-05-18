import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
