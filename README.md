# Wallet Points API

This project provides a REST API to access wallet points data stored in MongoDB.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
   You can also add the openblocklabs-data.csv into the constants folder if you do not have
   access to the testing database where this dataset has already been loaded into.
   (https://drive.google.com/file/d/1YFp7N1pu6KJnf_rAXeBHR0D-xgNybTvq/view?usp=sharing)

3. Start the server:
   ```
   npm start
   ```

## Scripts

- `npx ts-node src/app.ts`: Run the API

