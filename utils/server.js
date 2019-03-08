const db = require('./database');
const {checkLegacyStatus, checkStatus, fetchOwners, fetchCatsByOwner} = require('./controllers')

const server = (requestUrl, handleResponse) => {
  const errors = [];
  let response = ''
  const validUrls = {
    '/owners' : fetchOwners,
    '/status': checkStatus,
    '/legacy-status': checkLegacyStatus
  } 
  setTimeout(() => {
    if(/\/owners\/\w+\/cats/.test(requestUrl)) {
      const owner = requestUrl.split('/')[2];
      response = fetchCatsByOwner(errors, db, owner);
    }
    else {
      response = validUrls[requestUrl](errors, db);
    }
    if(errors.length) return handleResponse(errors[0]);
    else return response ? handleResponse(null, response) : handleResponse('404 - path not found!');
  }, Math.random() * 2000)
}

module.exports = server;

// getSuperHeroes --> getCats
// getArchEnemy