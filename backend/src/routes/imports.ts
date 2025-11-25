import express, { Response } from 'express';
import { prisma } from '../index.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const imports = await prisma.import.findMany({
      where: { tenantId: req.tenantId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(imports);
  } catch (error) {
    console.error('Get imports error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const importRecord = await prisma.import.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
      include: { user: true, importErrors: true },
    });

    if (!importRecord) {
      return res.status(404).json({ error: 'Import not found' });
    }

    res.json(importRecord);
  } catch (error) {
    console.error('Get import error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId || !req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { fileName, filePath } = req.body;

    if (!fileName || !filePath) {
      return res.status(400).json({ error: 'fileName and filePath required' });
    }

    const newImport = await prisma.import.create({
      data: {
        fileName,
        filePath,
        tenantId: req.tenantId,
        userId: req.userId,
        status: 'pending',
      },
    });

    res.status(201).json(newImport);
  } catch (error) {
    console.error('Create import error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.tenantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const existing = await prisma.import.findFirst({
      where: {
        id: req.params.id,
        tenantId: req.tenantId,
      },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Import not found' });
    }

    const updated = await prisma.import.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.error('Update import error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
