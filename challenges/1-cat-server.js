const request = require('../utils/server');

function checkServerStatus(callBack) {}

function fetchBannerContent(callBack) {}

function fetchAllOwners(callBack) {}

function fetchCatsByOwner(owner, callBack) {}

function fetchCatPics(catNames, callBack) {}

function fetchAllCats(callBack) {}

function fetchOwnersWithCats(callBack) {}

function kickLegacyServerUntilItWorks(callBack) {}

function buySingleOutfit(outfit, callBack) {}

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
