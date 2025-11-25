import express, { Response } from 'express';
import { prisma } from '../index.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { importId, page = '1', limit = '20' } = req.query;

    const where: any = { tenantId: req.tenantId };
    if (importId) {
      where.importId = importId;
    }

    const leads = await prisma.lead.findMany({
      where,
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.lead.count({ where });

    res.json({
      leads,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      },
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const lead = await prisma.lead.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { importId, phone, email, firstName, lastName, dob, ficoScore, city, state, extraData } = req.body;

    if (!importId) {
      return res.status(400).json({ error: 'importId required' });
    }

    const lead = await prisma.lead.create({
      data: {
        tenantId: req.tenantId,
        importId,
        phone,
        email,
        firstName,
        lastName,
        dob: dob ? new Date(dob) : null,
        ficoScore,
        city,
        state,
        extraData,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
