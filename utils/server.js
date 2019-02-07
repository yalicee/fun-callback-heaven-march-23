const server = (requestUrl, handleResponse) => {
  const owners = [
    'Schrodinger', 
    'Pavlov', 
    'Foucault', 
    'Vel',
    'Calvin'
  ];
  const catsByOwner = {
    'Schrodinger': ['Leben', 'Tot'],
    'Pavlov' :['Belle', 'Dribbles', 'Nibbles'],
    'Foucault': ['M. Fang'],
    'Vel': ['Opal'],
    'Calvin': ['Hobbes']
  };

  const validUrls = {
    '/owners' : owners,
    '/status': () => Math.random() > 0.5 ? '200 - the server is good' : '500 - the server is bad'
  } 
  setTimeout(() => {
    let response = ''
    if(/\/owners\/\w+\/cats/.test(requestUrl)) {
      const owner = requestUrl.split('/')[2];
      response = catsByOwner[owner];
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