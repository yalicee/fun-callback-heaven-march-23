const request = require('../utils/server');

const checkServerStatus = cb => {
  request('/status', cb);
};

const fetchBannerContent = cb => {
  request('/banner', cb);
};

const fetchAllOwners = cb => {
  request('/owners', (err, owners) => {
    if (err) cb(err);
    else cb(err, owners);
  });
};

const fetchCatsByOwner = (owner, cb) => {
  request(`/owners/${owner}/cats`, (err, cats) => {
    if (err) cb(err);
    else cb(err, cats);
  });
};

const fetchAllCats = cb => {
  fetchAllOwners((err, owners) => {
    const allCats = [];
    let ownerCount = owners.length;
    owners.forEach(owner => {
      fetchCatsByOwner(owner.toLowerCase(), (err, cats) => {
        allCats.push(...cats);
        if (!--ownerCount) cb(null, allCats.sort());
      });
    });
  });
};

const fetchOwnersWithCats = cb => {
  fetchAllOwners((err, owners) => {
    const ownersWithCats = [];
    let ownerCount = owners.length;
    owners.forEach((owner, i) => {
      fetchCatsByOwner(owner.toLowerCase(), (err, cats) => {
        ownersWithCats[i] = { owner, cats };
        if (!--ownerCount) cb(null, ownersWithCats);
      });
    });
  });
};

const kickLegacyServerUntilItWorks = cb => {
  request('/legacy-status', (err, status) => {
    if (err) return kickLegacyServerUntilItWorks(cb);
    else cb(null, status);
  });
};

const buySingleOutfit = (outfit, cb) => {
  let called = false;
  request(`/outfits/${outfit}`, (err, checkout) => {
    if (!called) {
      cb(err, checkout);
      called = true;
    }
  });
};

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
