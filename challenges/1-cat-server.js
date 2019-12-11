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

const fetchCatPics = (catNames, callBack) => {
  if (!catNames.length) return callBack(null);
  const catPics = [];

  catNames.forEach(catName => {
    request(`/pics/${catName}`, (err, catPic) => {
      if (!err) catPics.push(catPic);
      else catPics.push('placeholder.jpg');
      if (catPics.length === catNames.length) callBack(null, catPics);
    });
  });
};

const fetchAllCats = callBack => {
  const allCats = [];
  let catResponses = 0;
  fetchAllOwners((err, owners) => {
    owners.forEach(owner => {
      fetchCatsByOwner(owner, (error, cats) => {
        catResponses++;
        allCats.push(...cats);
        if (catResponses === owners.length) callBack(null, allCats.sort());
      });
    });
  });
};

const fetchOwnersWithCats = callBack => {
  const ownersWithCats = [];
  let catResponses = 0;
  fetchAllOwners((error, owners) => {
    owners.forEach((owner, i) => {
      fetchCatsByOwner(owner, (error, cats) => {
        catResponses++;
        ownersWithCats[i] = { cats, owner };
        if (catResponses === owners.length) callBack(null, ownersWithCats);
      });
    });
  });
};

const kickLegacyServerUntilItWorks = callBack => {
  request('/legacy-status', (error, response) => {
    if (error) kickLegacyServerUntilItWorks(callBack);
    else callBack(null, response);
  });
};

const buySingleOutfit = (outfit, callBack) => {
  let isCalled = false;
  request(`/outfits/${outfit}`, (error, response) => {
    if (!isCalled) {
      isCalled = true;
      callBack(error, response);
    }
  });
};

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
