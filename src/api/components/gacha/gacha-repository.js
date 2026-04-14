const { gachas, prizes } = require('../../../models');

async function initializePrizes() {
  const count = await prizes.countDocuments();
  if (count === 0) {
    await prizes.insertMany([
      { name: 'Emas 10 gram', quota: 1, remaining_quota: 1 },
      { name: 'Smartphone X', quota: 5, remaining_quota: 5 },
      { name: 'Smartwatch Y', quota: 10, remaining_quota: 10 },
      { name: 'Voucher Rp100.000', quota: 100, remaining_quota: 100 },
      { name: 'Pulsa Rp50.000', quota: 500, remaining_quota: 500 },
    ]);
  }
}

async function countGachaToday(userName) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return gachas.countDocuments({
    user_name: userName,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
}

async function getAvailablePrizes() {
  return prizes.find({ remaining_quota: { $gt: 0 } });
}

async function getAllPrizes() {
  return prizes.find({});
}

async function decreasePrizeQuota(prizeId) {
  return prizes.updateOne(
    { _id: prizeId, remaining_quota: { $gt: 0 } },
    { $inc: { remaining_quota: -1 } }
  );
}

async function recordGacha(userName, isWin, prizeName) {
  return gachas.create({
    user_name: userName,
    is_win: isWin,
    prize_name: prizeName,
  });
}

async function getHistoryByUser(userName) {
  return gachas.find({ user_name: userName }).sort({ date: -1 });
}

async function getWinningHistories() {
  return gachas.find({ is_win: true });
}

module.exports = {
  initializePrizes,
  countGachaToday,
  getAvailablePrizes,
  getAllPrizes,
  decreasePrizeQuota,
  recordGacha,
  getHistoryByUser,
  getWinningHistories,
};
