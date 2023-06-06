const request = require('../utils/server');

function checkServerStatus(cb) {
  request('/status', (err, status) => {
    cb(null, status);
  });
}

function fetchBannerContent(cb) {
  request('/banner', (err, banner) => {
    banner.copyrightYear = 2023;
    cb(null, { ...banner });
  });
}

function fetchAllOwners(cb) {
  request('/owners', (err, owners) => {
    const lowerCase = owners.map(owner => owner.toLowerCase());
    cb(null, lowerCase);
  });
}

function fetchCatsByOwner(owner, cb) {
  request(`/owners/${owner}/cats`, (err, catOwners) => {
    if (err) {
      cb(err);
    } else {
      cb(null, catOwners);
    }
  });
}

function fetchCatPics(catPicsArray, cb) {
  const arr = [];
  let count = 0;
  if (catPicsArray.length === 0) cb(null, []);
  catPicsArray.forEach((catpic, index) => {
    request(`/pics/${catpic}`, (err, catJpg) => {
      if (err) {
        arr[index] = 'placeholder.jpg';
      } else {
        arr[index] = catJpg;
      }
      if (++count === catPicsArray.length) {
        cb(null, arr);
      }
    });
  });
}

function fetchAllCats(cb) {
  const catsArray = [];
  let count = 0;
  fetchAllOwners((err, owners) => {
    if (err) cb(err);
    else {
      for (let i = 0; i < owners.length; i++) {
        fetchCatsByOwner(owners[i], (err, cats) => {
          if (err) {
          } else {
            count++;
            catsArray.push(...cats);
            if (count === owners.length) {
              cb(null, catsArray.sort());
            }
          }
        });
      }
    }
  });
}

function fetchOwnersWithCats(cb) {
  const ownersAndCats = [];
  fetchAllOwners((err, owners) => {
    let count = 0;
    if (err) cb(err);
    else {
      for (let i = 0; i < owners.length; i++) {
        const ownerObject = {
          owner: owners[i]
        };
        fetchCatsByOwner(owners[i], (err, cats) => {
          if (err) callback(err);
          else {
            ownerObject.cats = cats;
            ownersAndCats[i] = ownerObject;
            if (++count === owners.length) {
              cb(null, ownersAndCats);
            }
          }
        });
      }
    }
  });
}

function kickLegacyServerUntilItWorks(cb) {
  request('/legacy-status', (err, status) => {
    if (err) {
      kickLegacyServerUntilItWorks(cb);
    } else {
      cb(null, status);
    }
  });
}

function buySingleOutfit(outfits, callback) {
  let count = 0;
  request(`/outfits/${outfits}`, (err, outfit) => {
    if (err) {
      callback(err);
    } else {
      if (++count === 1) {
        callback(null, outfit);
      }
    }
  });
}

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
