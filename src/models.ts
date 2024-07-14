import mongoose from 'mongoose';

// This is the schema for our MongoDB collection
const walletPointSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  'Wallet Address': { type: String, required: true },
  'Point Value': { type: Number, required: true },
  Year: { type: Number, required: true },
  Month: { type: Number, required: true },
  Day: { type: Number, required: true },
});

const WalletPoint = mongoose.model('WalletPoint', walletPointSchema);

export { WalletPoint };
