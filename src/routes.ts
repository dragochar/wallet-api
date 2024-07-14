import express, { Request, Response } from 'express';
import { checkAuth } from './auth';
import { WalletPoint } from './models';

const router = express.Router();

interface QueryParams {
  wallet_address?: string;
  from_date?: string;
  to_date?: string;
}

router.get('/points', checkAuth, async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  try {
    const { wallet_address, from_date, to_date } = req.query;

    if (!wallet_address || !from_date || !to_date) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    const fromDate = new Date(from_date);
    const toDate = new Date(to_date);

    const points = await WalletPoint.find({
      'Wallet Address': wallet_address,
      Date: { $gte: fromDate, $lte: toDate },
    });

    const totalPoints = points.reduce((acc: number, point: { 'Point Value': number }) => acc + point['Point Value'], 0);

    res.json({
      wallet_address,
      from_date,
      to_date,
      total_points: totalPoints,
    });
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: error });
  }
});

export default router;
