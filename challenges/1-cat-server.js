const request = require('../utils/server');

const checkServerStatus = callBack => {
  request('/status', callBack);
};

const fetchBannerContent = callBack => {
  request('/banner', (error, bannerContent) => {
    bannerContent.copyrightYear = 2019;
    callBack(error, bannerContent);
  });
};

const fetchAllOwners = callBack => {
  request('/owners', (error, owners) => {
    callBack(
      error,
      owners.map(owner => owner.toLowerCase())
    );
  });
};

const fetchCatsByOwner = (owner, callBack) => {
  request(`/owners/${owner}/cats`, callBack);
};

const fetchCatPics = () => {};

const fetchAllCats = () => {};

const fetchOwnersWithCats = () => {};

const kickLegacyServerUntilItWorks = () => {};

const buySingleOutfit = () => {};

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
