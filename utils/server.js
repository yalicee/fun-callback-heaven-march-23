const db = require('./database')

const server = (requestUrl, handleResponse) => {
  const validUrls = {
    '/owners' : db.owners,
    '/status': () => Math.random() > 0.5 ? '200 - the server is good' : '500 - the server is bad'
  } 
  setTimeout(() => {
    let response = ''
    if(/\/owners\/\w+\/cats/.test(requestUrl)) {
      const owner = requestUrl.split('/')[2];
      response = db.catsByOwner[owner];
    }
    else {
      response = validUrls[requestUrl]
    }
    if(response[0] === '5') return handleResponse(response);
    return response ? handleResponse(null, response) : handleResponse('404 - path not found!');
  }, Math.random() * 2000)
}

module.exports = server;

// getSuperHeroes --> getCats
// getArchEnemy