const request = require('../utils/server');

const checkServerStatus = callBack => {};

const fetchBannerContent = callBack => {};

const fetchAllOwners = callBack => {};

const fetchCatsByOwner = (owner, callBack) => {};

const fetchCatPics = (catNames, callBack) => {};

const fetchAllCats = callBack => {};

const fetchOwnersWithCats = callBack => {};

const kickLegacyServerUntilItWorks = callBack => {};

const buySingleOutfit = (outfit, callBack) => {};

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
