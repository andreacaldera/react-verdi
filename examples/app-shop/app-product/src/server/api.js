import express from 'express';

export default () => {
  const router = express.Router();

  router.get('*', (req, res) => res.sendStatus(400));

  return router;
};
