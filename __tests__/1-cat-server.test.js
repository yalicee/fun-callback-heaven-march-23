const {
  checkServerStatus,
  fetchBannerContent,
  fetchAllOwners,
  fetchCatPics,
  fetchCatsByOwner,
  fetchAllCats,
  fetchOwnersWithCats,
  kickLegacyServerUntilItWorks,
  buySingleOutfit
} = require('../challenges/1-cat-server');

describe.only('checkServerStatus()', () => {
  test('invokes the callback with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    checkServerStatus(testCB);
  });
  test('invokes the callback with the correct server status', done => {
    jest.setTimeout(1000);

    const testCB = (err, status) => {
      expect(status).toBe('200 - the server is good');
      done();
    };
    checkServerStatus(testCB);
  });
});

describe.only('fetchBannerContent()', () => {
  test('invokes the callback with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchBannerContent(testCB);
  });
  test('invokes the callback with a banner content object', done => {
    jest.setTimeout(1000);

    const testCB = (err, content) => {
      expect(content).toContainAllKeys(['title', 'bannerImg', 'copyrightYear']);
      done();
    };
    fetchBannerContent(testCB);
  });
  test('invokes the callback with the updated banner content object', done => {
    jest.setTimeout(1000);

    const testCB = (err, content) => {
      expect(content).toEqual({
        title: 'Kitty Litter',
        bannerImg:
          'https://riotfest.org/wp-content/uploads/2017/10/AcT9YIL.jpg',
        copyrightYear: 2019
      });
      done();
    };
    fetchBannerContent(testCB);
  });
});

describe.only('fetchAllOwners()', () => {
  test('invokes the callback with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchAllOwners(testCB);
  });
  test('invokes the callback with an array of the correct length', done => {
    jest.setTimeout(1000);

    const testCB = (err, owners) => {
      expect(owners).toBeArray();
      expect(owners).toBeArrayOfSize(5);
      done();
    };
    fetchAllOwners(testCB);
  });
  test('invokes the callback with an array of lowercase owner names', done => {
    jest.setTimeout(1000);

    const testCB = (err, owners) => {
      expect(owners).toEqual([
        'pavlov',
        'schrodinger',
        'foucault',
        'vel',
        'calvin'
      ]);
      done();
    };
    fetchAllOwners(testCB);
  });
});

describe.only('fetchCatsByOwner()', () => {
  test('invokes the callback with no error when given a valid owner', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchCatsByOwner('calvin', testCB);
  });
  test('invokes the callback with the 404 error when given an invalid owner', done => {
    jest.setTimeout(1000);

    const owner = 'mitch';
    const testCB = err => {
      expect(err).toBe(`404 - ${owner} not found`);
      done();
    };
    fetchCatsByOwner(owner, testCB);
  });
  describe('invokes the callback with the cats for the specified owner', () => {
    it('case: owner === vel', done => {
      jest.setTimeout(1000);

      fetchCatsByOwner('vel', (err, cats) => {
        expect(cats).toEqual(['Opal']);
        done();
      });
    });
    it('case: owner === pavlov', done => {
      jest.setTimeout(1000);

      fetchCatsByOwner('pavlov', (err, cats) => {
        expect(cats).toEqual(['Belle', 'Dribbles', 'Nibbles']);
        done();
      });
    });
  });
});

