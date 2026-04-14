const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/play', gachaController.play);

  route.get('/history', gachaController.getHistory);
  route.get('/prizes', gachaController.getQuotas);
  route.get('/winners', gachaController.getWinners);
};
