import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import {Server} from 'http';

let server : Server
dotenv.config({ path: path.join((process.cwd(), '.env')) });

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on('unhandledRejection', ()=>{
  console.log(`unhandledRejection is detected ...shutting down`);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', ()=>{
  console.log(`uncaughtException is detected ...shutting down`);
  process.exit(1)
})



