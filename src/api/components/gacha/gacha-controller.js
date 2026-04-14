const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function play(request, response, next) {
  try {
    const { user_name } = request.body;
    if (!user_name)
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'user_name is required'
      );

    const result = await gachaService.playGacha(user_name);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { user_name } = request.query;
    if (!user_name)
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'user_name is required in query'
      );

    const history = await gachaService.getHistory(user_name);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getQuotas(request, response, next) {
  try {
    const quotas = await gachaService.getPrizesQuota();
    return response.status(200).json(quotas);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinners();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = { play, getHistory, getQuotas, getWinners };
