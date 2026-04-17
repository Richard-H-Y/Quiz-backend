const gachaRepository = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

gachaRepository.initializePrizes();

async function playGacha(userName) {
  const todayCount = await gachaRepository.countGachaToday(userName);
  if (todayCount >= 5) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'Limit gacha harian sudah habis (maksimal 5 per hari).'
    );
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();
  let isWin = false;
  let wonPrize = null;

  if (availablePrizes.length > 0) {
    const chance = Math.random();
    if (chance <= 0.25) {
      const randomIndex = Math.floor(Math.random() * availablePrizes.length);
      const selectedPrize = availablePrizes[randomIndex];

      const updateResult = await gachaRepository.decreasePrizeQuota(
        selectedPrize._id
      );
      if (updateResult.modifiedCount > 0) {
        isWin = true;
        wonPrize = selectedPrize.name;
      }
    }
  }

  await gachaRepository.recordGacha(userName, isWin, wonPrize);

  return {
    message: isWin
      ? 'Yay, selamat, kamu menang hadiah.'
      : 'Whoops, kamu belum beruntung.',
    prize: wonPrize,
  };
}

async function getHistory(userName) {
  return gachaRepository.getHistoryByUser(userName);
}

async function getPrizesQuota() {
  const prizes = await gachaRepository.getAllPrizes();
  return prizes.map((p) => ({
    hadiah: p.name,
    kuota_awal: p.quota,
    sisa_kuota: p.remaining_quota,
  }));
}

function maskName(name) {
  const words = name.split(' ');
  const maskedWords = words.map((word) => {
    if (word.length <= 2) return word;
    const firstLetter = word[0];
    const lastLetter = word[word.length - 1];
    const middleMask = '*'.repeat(word.length - 2);
    return `${firstLetter}${middleMask}${lastLetter}`;
  });
  return maskedWords.join(' ');
}

async function getWinners() {
  const winningHistories = await gachaRepository.getWinningHistories();
  const winnersByPrize = {};

  winningHistories.forEach((history) => {
    if (!winnersByPrize[history.prize_name]) {
      winnersByPrize[history.prize_name] = [];
    }
    winnersByPrize[history.prize_name].push(maskName(history.user_name));
  });

  return winnersByPrize;
}

module.exports = { playGacha, getHistory, getPrizesQuota, getWinners };
