import express from 'express';
import { checkAuth } from './auth';
import { WalletPoint } from './models';

const router = express.Router();

// This is our endpoint a user can query with a wallet address, and a time range, and can get the wallet's points for that range
router.get('/points', checkAuth, async (req, res) => {
  try {
    const { wallet_address, from_date, to_date } = req.query;

    const fromDate = new Date(from_date as string);
    const toDate = new Date(to_date as string);

    const points = await WalletPoint.find({
      'Wallet Address': wallet_address,
      Date: { $gte: fromDate, $lte: toDate },
    });

    const totalPoints = points.reduce((acc: number, point: any) => acc + point['Point Value'], 0);

    res.json({
      wallet_address,
      from_date,
      to_date,
      total_points: totalPoints,
    });
  } catch (error) {
    console.log('Server error');
    res.status(500).json({ error: error });
  }
});

export default router;
