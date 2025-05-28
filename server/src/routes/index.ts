import type { Request, Response } from 'express';
import express from 'express';
import path from 'path';
import apiRoutes from './api/index.js';

const router = express.Router();

// ✅ No need to declare __dirname — it's built-in when using CommonJS

router.use('/api', apiRoutes);

// Serve up React front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;