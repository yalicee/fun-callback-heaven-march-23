const request = require('../utils/server');

function checkServerStatus(callBack) {}

function fetchBannerContent(callBack) {}

function fetchAllOwners(callBack) {
  request('/owners', function(error, owners) {
    const lowerCaseOwners = owners.map(owner => owner.toLowerCase());
    callBack(error, lowerCaseOwners);
  });
}

function fetchCatsByOwner(owner, callBack) {
  request(`/owners/${owner}/cats`, function(error, cats) {
    callBack(error, cats);
  });
}

function fetchCatPics(catNames, callBack) {
  if (catNames.length === 0) callBack(null);

  const catPics = [];

  catNames.forEach(function(catName) {
    request(`/pics/${catName}`, function(error, catPic) {
      if (error !== null) catPics.push('placeholder.jpg');
      else catPics.push(catPic);

      if (catPics.length === catNames.length) callBack(error, catPics);
    });
  });
}

function fetchAllCats(callBack) {
  const allCats = [];
  let catResponses = 0;

  fetchAllOwners(function(error, owners) {
    owners.forEach(owner => {
      fetchCatsByOwner(owner, function(error, cats) {
        catResponses++;
        allCats.push(...cats);
        if (catResponses === owners.length) {
          callBack(error, allCats.sort());
        }
      });
    });
  });
}

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