describe.only('fetchCatPics()', () => {
  test('invokes the callback function with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchCatPics([], testCB);
  });
  test('invokes the callback function with a single response', done => {
    jest.setTimeout(1000);

    const testCB = (err, responses) => {
      expect(responses).toEqual(['cute-cat.jpg']);
      done();
    };
    fetchCatPics(['cute-cat'], testCB);
  });
  test('invokes the callback function with multiple unordered responses', done => {
    jest.setTimeout(1000);

    const testCB = (err, responses) => {
      expect(responses).toContain('cute-cat.jpg');
      expect(responses).toContain('chonky-cat.jpg');
      expect(responses).toContain('scratchy-cat.jpg');
      expect(responses).toContain('pathetic-cat.jpg');
      done();
    };
    fetchCatPics(
      ['cute-cat', 'chonky-cat', 'scratchy-cat', 'pathetic-cat'],
      testCB
    );
  });
  test('handles error responses with a placeholder', done => {
    jest.setTimeout(1000);

    const testCB = (err, responses) => {
      expect(responses).toContain('cute-cat.jpg');
      expect(responses).toContain('chonky-cat.jpg');
      expect(responses).toContain('scratchy-cat.jpg');
      expect(responses).toContain('pathetic-cat.jpg');
      expect(responses).not.toContain('ERROR: out-of-place-dog not found!');
      expect(responses).toContain('placeholder.jpg');
      done();
    };
    fetchCatPics(
      [
        'cute-cat',
        'chonky-cat',
        'scratchy-cat',
        'pathetic-cat',
        'out-of-place-dog'
      ],
      testCB
    );
  });
});

describe.only('fetchAllCats()', () => {
  test('invokes the callback with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchAllCats(testCB);
  });
  test('invokes the callback with an array of all the cats, sorted in alphabetical order', done => {
    jest.setTimeout(1000);

    const testCB = (err, cats) => {
      expect(cats).toEqual([
        'Belle',
        'Dribbles',
        'Hobbes',
        'Leben',
        'M. Fang',
        'Nibbles',
        'Opal',
        'Tot'
      ]);
      done();
    };
    fetchAllCats(testCB);
  });
});

describe.only('fetchOwnersWithCats()', () => {
  it('invokes the callback function with no error', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    fetchOwnersWithCats(testCB);
  });
  it('invokes the callback function with an array of cat/owner objects', done => {
    jest.setTimeout(1000);

    const testCB = (err, owners) => {
      expect(owners).toContainEqual({ owner: 'vel', cats: ['Opal'] });
      done();
    };
    fetchOwnersWithCats(testCB);
  });
  it('invokes the callback function with the array of cat/owner objects in the origin order', done => {
    jest.setTimeout(1000);

    const testCB = (err, owners) => {
      expect(owners).toEqual([
        { owner: 'pavlov', cats: ['Belle', 'Dribbles', 'Nibbles'] },
        { owner: 'schrodinger', cats: ['Leben', 'Tot'] },
        { owner: 'foucault', cats: ['M. Fang'] },
        { owner: 'vel', cats: ['Opal'] },
        { owner: 'calvin', cats: ['Hobbes'] }
      ]);
      done();
    };
    fetchOwnersWithCats(testCB);
  });
  it('orders the owners without using a sort function', () => {
    jest.setTimeout(1000);

    expect(fetchOwnersWithCats.toString()).not.toContain('.sort(');
  });
});

describe.only('kickLegacyServerUntilItWorks()', () => {
  test('(eventually!) invokes the callback with no error', done => {
    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    kickLegacyServerUntilItWorks(testCB);
  });
  test('(eventually!) invokes callback with the correct string', done => {
    const testCB = (err, status) => {
      expect(status).toBe('200 - the legacy server is up');
      done();
    };
    kickLegacyServerUntilItWorks(testCB);
  });
});

describe.only('buySingleOutfit()', () => {
  // As done can only be called once, these tests implicitly check that our callback isn't being invoked multiple times
  test('invokes the callback with no error when given a valid outfit', done => {
    jest.setTimeout(1000);

    const testCB = err => {
      expect(err).toBe(null);
      done();
    };
    buySingleOutfit('taco', testCB);
  });
  test('invokes the callback with an error when given an invalid outfit', done => {
    jest.setTimeout(1000);

    const outfit = 'dannyDevito';
    const testCB = err => {
      expect(err).toBe(`404 - ${outfit} not found`);
      done();
    };
    buySingleOutfit(outfit, testCB);
  });
  test('invokes the callback with a checkout object', done => {
    jest.setTimeout(1000);

    const testCB = (err, checkout) => {
      expect(checkout).toEqual({
        quantity: 1,
        outfit: 'gremlin',
        totalCost: 73.1
      });
      done();
    };
    buySingleOutfit('gremlin', testCB);
  });
});
