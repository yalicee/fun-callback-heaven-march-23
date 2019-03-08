exports.checkLegacyStatus = errors => {
    if(Math.random() < 0.35) errors.push('500 - internal server error');
    else return '200 - the legacy server is up';
  }

exports.fetchOwners = (errors, db) => db.owners;

exports.checkStatus = () => '200 - the server is good';

exports.fetchCatsByOwner = (errors, db, owner) => {
    const cats = db.catsByOwners[owner];
    if(cats) return cats;
    else errors.push(`404 - ${owner} not found`)
}