const { Router } = require('express');

// eslint-disable-next-line import/no-unresolved
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res) => {
  const entries = await LogEntry.find();
  res.json(entries);
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
