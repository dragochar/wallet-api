import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { WalletPoint } from './models';
import csv from 'csv-parser';

dotenv.config();

// This loads the dataset into our MongoDB, and should be used one time.

async function processCSV(filePath: string) {
  const batchSize = 1000;
  let batch: any[] = [];
  let streamPaused = false;

  return new Promise<void>((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        batch.push({
          Date: new Date(data.date),
          'Wallet Address': data.wallet_address,
          'Point Value': parseFloat(data.point_value),
          Year: parseInt(data.year, 10),
          Month: parseInt(data.month, 10),
          Day: parseInt(data.day, 10),
        });

        if (batch.length >= batchSize && !streamPaused) {
          streamPaused = true;
          stream.pause();
          WalletPoint.insertMany(batch)
            .then(() => {
              batch = [];
              streamPaused = false;
              stream.resume();
            })
            .catch((err) => {
              console.error('Failed to insert batch', err);
              reject(err);
            });
        }
      })
      .on('end', async () => {
        if (batch.length > 0) {
          await WalletPoint.insertMany(batch);
        }
        resolve();
      })
      .on('error', (err) => {
        console.error('Failed to process CSV file', err);
        reject(err);
      });
  });
}

mongoose.connect(process.env.MONGO_URI as string).then(async () => {
  console.log('Connected to MongoDB');

  const csvFilePath = path.join(__dirname, 'constants', 'openblocklabs-dataset.csv');
  await processCSV(csvFilePath);

  console.log('Data loaded into MongoDB');
  mongoose.connection.close();
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});